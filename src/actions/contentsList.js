
///////////////////////////////////////////////////////////////// 
// コンテンツリスト
///////////////////////////////////////////////////////////////// 
import * as action from "../actions/action.js";
import store from "../store/store.js";

///////////////////////////////////////////////////////////////// 
// コンテンツリストのゲッター
export default function getContentsList(fileName) {
	return new Promise((resolve, reject) => {
		// fetch処理
		fetch("/getContentsList", {
			method: "POST",
			mode: "no-cors",
			heders: {
				'Content-Type':'application/json;charset=utf-8',
				'Accept':'application/json'
			},
			body: JSON.stringify({
				"fileName":fileName
			})
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			}
		})
		.then(function(responseJson) {
			store.dispatch(action.SET_SELECTED_FILENAME(fileName, responseJson.data));
			resolve(responseJson);
		})
		.catch(function(error) {
			console.error(error);
			reject({flag:false});
		});
	});
}

///////////////////////////////////////////////////////////////// 
// ファイルの更新日時を返す
export function recentUpdateFileDate(fileKubun, request) {
	return new Promise((resolve, reject) => {
		console.log("recentUpdateFileDate called.");
		// fetch処理
		fetch("/recentUpdateFileDate", {
			method: "POST",
			mode: "no-cors",
			heders: {
				'Content-Type':'application/json;charset=utf-8',
				'Accept':'application/json'
			},
			body: JSON.stringify({
				"fileKubun":fileKubun,
				"request":request
			})
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			}
		})
		.then(function(responseJson) {
			if(request == "list") {
				store.dispatch(action.SET_FILENAME_LIST(responseJson));
			} else if(request == "mtime") {
				store.dispatch(action.SET_MTIME(responseJson.mtime));
			}
			resolve(responseJson);
		})
		.catch(function(error) {
			console.error(error);
			reject({flag:false});
		});
	});
}