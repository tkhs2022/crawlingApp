
/* eslint-disable import/first */
import * as action from "../actions/action.js";
import store from "../store/store.js";
const ContentsListJson = require('../data/contents/contents.json');
const ContentsListJsonPath = "../data/contents";

///////////////////////////////////////////////////////////////// 
// コンテンツリスト
///////////////////////////////////////////////////////////////// 
export default class ContentsList {
	constructor() {
		try {
			this.ContentsList = ContentsListJson
		} catch(error) {
			console.error("make ContentsList error occarred.");
			console.error(error);
		}
	}
 
	///////////////////////////////////////////////////////////////// 
	// コンテンツリストのゲッター
	getContentsList(fileName) {
		try {
			this.ContentsList = require("../data/contents" + "/" + fileName);
			store.dispatch(action.SET_SELECTED_FILENAME(fileName, this.ContentsList));
		} catch(error) {
			console.error("make ContentsList error occarred.");
			console.error(error);
		}
	}
  
	///////////////////////////////////////////////////////////////// 
	// ファイルの更新日時を返す
	recentUpdateFileDate(fileKubun, request) {
		return new Promise((resolve, reject) => {
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
}