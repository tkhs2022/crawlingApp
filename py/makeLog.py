############################################################
#ログ生成クラス
############################################################
import logging
import datetime
import inspect
from logging import getLogger, FileHandler
import traceback

format_date1 = '{0:%Y%m%d}'.format(datetime.datetime.now())
logPath = './log/'
APLinfoLogName = 'APLinfo_' + format_date1 + '.log'
ERRORLogName = 'ERROR_' + format_date1 + '.log'

class Log:
    def __init__(self):
        #1.アプリケーションログ
        #ロガー生成
        l = logging.getLogger('APL')
        #出力時のフォーマットをセット
        formatter = logging.Formatter('%(asctime)s <%(levelname)s> : %(message)s')
        #出力先のパスをセット
        fileHandler = logging.FileHandler(logPath + APLinfoLogName, encoding='utf-8', mode='a')
        #ファイルハンドラにフォーマッターをセット
        fileHandler.setFormatter(formatter)
        #ログレベルをハンドラにセット
        l.setLevel(logging.INFO)
        l.addHandler(fileHandler)

        #2.エラーログ
        l = logging.getLogger('ERROR')
        formatter = logging.Formatter('%(asctime)s <%(levelname)s> : %(message)s')
        fileHandler = logging.FileHandler(logPath + ERRORLogName, mode='a')
        fileHandler.setFormatter(formatter)
        l.setLevel(logging.INFO)
        l.addHandler(fileHandler)

    ############################################################
    #ログ出力
    ############################################################
    def outputLog(self, level, funcName, paramTraceback, msg):
        #アプリケーションログにINFOでログ出力
        if level == 1:
            log = logging.getLogger('APL')
            log.info(funcName + ' ' +  msg)

        #エラーログにERRORでログ出力
        elif level == -1:
            try:
                log = logging.getLogger('ERROR')
                log.error(' occered at ' + funcName + ' ' + msg)
                print(str(datetime.datetime.now()) + ' occered at ' + funcName + ' ' + msg)

                if paramTraceback != '':
                    log.error(paramTraceback)
                    print(paramTraceback)

            except UnicodeDecodeError as e:
                log = logging.getLogger('ERROR')
                print(str(datetime.datetime.now()) + ' occered at ' + inspect.currentframe().f_code.co_name, ' ' + str(e.__class__))
                print(traceback.format_exc())
                log.error(traceback.format_exc())

