############################################################
#インポート
############################################################
import os
import urllib3
import requests
import lxml.html
import time
import datetime
import json
import sys
from sys import stdin
import socket
import inspect
import traceback
import makeLog	#ログ出力クラス

############################################################
#グローバル変数定義
############################################################
#日付フォーマット
format_fname = '{0:%Y%m%d_%H%M%S}.json'.format(datetime.datetime.now())
format_date1 = '{0:%Y%m%d}'.format(datetime.datetime.now())
format_date2 = '{0:%Y-%m-%d}'.format(datetime.datetime.now())

#グローバル変数定義
tragetJsonName = ''
contentsResObj = {'article':[]}
TargetJsonObj = ''
https = 'https://'
http = 'http://'
lengthHttps = 8
lengthHttp = 7

#ログ出力インスタンス生成
log = makeLog.Log()

# クロール実行完了の通知をAPIへHTTPリクエストするためのポート番号
# herokuではポートを動的に割り当てている
port = sys.argv[2]

############################################
# 環境によって切り替える設定
############################################
# ロケーション
backendUrl = 'https://mysterious-brushlands-19415.herokuapp.com:' + port + '/updateFromPy'
# backendUrl = 'http://localhost:' + port + '/updateFromPy'

# jsonデータ格納先
pathCrawlingList = './backend/data/crawling/'
pathContentsList = './backend/data/contents/'

############################################################
#jsonファイルを読み込み、オブジェクトを返却する関数
############################################################
def createTargetJsonObj(fileName):
	global TargetJsonObj
	json_load = ''

	with open(fileName, 'r', encoding='utf-8') as json_open:
		try:
			json_load = json.load(json_open)
		except PermissionError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except UnboundLocalError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except IOError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		finally:
			json_open.close()

	TargetJsonObj = json_load

############################################################
#CSV出力処理
#ヘッダー出力:有り、インデックス出力:無し、エンコーディング:utf-8
############################################################
def out_json(obj):
	fileName = pathContentsList + 'contents_' + format_fname
	with open(fileName, 'w', encoding='utf-8') as f:
		#'ensure_ascii=False'を指定することで、utf-8で書き出し
		json.dump(obj, f, indent=4, ensure_ascii=False)

############################################################
#ターゲットURLについて、オリジン名チェック
#オリジン名付きURLを返却。
############################################################
def urlAddOrigin(targetUrl, crawlingurl):
	global https
	global http
	global lengthHttps
	global lengthHttp
	try:
		if targetUrl == 'None' or targetUrl == 'IndexError' or targetUrl == '':
			targetUrl
		else:
			#画像ファイルについて、style属性から画像ファイルを取得した場合は文字列を整形する
			if targetUrl.find('background-image') != -1:
				targetUrl = targetUrl.replace('background-image: url(', '').replace(');', '')

			#絶対パスチェック(httpsのパターン)
			if targetUrl.find(https) == 0:
				pass
			#絶対パスチェック(httpのパターン)
			elif targetUrl.find(http) == 0:
				pass
			#相対パスの場合、クローリングURLのページがindex.html
			elif crawlingurl.rfind('html') != -1:
				position = crawlingurl.rfind('/')
				originName = crawlingurl[:position+1]
				targetUrl = originName + targetUrl
			#相対パスの場合、クローリングURLのページがコンテキストパス
			else:
				targetUrl = crawlingurl + targetUrl

	except IndexError as e:
		targetUrl = 'IndexError'
		log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
	finally:
		return targetUrl

############################################################
#ターゲットURLについて、xpathを辿りイメージファイルを取得する
############################################################
def requestsandXpath(targetUrl, unicodeFlag, xpathValue):
	try:
		res = requests.get(targetUrl, timeout=(3.0, 7.5))		
		html = res.text
		#lxmlライブラリを使用し、HTMLをHtmlElementオブジェクトにする
		if unicodeFlag == True:
			#utf-8の場合
			root = lxml.html.fromstring(html)
		else:
			#shift-jisやcp932等ユニコード以外の場合
			root = lxml.html.fromstring(bytes(html, encoding=res.apparent_encoding))
		#src属性。イメージファイル取得
		resultUrl = root.xpath(xpathValue)
	except IndexError as e:
		resultUrl = 'IndexError'
		log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
	finally:
		return resultUrl

############################################################
#イメージファイル取得からコレクションに代入するまでの処理
############################################################
def getImageFile(targetUrl, counter, unicodeFlag, xpathValue, crawlingurl, imageFileCorrection):
	#アクセス可否チェック
	try:
		elmsXpathImage = requestsandXpath(targetUrl, unicodeFlag, xpathValue)
		if len(elmsXpathImage) == 0:
			image_dummy = 'None'
			#配列elmsXpathImageをクリアし、次の条件分岐で処理させる
			imageFileCorrection['elmsXpathImage'].clear()
		else:
			image_dummy = elmsXpathImage[counter]
			#オリジン名チェック
			image_dummy = urlAddOrigin(image_dummy, crawlingurl)
		if image_dummy != 'None':
			#アクセス可否チェック
			res = requests.get(image_dummy, timeout=(3.0, 7.5))
			status_code = str(res.status_code)
			if status_code != '200':
				#異常
				image_dummy = 'None'
				imageFileCorrection['elmsXpathImage'].clear()
			else:
				#正常
				imageFileCorrection['elmsXpathImage'] = elmsXpathImage

		imageFileCorrection['image_dummy'] = image_dummy

	except IndexError as e:
		log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
	finally:
		return imageFileCorrection

############################################################
#クローリング実行関数
############################################################
def executeGetRequest(arrayList):
	global contents
	global encoding

	max_retry = 3	#リトライ数
	status_code = ''
	succsessXpath = ''
	unicodeFlag = True
	kijiCount = 0

	for i in range(max_retry):
		try:
			print(arrayList['crawlingurl'])
			print(arrayList['xpathTitle'])
			print(arrayList['xpathLink'])
			print(arrayList['xpathImage'])

			#getリクエスト送信。リクエストしたURLのレスポンスオブジェクトを取得
			res = requests.get(arrayList['crawlingurl'], timeout=(3.0, 7.5))		
			html = res.text
			status_code = str(res.status_code)
			charcter = res.apparent_encoding

			#lxmlライブラリを使用し、HTMLをHtmlElementオブジェクトにする。初回はtrue。
			if unicodeFlag == True:
				#utf-8の場合
				root = lxml.html.fromstring(html)
			else:
				#shift-jisやcp932等ユニコード以外の場合
				root = lxml.html.fromstring(bytes(html, encoding=charcter))

			############################################################
			#パラメータのxpathを使いターゲットのデータを抜粋
			############################################################
			try:
				#記事タイトル
				elmsxPathTitle = root.xpath(arrayList['xpathTitle'])
				#配列カウント
				kijiCount = len(elmsxPathTitle)
				#リンクと記事ID
				elmsXpathLink = root.xpath(arrayList['xpathLink'] + '/@href')
				#イメージファイル
				xpath = arrayList['xpathImage'] + '/@src'
				elmsXpathImage = root.xpath(xpath)
				imageFileCorrection = {'flag':False, 'requestPerImageFile':False, 'imageFileRes':'', 'image_dummy': '', 'elmsXpathImage':elmsXpathImage}
			except lxml.etree.XPathEvalError as e:
				log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__) + str(i+1))
				#記事リンク単位でオブジェクトに格納
				contentsResObj['article'].append({
					'kbn':arrayList['kbn'],
					'kbnname':arrayList['kbnname'],
					'jigyosyaid':arrayList['jigyosyaid'],
					'name':arrayList['name'],
					'kiziid':'lxml.etree.XPathEvalError',
					'title':'lxml.etree.XPathEvalError',
					'source':'lxml.etree.XPathEvalError',
					'image':'lxml.etree.XPathEvalError',
					'crawlingurl':arrayList['crawlingurl'],
					'xpathTitle':arrayList['xpathTitle'],
					'xpathLink':arrayList['xpathLink'],
					'xpathImage':arrayList['xpathImage'],
					'encoding':charcter,
					'imageFileRes':'失敗'
				})
				return

			if kijiCount == 0:
				print('this xpathTitle not found. : ' + arrayList['crawlingurl'])
				return

			for i in range(kijiCount):
				title_dummy = ''
				kiziid_dummy = ''
				source_dummy = ''
				image_dummy = ''

				#記事タイトル
				try:
					title_dummy = elmsxPathTitle[i].text.replace('\t', '').replace('\n', '')
				except AttributeError:
					try:
						title_dummy = elmsxPathTitle[i].replace('\t', '').replace('\n', '')
					except AttributeError:
						title_dummy = 'AttributeError'
					except TypeError:
							title_dummy = 'TypeError'
				except TypeError:
						title_dummy = 'TypeError'

				#記事リンク、記事ID
				if len(elmsXpathLink) == 0:
					source_dummy = 'None'
					kiziid_dummy = 'None'
				else:
					try:
						#記事リンク加工ロジック開始
						source_dummy = urlAddOrigin(elmsXpathLink[i], arrayList['crawlingurl'])
						#記事ID加工ロジック開始
						position = elmsXpathLink[i].rfind('/')
						length = (len(elmsXpathLink[i]))
						elm = elmsXpathLink[i]
						if position == length-1:	#url末尾が'/'のケース
							dummy = elm[:(length-1)]
							position = dummy.rfind('/')
							kiziid_dummy = dummy[position+1:]
						else:
							kiziid_dummy = elm[position+1:]
							if kiziid_dummy.rfind('.html') != -1:
								length = (len(kiziid_dummy) - 5)
								kiziid_dummy = kiziid_dummy[:length]
					except IndexError:
						source_dummy = 'IndexError'
						kiziid_dummy = 'IndexError'
					except lxml.etree.XPathEvalError:
						source_dummy = 'lxml.etree.XPathEvalError'
						kiziid_dummy = 'lxml.etree.XPathEvalError'

				################################################################################
				#記事イメージファイル
				#crawlingurlから辿ったイメージファイルのレングスが0の場合、@data-soorce属性で再アクセス。
				#レングス0の場合、記事リンク(source_dummy)へアクセス。xpathを辿る。
				if imageFileCorrection['flag'] == False:
					crawlingurl = arrayList['crawlingurl']
					imageFileStatusList = [
						{'already':0, 'sucsessCase':False, 'xpath':arrayList['xpathImage']+'/@src', 'requestsUrl':arrayList['crawlingurl']},
						{'already':0, 'sucsessCase':False, 'xpath':arrayList['xpathImage']+'/@data-src', 'requestsUrl':arrayList['crawlingurl']},
						{'already':0, 'sucsessCase':False, 'xpath':arrayList['xpathImage']+'/@src', 'requestsUrl':source_dummy},
						{'already':0, 'sucsessCase':False, 'xpath':arrayList['xpathImage']+'/@data-src', 'requestsUrl':source_dummy},
					]
					while True:
						for list in imageFileStatusList:
							alreadyCounter = 0
							if list['already'] == 0:
								#レングスチェック
								if len(imageFileCorrection['elmsXpathImage']) == 0:
									#getImageFile(requests.getするURL,カウンター,ユニコードフラグ,xpath,ドメインチェックURL,イメージファイルコレクション)
									imageFileCorrection = getImageFile(list['requestsUrl'], i,	unicodeFlag, list['xpath'],	crawlingurl, imageFileCorrection)
								#アクセスチェック
								if len(imageFileCorrection['elmsXpathImage']) != 0:
									elms = imageFileCorrection['elmsXpathImage']
									image_dummy = elms[i]
									#オリジン名チェック
									image_dummy = urlAddOrigin(image_dummy, crawlingurl)
									if image_dummy != 'None':
										#アクセス可否チェック
										res = requests.get(image_dummy, timeout=(3.0, 7.5))
										status_code = str(res.status_code)
										if status_code != '200':
											imageFileCorrection['image_dummy'] = 'None'
											imageFileCorrection['elmsXpathImage'].clear()
										else:
											#gifファイルの場合、画像ファイルのスペース確保に使用されることが多い。再チェック
											if image_dummy.rfind('.gif') != -1:
												xpath = arrayList['xpathImage'] + "/@style['background-image']"
												#getImageFile(requests.getするURL,カウンター,ユニコードフラグ,xpath,ドメインチェックURL,イメージファイルコレクション)
												imageFileCorrection = getImageFile(list['requestsUrl'], i,	unicodeFlag, xpath,	crawlingurl, imageFileCorrection)
												if len(imageFileCorrection['elmsXpathImage']) != 0:
													#正常
													if list['requestsUrl'] != arrayList['crawlingurl']:
														imageFileCorrection['requestPerImageFile'] = True
														succsessXpath = list['xpath']
													imageFileCorrection['flag'] = True
													imageFileCorrection['imageFileRes'] = '成功'
													alreadyCounter = len(imageFileStatusList)
													break
											else:
												#正常
												if list['requestsUrl'] != arrayList['crawlingurl']:
													imageFileCorrection['requestPerImageFile'] = True
													succsessXpath = list['xpath']
												imageFileCorrection['flag'] = True
												imageFileCorrection['imageFileRes'] = '成功'
												alreadyCounter = len(imageFileStatusList)
												break

							#imageFileStatusListに登録されている処理パターン網羅数をカウント
							list['already'] = 1
							for ii in imageFileStatusList:
								alreadyCounter = alreadyCounter + ii['already']

							#imageFileStatusListに登録されている全ての処理パターンを網羅したらbreak
							if alreadyCounter == len(imageFileStatusList):
								#異常
								imageFileCorrection['flag'] = True
								imageFileCorrection['imageFileRes'] = '失敗'
								break

						#while文の終了条件チェック
						if alreadyCounter == len(imageFileStatusList):
							imageFileCorrection['flag'] = True
							break

				#記事タイトル毎に通過する処理
				try:
					if len(imageFileCorrection['elmsXpathImage']) != 0:
						#オリジン名チェックは個々のURL毎に行う
						if imageFileCorrection['requestPerImageFile'] == True:
							#getImageFile(requests.getするURL,カウンター,ユニコードフラグ,xpath,ドメインチェックURL,イメージファイルコレクション)
							imageFileCorrection = getImageFile(source_dummy, 0, unicodeFlag, succsessXpath, crawlingurl, imageFileCorrection)
						else:
							elms = imageFileCorrection['elmsXpathImage']
							image_dummy = urlAddOrigin(elms[i], crawlingurl)
							imageFileCorrection['image_dummy'] = image_dummy
				except IndexError:
					image_dummy = 'IndexError'
				except lxml.etree.XPathEvalError:
					image_dummy = 'lxml.etree.XPathEvalError'

				################################################################################

				#記事リンク単位でオブジェクトに格納
				contentsResObj['article'].append({
					'kbn':arrayList['kbn'],
					'kbnname':arrayList['kbnname'],
					'jigyosyaid':arrayList['jigyosyaid'],
					'name':arrayList['name'],
					'kiziid':kiziid_dummy,
					'title':title_dummy,
					'source':source_dummy,
					'image':imageFileCorrection['image_dummy'],
					'crawlingurl':arrayList['crawlingurl'],
					'xpathTitle':arrayList['xpathTitle'],
					'xpathLink':arrayList['xpathLink'],
					'xpathImage':arrayList['xpathImage'],
					'encoding':charcter,
					'imageFileRes':imageFileCorrection['imageFileRes']
				})

		except ValueError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__) + str(i+1))
			print('ValueError and retry.')
			unicodeFlag = False
		except UnicodeDecodeError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__) + str(i+1))
			print('UnicodeDecodeError and retry.')
			unicodeFlag = False
		except requests.exceptions.ConnectionError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except urllib3.exceptions.NewConnectionError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except urllib3.exceptions.MaxRetryError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except urllib3.exceptions.ReadTimeoutError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except socket.gaierror as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except requests.exceptions.ReadTimeout as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except lxml.etree.XPathEvalError:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except KeyboardInterrupt as e:
			print(str(datetime.datetime.now()) + ' in executeGetRequest(arrayList) pg.' + 'KeyboardInterrupt occurred...continue??(y/n)')
			your_cmd = input('>> ')
			if your_cmd == 'y':
				continue
			elif your_cmd == 'n':
				print('sys.exit(0)')
				sys.exit(0)

		############################################################
		#リクエスト結果通知。(for文の中のtryに対するelse文)
		############################################################
		else:
			try:
				#リクエスト失敗(最大リトライ数未達の場合)
				if status_code != '200':
					log.outputLog(-1, inspect.currentframe().f_code.co_name, '', 'requests failed:' + arrayList['crawlingurl'])
					time.sleep(3)
				else:
					#リクエスト成功
					print(str(datetime.datetime.now()) + ' requests success: ' + arrayList['crawlingurl'])
					log.outputLog(1, inspect.currentframe().f_code.co_name, '', 'requests success:' + arrayList['crawlingurl'])
					time.sleep(3)
					break
			except KeyboardInterrupt as e:
				print(str(datetime.datetime.now()) + ' in executeGetRequest(arrayList) pg.' + 'KeyboardInterrupt occurred...continue??(y/n)')
				your_cmd = input('>> ')
				if your_cmd == 'y':
					continue
				elif your_cmd == 'n':
					print('sys.exit(0)')
					sys.exit(0)

	############################################################
	#リトライ結果通知。(for本体に対するelse)
	############################################################
	else:
		#リクエスト失敗。(最大リトライ数を超えた場合)
		log.outputLog(-1, inspect.currentframe().f_code.co_name, '', 'Max retries exceeded with url' + arrayList['crawlingurl'])
		return

############################################################
#パラメータのファイルの存在チェック
############################################################
def fileExistsCheck(json_name):
	files = os.listdir(pathCrawlingList)
	flag = False
	str = ''

	for f in files:
		if f == json_name:
			flag = True
			break
	if flag == True:
		str = 'jsonFile found: '
	else:
		str = 'jsonFile not found: '
	returnData = {
		'file':pathCrawlingList + json_name,
		'tartgetCHeck':flag,
		'res':str
	}
	return 	returnData

############################################################
#メイン関数
############################################################
def main():
	global backendUrl
	# tragetJsonName = 'crawlingList.json'
	#パラメータのファイル存在確認
	res = fileExistsCheck(tragetJsonName)
	#ファイルが存在しなかった場合
	if res['tartgetCHeck'] == False:
		try:
			raise KeyError()
		except KeyError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, '', res['res'] + res['file'])
	#ファイルが存在した場合
	else:
		try:
			#PG起動時にパラメータ取得したファイル名を読み込み、オブジェクト化する
			createTargetJsonObj(res['file'])
			for x in TargetJsonObj['crawling']:
				#クローリング実行関数にn番目のターゲットオブジェクトを渡す
				executeGetRequest(x)
			#オブジェクトをJSONファイル出力
			out_json(contentsResObj)
		except ValueError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except KeyError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except IndexError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except json.decoder.JSONDecodeError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
		except KeyboardInterrupt as e:
			print(str(datetime.datetime.now()) + ' in main pg.' + 'KeyboardInterrupt occurred...continue??(y/n)')
			your_cmd = input('>> ')
			if your_cmd == 'y':
				pass
			elif your_cmd == 'n':
				print('sys.exit(0)')
				sys.exit(0)

	# APIへ完了を通知
	try :
		res = requests.get(backendUrl, timeout=(3.0, 7.5))
		print(str(datetime.datetime.now()) + ' ' + res.json()['message'])
	except urllib3.exceptions.LocationParseError as e:
			log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))
	except requests.exceptions.InvalidURL as e:
		log.outputLog(-1, inspect.currentframe().f_code.co_name, traceback.format_exc(), str(e.__class__))

############################################################
#メインメソッド
############################################################
if __name__ == '__main__':
	# スクリプト実行で本プログラムを起動した際にファイル名をパラメータから取得。tragetJsonNameへセット。
	# 1.パラメータを参照し実行するパターン。sys.argvの0番目は起動したプログラム名。1番目はパラメータ。
	tragetJsonName = sys.argv[1]
	# 2.直接ファイル名を実行するパターン。
	# tragetJsonName = 'crawlingList.json'
	# tragetJsonName = stdin.readlines()
	main()
