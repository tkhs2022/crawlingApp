const port = process.env.PORT || 3001
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const execScript = require("./execScript.js");
const setting = require("./setting.json");
// クローリング、コンテンツリスト、区分データのディレクトリ
const CrawlingListJsonPath = setting["crawlingListPath"];
const KubunListJsonPath = setting["kubunListPath"];
const ReactLogPath = setting["reactLogPath"]
const anacondaPath = setting["anacondaPath"]
const contentsPath = setting["contentsPath"];
const kubunListPath = setting["kubunListPath"];
const pyPath = setting["pyPath"];
const allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, X-HTTP-Method-Override,Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS");
	next();
}
app.use(allowCrossDomain);
app.use(express.urlencoded({extended: true}));
app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../build')));	// ビルドしたreactと連携
app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

///////////////////////////////////////////////////////////////// 
// ログ出力処理
app.post("/logging", (req, res) => {
	var nowDate = new Date();
	try {
		console.log(nowDate.toLocaleString() + " " + "/logging post response. with: contents.js outLog");
		console.log("data existed: " + ReactLogPath + "/" + req.body.fileName + ".log");
		// ログに出力する情報をオブジェクトに格納
		var loggingList = {};
		loggingList.fileName = req.body.fileName;
		// loggingList.error = req.body.error;
		loggingList.errorinfo = req.body.errorinfo;
		// オブジェクトをjson化。ファイル書き込み
		var strData = JSON.stringify(loggingList, null, 4);
		fs.writeFileSync(ReactLogPath + "/" + req.body.fileName + ".log", strData);
		console.log(loggingList);
	} catch(error) {
		console.error("error occered at index.js in logging.");
		console.error(error);
	}
});

///////////////////////////////////////////////////////////////// 
// ログイン情報照会
app.post("/requestLoginInfo", (req, res) => {
	var nowDate = new Date();
	try {
		var resArray = {"result":false};
		console.log(nowDate.toLocaleString() + " " + "/requestLoginInfo post response. with: action.js Login.");	
		console.log(nowDate.toLocaleString() + " input usr:" + req.body.user + " pass:" + req.body.password)
		if(req.body.password != 99) {
			console.log(nowDate.toLocaleString() + " result " + "login failed.");
			resArray.result = false;
		} else {
			console.log(nowDate.toLocaleString() + " result " + "login successed.");
			resArray.result = true;
		}
		res.json(resArray);	
	} catch(error) {
		console.error(nowDate.toLocaleString() + " result " + "error occered at index.js in requestLoginInfo.");
		console.error(error);
	}
});

///////////////////////////////////////////////////////////////// 
// クローリングリスト新規登録
app.post("/addNewCrawlingList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, reqKbn:req.body.kbn};
	try {
		// クローリングリストjsonファイル読み込み
		console.log(CrawlingListJsonPath + "/" + req.body.fileName);
		var bufferData = fs.readFileSync(CrawlingListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString() + " " + "/addNewCrawlingList post response. with: contents.js setNewKubunList");
			console.log("data existed: " + CrawlingListJsonPath + "/" + req.body.fileName);
			// クローリングリストオブジェクトの中身を編集
			var newCrawlingList = {};
			newCrawlingList.kbn = req.body.kbn;
			newCrawlingList.kbnname = req.body.kbnname;
			newCrawlingList.jigyosyaid = req.body.jigyosyaid;
			newCrawlingList.name = req.body.name;
			newCrawlingList.crawlingurl = req.body.crawlingurl;
			newCrawlingList.xpathTitle = req.body.xpathTitle;
			newCrawlingList.xpathLink = req.body.xpathLink;
			newCrawlingList.xpathImage = req.body.xpathImage;
			data.crawling.push(newCrawlingList);
			// クローリングリストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(CrawlingListJsonPath + "/" + req.body.fileName, strData);
			console.log("after...");
			console.log(data);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString() + " " + "/addNewKubun post response. with: contents.js setNewKubunList");
			console.log("data undefined." + CrawlingListJsonPath + "/" + req.body.fileName);
			resArray.flag = false;
			console.log(resArray.flag);
		}
	} catch(error) {
		console.error("error occered at index.js in addNewCrawlingList.");
		console.error(error);
		resArray.flag = false;
		console.error(resArray.flag);
	} finally {
		res.json(resArray);
	}
});

///////////////////////////////////////////////////////////////// 
// クローリングリスト更新
app.post("/api", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, reqKbn:req.body.kbn, reqJigyosyaid:req.body.jigyosyaid};
	try {
		// クローリングリストjsonファイル読み込み
		console.log(CrawlingListJsonPath + "/" + req.body.fileName);
		var bufferData = fs.readFileSync(CrawlingListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString() + " " + "/api post response. with: contents.js setUpdateCrawlingList");
			console.log("data existed: " + CrawlingListJsonPath + "/" + req.body.fileName);
			// クローリングリストオブジェクトの中身を編集
			var target = data.crawling.findIndex((v) => v.kbn === req.body.kbn && v.jigyosyaid === req.body.jigyosyaid);
			console.log("before...");
			console.log(data.crawling[target]);
			data.crawling[target].crawlingurl = req.body.crawlingurl;
			data.crawling[target].xpathTitle = req.body.xpathTitle;
			data.crawling[target].xpathLink = req.body.xpathLink;
			data.crawling[target].xpathImage = req.body.xpathImage;
			// クローリングリストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(CrawlingListJsonPath + "/" + req.body.fileName, strData);
			console.log("after...");
			console.log(data.crawling[target]);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString() + " " + "/api post response. with: contents.js setUpdateCrawlingList");
			console.log("data undefined." + CrawlingListJsonPath + "/" + req.body.fileName);
		}
	} catch(error) {
		console.error(error);
	} finally {
		res.json(resArray);
	}
});

///////////////////////////////////////////////////////////////// 
// クローリングリスト削除処理
app.post("/setDeleteCrawlingList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, reqKbn:req.body.targetKubun};
	try {
		// クローリングリストjsonファイル読み込み
		console.log(CrawlingListJsonPath + "/" + req.body.fileName);
		var bufferData = fs.readFileSync(CrawlingListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString() + " " + "/setDeleteCrawlingList post response. with: contents.js setDeleteCrawlingList");
			console.log("data existed: " + CrawlingListJsonPath + "/" + req.body.fileName);
			// クローリングリストオブジェクトの中身を編集
			var target = data.crawling.findIndex((v) => v.kbn === req.body.targetKubun && v.jigyosyaid === req.body.targetJigyosyaid);
			if(target === -1) {
				throw "対象区分が見つかりませんでした。";
			}
			// ユーザー指定の区分に該当するレコードを削除。中身のデータというよりもオブジェクトごと削除するイメージ
			data.crawling.splice(target, 1);
			// クローリングリストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(CrawlingListJsonPath + "/" + req.body.fileName, strData);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString() + " " + "/setDeleteCrawlingList post response. with: contents.js setDeleteCrawlingList");
			console.log("data undefined." + CrawlingListJsonPath + "/" + req.body.fileName);
			resArray.flag = false;
		}
	} catch(error) {
		console.error("error occered at index.js in setDeleteCrawlingList.");
		console.error(error);
		resArray.flag = false;
	} finally {
		res.json(resArray);
	}
});

///////////////////////////////////////////////////////////////// 
// クローリング実行
app.post("/py", (req, res) => {
	var nowDate = new Date();
	var resJsonFileName = req.body.fileName;
    var obj = {flag:false, msg:"nothing"}
	// var result = async function() {
		// try {
			// var resultThisPromise = await new Promise(function(resolve, reject) {
			return new Promise(function(resolve, reject) {
				execScript.execScript(anacondaPath + "/python.exe", pyPath + "/connect.py", resJsonFileName)
				.then(function(reponse) {
					obj["flag"] = reponse["flag"];
					obj["msg"] = reponse["msg"];
					if(obj["flag"]) {
						resolve(obj);
					} else if(!obj["flag"]) {
						reject(obj);
					}
					return res.json(obj);
				})
				.catch((error) => {
					console.log(nowDate.toLocaleString() + " " + "/py post response catched error: ");
					console.error(error);
					obj["msg"] = error;
					reject(obj);
					return res.json(obj);
				});
			});
			// return res.json(resultThisPromise);
		// } catch(error) {
		// 	console.log(nowDate.toLocaleString() + " " + "/py post response catched error: ");
		// 	console.error(error);
		// 	obj["msg"] = error;
		// 	return res.json(resultThisPromise);
		// }
	// }
	// result();
});

///////////////////////////////////////////////////////////////// 
// ファイルの更新日時を返す
// ****パラメータによって戻り値が変化する****
// req.body.fileKubun==1:コンテンツリスト req.body.fileKubun==1:区分リスト
// req.body.request == "mtime":ファイルの日付降順にソートした時、先頭ファイルの更新日時とそのファイル名を返却
// req.body.request == "list":コンテンツファイル名のリストを返却
app.post("/recentUpdateFileDate", (req, res) => {
	var targetPath = "";
	try {
		if(req.body.fileKubun == 1) {
			targetPath = contentsPath;
		}
		else if(req.body.fileKubun == 2) {
			targetPath = kubunListPath;
		}
		const list = fs.readdirSync(targetPath).map((fileName) => {
			return {
				fileName:fileName,
				mtime:fs.statSync(targetPath + "/" + fileName).mtime
			}
		});
		// ファイルリストを更新日時の降順にソート。この時、Date型である必要。
		list.sort((a,b) => b.mtime - a.mtime);
		if(req.body.request == "mtime") {
			// mtimeの戻り値はDate型。.toLocaleString()で日本標準時版に補正できた。
			list[0].mtime =	list[0].mtime.toLocaleString();
			res.json(list[0]);
		}
		else if(req.body.request == "list") {
			let fileNameList = [];
			for(let i=0; i < list.length ; i++) {
				fileNameList.push(list[i].fileName.replace(".json", ""));
			}
			res.json(fileNameList);
		}
	} catch(error) {
		console.error(error);
	}
});

///////////////////////////////////////////////////////////////// 
// 区分リスト新規登録
app.post("/addNewKubunList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, reqKbn:req.body.kbnBefore};
	try {
		// 区分リストjsonファイル読み込み
		console.log(KubunListJsonPath + "/" + req.body.fileName);
		var bufferData = fs.readFileSync(KubunListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString() + " " + "/addNewKubun post response. with: contents.js setNewKubunList");
			console.log("data existed: " + KubunListJsonPath + "/" + req.body.fileName);
			// 区分オブジェクトの中身を編集
			var newKubunList = {};
			newKubunList.kbn = req.body.kbn;
			newKubunList.kbnname = req.body.kbnname;
			newKubunList.comment = req.body.comment;
			data.kbns.push(newKubunList);
			// 区分リストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(KubunListJsonPath + "/" + req.body.fileName, strData);
			console.log("after...");
			console.log(data.kbns);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString() + " " + "/addNewKubun post response. with: contents.js setNewKubunList");
			console.log("data undefined." + KubunListJsonPath + "/" + req.body.fileName);
			resArray.flag = false;
			console.log(resArray.flag);
		}
	} catch(error) {
		console.error("error occered at index.js in addNewKubunList.");
		console.error(error);
		resArray.flag = false;
		console.error(resArray.flag);
	} finally {
		res.json(resArray);
	}
});

///////////////////////////////////////////////////////////////// 
// 区分リスト編集結果反映
app.post("/setEditKubunList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, reqKbn:req.body.kbnBefore};
	try {
		///////////////////////////////////////////////////////////////// 
		// 区分データ編集
		// 区分リストjsonファイル読み込み
		console.log(KubunListJsonPath + "/" + req.body.kubunFileName);
		var bufferData = fs.readFileSync(KubunListJsonPath + "/" + req.body.kubunFileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString() + " " + "/setEditKubunList post response. with: contents.js setEditKubunList");
			console.log("data existed: " + KubunListJsonPath + "/" + req.body.kubunFileName);
			// 区分リストオブジェクトの中身を編集
			var target = data.kbns.findIndex((v) => v.kbn === req.body.kbnBefore);
			if(target === -1) {
				throw "対象区分が見つかりませんでした。";
			}
			data.kbns[target].kbn = req.body.kbnAfter;
			data.kbns[target].kbnname = req.body.kbnnameAfter;
			data.kbns[target].comment = req.body.commentAfter;
	  		// 区分リストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(KubunListJsonPath + "/" + req.body.kubunFileName, strData);
			console.log("after...");
			console.log(data.kbns);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString() + " " + "/setEditKubunList post response. with: contents.js setEditKubunList");
			console.log("data undefined." + KubunListJsonPath + "/" + req.body.kubunFileName);
			resArray.flag = false;
		}

		///////////////////////////////////////////////////////////////// 
		// クローリングデータ編集
		// クローリングリストjsonファイル読み込み
		console.log(CrawlingListJsonPath + "/" + req.body.krawlingListFileName);
		var bufferData = fs.readFileSync(CrawlingListJsonPath + "/" + req.body.krawlingListFileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString() + " " + "/setEditKubunList post response. with: contents.js setEditKubunList");
			console.log("data existed: " + CrawlingListJsonPath + "/" + req.body.krawlingListFileName);
			// クローリングオブジェクトの中身を編集
			data.crawling.map((list, index) => {
				var dummyData = data;
				if(list.kbn == req.body.kbnBefore) {
					list.kbnname = req.body.kbnnameAfter;
					list.comment = req.body.commentAfter;
					dummyData.crawling[index] = list;
					data = dummyData;
				}
			});
			var target = data.crawling.findIndex((v) => v.kbn === req.body.kbnBefore);
			if(target === -1) {
				throw "対象区分が見つかりませんでした。";
			}
	  		// クローリングjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(CrawlingListJsonPath + "/" + req.body.krawlingListFileName, strData);
			console.log("after...");
			console.log(data.crawling);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString() + " " + "/setEditKubunList post response. with: contents.js setEditKubunList");
			console.log("data undefined." + CrawlingListJsonPath + "/" + req.body.krawlingListFileName);
			resArray.flag = false;
		}
	} catch(error) {
		console.error("error occered at index.js in setEditKubunList.");
		console.error(error);
		resArray.flag = false;
		console.error(resArray.flag);
	} finally {
		res.json(resArray);
	}
});

///////////////////////////////////////////////////////////////// 
// 区分リストデータ削除処理
app.post("/setDeleteKubunList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, reqKbn:req.body.targetKubun};
	try {
		// 区分リストjsonファイル読み込み
		console.log(KubunListJsonPath + "/" + req.body.fileName);
		var bufferData = fs.readFileSync(KubunListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString() + " " + "/setDeleteKubunList post response. with: contents.js setDeleteKubunList");
			console.log("data existed: " + KubunListJsonPath + "/" + req.body.fileName);
			// 区分リストオブジェクトの中身を編集
			var target = data.kbns.findIndex((v) => v.kbn === req.body.targetKubun);
			if(target === -1) {
				throw "対象区分が見つかりませんでした。";
			}
			// ユーザー指定の区分に該当するレコードを削除。中身のデータというよりもオブジェクトごと削除するイメージ
			data.kbns.splice(target, 1);
			// 区分リストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(KubunListJsonPath + "/" + req.body.fileName, strData);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString() + " " + "/setDeleteKubunList post response. with: contents.js setDeleteKubunList");
			console.log("data undefined." + KubunListJsonPath + "/" + req.body.fileName);
			resArray.flag = false;
		}
	} catch(error) {
		console.error("error occered at index.js in setDeleteKubunList.");
		console.error(error);
		resArray.flag = false;
	} finally {
		res.json(resArray);
	}
});

///////////////////////////////////////////////////////////////// 
// 上記以外のリクエストはindex.htmlを返す
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../build/index.html'));
});