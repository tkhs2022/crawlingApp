const fs = require('fs');
const path = require('path');

// クローリング実行プログラム
const execScript = require("./execScript.js");
// クローリング実行ステータスフラグ 99:停止,0:実行中,1:完了,-1:エラー
var execScript_flag = 99;

// クローリング、コンテンツリスト、区分データのディレクトリ
const setting = require("./setting.json");
const kubunListJsonPath = setting["kubunListPath"];
const contentsListJsonPath = setting["contentsPath"];
const crawlingListJsonPath = setting["crawlingListPath"];
const reactLogPath = setting["reactLogPath"]
const pyPath = setting["pyPath"];


///////////////////////////////////////////////////////////////// 
// サーバー設定 
const port = process.env.PORT || 3001
const express = require('express');
const app = express();
const server = require("http").createServer(app);

// 異なるオリジン間アクセス設定
const allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, X-HTTP-Method-Override,Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS");
	next();
}
// 別オリジンからのアクセスを許可
app.use(allowCrossDomain);	
// リクエストボディを解析するパーサー。POSTリクエストを受けたときに必須。
app.use(express.urlencoded({extended: true}));
// httpリクエストのデータタイプ
app.use(express.json({type: ['application/json', 'text/plain']}));	
// ビルドしたreactと連携
app.use(express.static(path.join(__dirname, '../build')));

// サーバーオブジェクトsocketioを作成する
const { Server } = require("socket.io");
// corsモジュールでは上手くCORSできないため、Server作成時の引数にオプションを追加する
const io = new Server(server, {
    cors: {                      
        origin: "*",
        methods: ["GET", "POST"],
    },
});
// ブラウザから接続を受ける
io.on("connection", (socket) => {
    console.log(new Date().toLocaleString('ja-JP') + " " + "a user connected");
	// クローリングプログラムの実行ステータスを送信
	socket.emit('info', execScript_flag);
    socket.on("disconnect", () => {console.log(new Date().toLocaleString('ja-JP') + " " + "user disconnected");});
});

// serverをPORT3000で待ち受ける。app.listenだとNG。
server.listen(port);
console.log(new Date().toLocaleString('ja-JP') + " " + `Web server is on. PortNumber is ${port}.`);
///////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////// 
// ログ出力処理
app.post("/logging", (req, res) => {
	var nowDate = new Date();
	try {
		console.log(nowDate.toLocaleString('ja-JP') + " " + "/logging post response. with: logging.js outLog");
		console.log("data existed: " + reactLogPath + "/" + req.body.fileName + ".log");
		// ログに出力する情報をオブジェクトに格納
		var loggingList = {};
		loggingList.fileName = req.body.fileName;
		loggingList.errorinfo = req.body.errorinfo;
		// オブジェクトをjson化。ファイル書き込み
		var strData = JSON.stringify(loggingList, null, 4);
		fs.writeFileSync(reactLogPath + "/" + req.body.fileName + ".log", strData);
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
		console.log(nowDate.toLocaleString('ja-JP') + " " + "/requestLoginInfo post response. with: action.js Login.");	
		console.log(nowDate.toLocaleString('ja-JP') + " input usr:" + req.body.user + " pass:" + req.body.password)
		if(req.body.password != 99) {
			console.log(nowDate.toLocaleString('ja-JP') + " result " + "login failed.");
			resArray.result = false;
		} else {
			console.log(nowDate.toLocaleString('ja-JP') + " result " + "login successed.");
			resArray.result = true;
		}
		res.json(resArray);	
	} catch(error) {
		console.error(nowDate.toLocaleString('ja-JP') + " result " + "error occered at index.js in requestLoginInfo.");
		console.error(error);
	}
});

///////////////////////////////////////////////////////////////// 
// 選択されたコンテンツリストをレデューサーのオブジェクトにセット(store.getState().componentReducer.selectedFileName)
app.post("/getContentsList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, fileName:req.body.fileName, data:null};
	try {
		console.log(contentsListJsonPath + "/" + req.body.fileName + ".json");
		// クローリングリストjsonファイル読み込み
		var bufferData = fs.readFileSync(contentsListJsonPath + "/" + req.body.fileName + ".json");
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/getContentsList post response. with: contentsList.js getContentsList");
			console.log("data existed: " + contentsListJsonPath + "/" + req.body.fileName + ".json");
			resArray.data = data;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/getContentsList post response. with: contentsList.js getContentsList");
			console.log("data undefined." + contentsListJsonPath + "/" + req.body.fileName + ".json");
			resArray.flag = false;
			console.log(resArray.flag);
		}
	} catch(error) {
		console.error("error occered at index.js in getContentsList.");
		console.error(error);
		resArray.flag = false;
		console.error(resArray.flag);
	} finally {
		res.json(resArray);
	}
});

///////////////////////////////////////////////////////////////// 
// クローリングリスト新規登録
app.post("/addNewCrawlingList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, reqKbn:req.body.kbn, data:null};
	try {
		// クローリングリストjsonファイル読み込み
		var bufferData = fs.readFileSync(crawlingListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/addNewCrawlingList post response. with: crawlingList.js addNewCrawlingList");
			console.log("data existed: " + crawlingListJsonPath + "/" + req.body.fileName);
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
			resArray.data = data;
			// クローリングリストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(crawlingListJsonPath + "/" + req.body.fileName, strData);
			console.log("after...");
			console.log(data);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/addNewCrawlingList post response. with: crawlingList.js addNewCrawlingList");
			console.log("data undefined." + crawlingListJsonPath + "/" + req.body.fileName);
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
// 選択されたクローリングリストをレデューサーのオブジェクトにセット(store.getState().componentReducer.thisCrawlingList)
app.post("/getCrawlingList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, fileName:req.body.fileName, data:null};
	try {
		console.log(crawlingListJsonPath + "/" + req.body.fileName);
		// クローリングリストjsonファイル読み込み
		var bufferData = fs.readFileSync(crawlingListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/getCrawlingList post response. with: crawlingList.js getCrawlingList");
			console.log("data existed: " + crawlingListJsonPath + "/" + req.body.fileName);
			resArray.data = data;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/getCrawlingList post response. with: crawlingList.js getCrawlingList");
			console.log("data undefined." + crawlingListJsonPath + "/" + req.body.fileName);
			resArray.flag = false;
			console.log(resArray.flag);
		}
	} catch(error) {
		console.error("error occered at index.js in getCrawlingList.");
		console.error(error);
		resArray.flag = false;
		console.error(resArray.flag);
	} finally {
		res.json(resArray);
	}
});

///////////////////////////////////////////////////////////////// 
// クローリングリスト更新
app.post("/setUpdateCrawlingList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, reqKbn:req.body.kbn, reqJigyosyaid:req.body.jigyosyaid, data:null};
	try {
		// クローリングリストjsonファイル読み込み
		var bufferData = fs.readFileSync(crawlingListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setUpdateCrawlingList post response. with: contents.js setUpdateCrawlingList");
			console.log("data existed: " + crawlingListJsonPath + "/" + req.body.fileName);
			// クローリングリストオブジェクトの中身を編集
			var target = data.crawling.findIndex((v) => v.kbn === req.body.kbn && v.jigyosyaid === req.body.jigyosyaid);
			console.log("before...");
			console.log(data.crawling[target]);
			data.crawling[target].crawlingurl = req.body.crawlingurl;
			data.crawling[target].xpathTitle = req.body.xpathTitle;
			data.crawling[target].xpathLink = req.body.xpathLink;
			data.crawling[target].xpathImage = req.body.xpathImage;
			resArray.data = data;
			// クローリングリストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(crawlingListJsonPath + "/" + req.body.fileName, strData);
			console.log("after...");
			console.log(data.crawling[target]);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setUpdateCrawlingList post response. with: contents.js setUpdateCrawlingList");
			console.log("data undefined." + crawlingListJsonPath + "/" + req.body.fileName);
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
	var resArray = {flag:false, reqKbn:req.body.targetKubun, data:null};
	try {
		// クローリングリストjsonファイル読み込み
		var bufferData = fs.readFileSync(crawlingListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setDeleteCrawlingList post response. with: contents.js setDeleteCrawlingList");
			console.log("data existed: " + crawlingListJsonPath + "/" + req.body.fileName);
			// クローリングリストオブジェクトの中身を編集
			var target = data.crawling.findIndex((v) => v.kbn === req.body.targetKubun && v.jigyosyaid === req.body.targetJigyosyaid);
			if(target === -1) {
				throw "対象区分が見つかりませんでした。";
			}
			// ユーザー指定の区分に該当するレコードを削除。中身のデータというよりもオブジェクトごと削除するイメージ
			data.crawling.splice(target, 1);
			resArray.data = data;
			// クローリングリストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(crawlingListJsonPath + "/" + req.body.fileName, strData);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setDeleteCrawlingList post response. with: contents.js setDeleteCrawlingList");
			console.log("data undefined." + crawlingListJsonPath + "/" + req.body.fileName);
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
// クローリングプログラム完了通知
app.get("/updateFromPy", (req, res) => {
	// クローリング実行ステータスフラグを1にする
	execScript_flag = 1;
	console.log(new Date().toLocaleString('ja-JP') + " " + "index.js <function>app.post /updateFromPy")
	res.json({"message":"this is the comp info from API on Express. thank's for your mission!!"});
});

///////////////////////////////////////////////////////////////// 
// クローリング実行
app.post("/py", (req, res) => {
	var resJsonFileName = req.body.fileName;
	var obj = {flag:true, msg:"nothing"}
		try {
			var result = execScript.execScript("python", pyPath + "/connect.py", resJsonFileName)
			console.log(result)
			execScript_flag = 0;
		} catch(error) {
			console.error(error);
			result["flag"] = false;
			execScript_flag = -1;
		}
		res.json(obj);
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
			targetPath = contentsListJsonPath;
		}
		else if(req.body.fileKubun == 2) {
			targetPath = kubunListJsonPath;
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
			// mtimeの戻り値はDate型。.toLocaleString('ja-JP')で日本標準時版に補正できた。
			list[0].mtime =	list[0].mtime.toLocaleString('ja-JP');
			res.json(list[0]);
		}
		else if(req.body.request == "list") {
			let fileNameList = [];
			for(let i=0; i < list.length ; i++) {
				// 拡張子無しのファイル名を返却する
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
	var resArray = {flag:false, reqKbn:req.body.kbnBefore, data:null};
	try {
		// 区分リストjsonファイル読み込み
		var bufferData = fs.readFileSync(kubunListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/addNewKubun post response. with: contents.js setNewKubunList");
			console.log("data existed: " + kubunListJsonPath + "/" + req.body.fileName);
			// 区分オブジェクトの中身を編集
			var newKubunList = {};
			newKubunList.kbn = req.body.kbn;
			newKubunList.kbnname = req.body.kbnname;
			newKubunList.comment = req.body.comment;
			data.kbns.push(newKubunList);
			resArray.data = data;
			// 区分リストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(kubunListJsonPath + "/" + req.body.fileName, strData);
			console.log("after...");
			console.log(data.kbns);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/addNewKubun post response. with: contents.js setNewKubunList");
			console.log("data undefined." + kubunListJsonPath + "/" + req.body.fileName);
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
// 選択された区分リストをレデューサーのオブジェクトにセット(store.getState().componentReducer.thisKubunList)
app.post("/getKbnList", (req, res) => {
	var nowDate = new Date();
	var resArray = {flag:false, fileName:req.body.fileName, data:null};
	try {
		console.log(kubunListJsonPath + "/" + req.body.fileName);
		// クローリングリストjsonファイル読み込み
		var bufferData = fs.readFileSync(kubunListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/getKbnList post response. with: kubunList.js getKbnList");
			console.log("data existed: " + kubunListJsonPath + "/" + req.body.fileName);
			resArray.data = data;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/getKbnList post response. with: kubunList.js getKbnList");
			console.log("data undefined." + kubunListJsonPath + "/" + req.body.fileName);
			resArray.flag = false;
			console.log(resArray.flag);
		}
	} catch(error) {
		console.error("error occered at index.js in getKbnList.");
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
	var resArray = {flag:false, reqKbn:req.body.kbnBefore, data:{"kbnList":[],"crawlingList":[]}};
	try {
		///////////////////////////////////////////////////////////////// 
		// 区分データ編集
		// 区分リストjsonファイル読み込み
		var bufferData = fs.readFileSync(kubunListJsonPath + "/" + req.body.kubunFileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setEditKubunList post response. with: kubunList.js setEditKubunList");
			console.log("data existed: " + kubunListJsonPath + "/" + req.body.kubunFileName);
			// 区分リストオブジェクトの中身を編集
			var target = data.kbns.findIndex((v) => v.kbn === req.body.kbnBefore);
			if(target === -1) {
				throw "対象区分が見つかりませんでした。";
			}
			data.kbns[target].kbn = req.body.kbnAfter;
			data.kbns[target].kbnname = req.body.kbnnameAfter;
			data.kbns[target].comment = req.body.commentAfter;
			resArray.data["kbnList"] = data;
	  		// 区分リストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(kubunListJsonPath + "/" + req.body.kubunFileName, strData);
			console.log("after...");
			console.log(resArray.data["kbnList"]);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setEditKubunList post response. with: kubunList.js setEditKubunList");
			console.log("data undefined." + kubunListJsonPath + "/" + req.body.kubunFileName);
			resArray.flag = false;
		}

		///////////////////////////////////////////////////////////////// 
		// クローリングデータ編集
		// クローリングリストjsonファイル読み込み
		var bufferData = fs.readFileSync(crawlingListJsonPath + "/" + req.body.krawlingListFileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setEditKubunList post response. with: kubunList.js setEditKubunList");
			console.log("data existed: " + crawlingListJsonPath + "/" + req.body.krawlingListFileName);
			// クローリングオブジェクトの中身を編集
			data.crawling.map((list, index) => {
				var dummyData = data;
				// 対象の区分に属するクロールデータを書き換え。無ければ元のクロールデータを保存。
				if(list.kbn == req.body.kbnBefore) {
					list.kbnname = req.body.kbnnameAfter;
					list.comment = req.body.commentAfter;
					dummyData.crawling[index] = list;
					data = dummyData;
				}
			});
	  		// クローリングjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(crawlingListJsonPath + "/" + req.body.krawlingListFileName, strData);
			resArray.data["crawlingList"] = data;
			console.log("after...");
			console.log(resArray.data["crawlingList"]);
			resArray.flag = true;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setEditKubunList post response. with: kubunList.js setEditKubunList");
			console.log("data undefined." + crawlingListJsonPath + "/" + req.body.krawlingListFileName);
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
	var resArray = {flag:false, reqKbn:req.body.targetKubun, data:null};
	try {
		// 区分リストjsonファイル読み込み
		var bufferData = fs.readFileSync(kubunListJsonPath + "/" + req.body.fileName);
		var dataJSON = bufferData.toString();
		var data = JSON.parse(dataJSON);
		if(data) {
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setDeleteKubunList post response. with: kubunList.js setDeleteKubunList");
			console.log("data existed: " + kubunListJsonPath + "/" + req.body.fileName);
			// 区分リストオブジェクトの中身を編集
			var target = data.kbns.findIndex((v) => v.kbn === req.body.targetKubun);
			if(target === -1) {
				throw "対象区分が見つかりませんでした。";
			}
			// ユーザー指定の区分に該当するレコードを削除。中身のデータというよりもオブジェクトごと削除するイメージ
			data.kbns.splice(target, 1);
			// 区分リストjsonファイルを上書き保存。レスポンスtrue
			var strData = JSON.stringify(data, null, 4);
			fs.writeFileSync(kubunListJsonPath + "/" + req.body.fileName, strData);
			resArray.flag = true;
			resArray.data = data;
		} else {
			// ファイル編集失敗。レスポンスfalse
			console.log(nowDate.toLocaleString('ja-JP') + " " + "/setDeleteKubunList post response. with: kubunList.js setDeleteKubunList");
			console.log("data undefined." + kubunListJsonPath + "/" + req.body.fileName);
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