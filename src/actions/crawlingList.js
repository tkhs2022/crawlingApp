import * as action from "../actions/action.js";
import store from "../store/store.js";
const CrawlingListJsonFileName = "crawlingList.json";

///////////////////////////////////////////////////////////////// 
// クローリングリスト
/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////// 
// クローリングリストのゲッター
export default function getCrawlingList() {
	return new Promise((resolve, reject) => {
		// fetch処理
		fetch("/getCrawlingList", {
			method: "POST",
			mode: "no-cors",
			heders: {
				'Content-Type':'application/json;charset=utf-8',
				'Accept':'application/json'
			},
			body: JSON.stringify({
				"fileName":CrawlingListJsonFileName
			})
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			}
		})
		.then(function(responseJson) {
			store.dispatch(action.SET_CRAWLING_LIST(responseJson.data));
			resolve(responseJson);
		})
		.catch(function(error) {
			console.error(error);
			reject({flag:false});
		});
	});
}

///////////////////////////////////////////////////////////////// 
// クローリングリスト新規登録処理
export function addNewCrawlingList(props) {
	return new Promise((resolve, reject) => {
		try {
			// オブジェクトにデータを追加
			var newCrawlingList = {};
			newCrawlingList["kbn"] = props.kbn;
			newCrawlingList["kbnname"] = props.kbnname;
			newCrawlingList["jigyosyaid"] = props.jigyosyaid;
			newCrawlingList["name"] = props.name;
			newCrawlingList["crawlingurl"] = props.crawlingurl;
			newCrawlingList["xpathTitle"] = props.xpathTitle.replace("\"","\'").replace("\"","\'");
			newCrawlingList["xpathLink"] = props.xpathLink.replace("\"","\'").replace("\"","\'");
			newCrawlingList["xpathImage"] = props.xpathImage.replace("\"","\'").replace("\"","\'");
			// 編集後の値についてnullチェック
			if(
				newCrawlingList["kbn"]  == "" ||
				newCrawlingList["jigyosyaid"] === "" ||
				newCrawlingList["name"] === "" ||
				newCrawlingList["crawlingurl"] === "" ||
				newCrawlingList["xpathTitle"] === "" ||
				newCrawlingList["xpathLink"] === "" ||
				newCrawlingList["xpathImage"] === ""
			) {
				alert("全ての項目を入力してください!");
				throw "全ての項目を入力してください!";
			}
			// fetch処理
			fetch("/addNewCrawlingList", {
				method: "POST",
				mode: "no-cors",
				heders: {
					'Content-Type':'application/json;charset=utf-8',
					'Accept':'application/json'
				},
				body: JSON.stringify({
					fileName:CrawlingListJsonFileName,              
					kbn:newCrawlingList["kbn"],
					kbnname:newCrawlingList["kbnname"],
					jigyosyaid:newCrawlingList["jigyosyaid"],
					name:newCrawlingList["name"],
					crawlingurl:newCrawlingList["crawlingurl"],
					xpathTitle:newCrawlingList["xpathTitle"],
					xpathLink:newCrawlingList["xpathLink"],
					xpathImage:newCrawlingList["xpathImage"]
				})
			})
			.then(function(response) {
				if(response.ok) {
					return response.json();
				} else {
					alert("http status is: " + response.status);
				}
			})
			.then(function(responseJson) {
				store.dispatch(action.SET_CRAWLING_LIST(responseJson.data));
				resolve(responseJson); // jsonオブジェクトを返却する 
				if(responseJson.flag) {
					alert("クローリング対象を追加しました!");
				}
			});
		} catch(error) {
			alert("クローリング対象の追加に失敗しました!");
			console.error(error);
			reject(false);
		}
	});
}

///////////////////////////////////////////////////////////////// 
// クローリングリスト更新処理
export function setUpdateCrawlingList(
	item,
	changedCrawlingUrl,
	changedCrawlingXpathTitle,
	changedValueCrawlingXpathLink,
	changedValueCrawlingXpathImage) {
	return new Promise((resolve, reject) => {
		try {
			var thisCrawlingList = store.getState().componentReducer.thisCrawlingList;
			var target = thisCrawlingList.crawling.findIndex((v) => v.kbn === item.kbn && v.jigyosyaid === item.jigyosyaid);
			// findindexで検索結果0件の場合は-1を返す。クローリング情報の更新は不可。
			if(target === -1) {
				alert("クローリングの設定を更新できませんでした!");
			} else {
				thisCrawlingList.crawling[target].crawlingurl = changedCrawlingUrl;
				thisCrawlingList.crawling[target].xpathTitle = changedCrawlingXpathTitle.replace("\"","\'").replace("\"","\'");
				thisCrawlingList.crawling[target].xpathLink = changedValueCrawlingXpathLink.replace("\"","\'").replace("\"","\'");
				thisCrawlingList.crawling[target].xpathImage = changedValueCrawlingXpathImage.replace("\"","\'").replace("\"","\'");
				// fetch処理
				fetch("/setUpdateCrawlingList", {
					method: "POST",
					mode: "no-cors",
					heders: {
						'Content-Type':'application/json;charset=utf-8',
						'Accept':'application/json'
					},
					body: JSON.stringify({
						fileName:CrawlingListJsonFileName,
						kbn:item.kbn,
						jigyosyaid:item.jigyosyaid,
						crawlingurl:thisCrawlingList.crawling[target].crawlingurl,
						xpathTitle:thisCrawlingList.crawling[target].xpathTitle,
						xpathLink:thisCrawlingList.crawling[target].xpathLink,
						xpathImage:thisCrawlingList.crawling[target].xpathImage,
					})
				})
				.then(function(response) {
					if(response.ok) {
						return response.json();
					} else {
						alert("http status is: " + response.status);
					}
				})
				.then(function(responseJson) {
					if(responseJson.flag) {
						store.dispatch(action.SET_CRAWLING_LIST(responseJson.data));
						alert("クローリングの設定を更新しました!");
						resolve(responseJson);
					}
				});
			}
		} catch(error) {
			alert("ローカルファイルの更新に失敗しました!該当の区分が見つかりませんでした!");
			console.error(error);
			reject({flag:false});
		}
	});
}

///////////////////////////////////////////////////////////////// 
// クロール対象データ削除処理
export function setDeleteCrawlingList(props){
	return new Promise((resolve, reject) => {
		// 削除対象の区分を代入
		var targetKubun = props["delete"][0].kbn;
		var targetJigyosyaid = props["delete"][0].jigyosyaid;
		// fetch処理
		fetch("/setDeleteCrawlingList", {
			method: "POST",
			mode: "no-cors",
			heders: {
				'Content-Type':'application/json;charset=utf-8',
				'Accept':'application/json'
			},
			body: JSON.stringify({
				"fileName":CrawlingListJsonFileName,
				"targetKubun":targetKubun,
				"targetJigyosyaid":targetJigyosyaid
			})
		})
		.then(function(response) {
			if(response.ok) {
				return response.json();
			} else {
				alert("http status is: " + response.status);
			}
		})
		.then((responseJson) => {
			if(responseJson.flag) {
				store.dispatch(action.SET_CRAWLING_LIST(responseJson.data));
				alert("クロール対象データを削除しました!");
				resolve(true);
			}
		})
		.catch((error) => {
			alert("クロール対象データの削除に失敗しました!");
			console.error(error);
			reject(false);
		});
	});
}

///////////////////////////////////////////////////////////////// 
// クローリングプログラム実行関数
export function execCrawling() {
	return new Promise((resolve, reject) => {
		console.log(window.location.href);
		// fetch処理
		fetch("/py", {
			method: "POST",
			mode: "no-cors",
			heders: {
				'Content-Type':'application/json;charset=utf-8',
				'Accept':'application/json'
			},
			body: JSON.stringify({
				fileName:CrawlingListJsonFileName,
				url:window.location.href
			})
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			}
		})
		.then(function(responseJson) {
			if(responseJson.flag) {
				resolve(responseJson.flag); // true
			} else {
				reject(responseJson.flag); // false
			}
		})
		.catch(function(error) {
			console.error("<crawlingList.js> execCrawling occared eerror.");
			console.error(error);
			reject(false);
		});
	});
}
  