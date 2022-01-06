
import {stringToNumber} from '../commonFunc';
const KubunListJsonFileName = "kbns.json";
const krawlingListJsonFileName = "crawlingList.json";
const KbnListJson = require('../data/kbns/kbns.json');

///////////////////////////////////////////////////////////////// 
// 区分リスト 
///////////////////////////////////////////////////////////////// 
export class KbnList {
	constructor() {
		this.KbnList = KbnListJson;
	}
  
	///////////////////////////////////////////////////////////////// 
	// 区分リストのゲッター
	getKbnList() {
		return this.KbnList;
	}

	///////////////////////////////////////////////////////////////// 
	// 区分リスト新規登録処理
	setNewKubunList = (changedValueKubun, changedValueKubunName, changedValueComment) => {    
		return new Promise((resolve, reject) => {
			// 区分の半角変換と数値変換処理
			var str = "";
			for(let i=0; i < changedValueKubun.length; i++) {
				str += String.fromCharCode(changedValueKubun.charCodeAt(i) - 0xFEE0);
			}
			// 数値変換の処理結果がNan=数値以外であればエラー
			if(isNaN(Number(str))) {
				if(isNaN(Number(changedValueKubun))) {
					alert("区分には数値を入力してください!");
					throw "(区分リスト新規登録処理)区分入力エラー"; 
				} else {
					changedValueKubun = Number(changedValueKubun);
				}
			} else {
					changedValueKubun = Number(str);            
			}
			// findindexで検索結果0件の場合は-1を返す。区分リストの追加登録を行う。
			var target = this.KbnList.kbns.findIndex((v) => v.kbn === changedValueKubun);
			if(target === -1) {
				// オブジェクトにデータを追加
				var newKubunList = {};
				newKubunList.kbn = changedValueKubun;
				newKubunList.kbnname = changedValueKubunName;
				newKubunList.comment = changedValueComment;
				this.KbnList.kbns.push(newKubunList);
				// fetch処理
				fetch("/addNewKubunList", {
					method: "POST",
					mode: "no-cors",
					heders: {
						'Content-Type':'application/json;charset=utf-8',
						'Accept':'application/json'
					},
					body: JSON.stringify({
						fileName:KubunListJsonFileName,
						kbn:changedValueKubun,
						kbnname:changedValueKubunName,
						comment:changedValueComment,
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
					resolve(responseJson); // jsonオブジェクトを返却する 
					if(responseJson.flag) {
						alert("区分を追加しました!!");
					}
				})
				.catch(function(error) {
					alert("区分リストの追加に失敗しました!");
					console.error(error);
					reject(false);
				});
			} else {
				alert("入力した区分リストは既に存在します!");
			}
		});
	}

	///////////////////////////////////////////////////////////////// 
	// 区分リスト更新処理
	setEditKubunList = (props) => {
		return new Promise((resolve, reject) => {
			var result = {};
			var kbnBefore = props.before[0].kbn;
			var kbnnameBefore = props.before[0].kbnname;
			var commentBefore = props.before[0].comment;
			var kbnAfter = props.after[0].kbn;
			var kbnnameAfter = props.after[0].kbnname;
			var commentAfter = props.after[0].comment;
			// 区分の半角と数値を変換する外部メソッドを呼び出す
			// stringToNumber:返却値:{flag:"変換成功、失敗フラグ, res:""変換後の値"}
			result = stringToNumber(kbnAfter);
			kbnAfter = result["res"];
			// 編集後の値についてnullチェック
			if(kbnnameAfter == undefined || commentAfter == undefined || kbnnameAfter == "" || commentAfter == "") {
				alert("全ての項目を入力してください!");
				throw "全ての項目を入力してください!";
			}
			// 区分の変換結果がtrueの場合のみ、後続の処理を続行する
			if(!result.flag) {
				alert("区分は数値を入力してください。");					
				reject(result);
			}
			// findindexで検索結果0件の場合は-1を返す。クローリング情報の更新は不可。
			var target = this.KbnList.kbns.findIndex((v) => v.kbn === kbnBefore);
			if(target === -1) {
				alert("区分リストの編集に失敗しました!該当の区分が見つかりません!");
				result.flag = false;
				reject(result);
			} else {
				var target = this.KbnList.kbns.findIndex((v) => v.kbn === kbnAfter);
				if(target === -1) {
					alert("区分の値は更新できません。");
					result.flag = false;
					reject(result);
				}
				// this.KbnList.kbns[target].kbn = kbnAfter;	区分の変更は不可。
				this.KbnList.kbns[target].kbnname = kbnnameAfter;
				this.KbnList.kbns[target].comment = commentAfter;
			}
			// fetch処理
			fetch("/setEditKubunList", {
				method: "POST",
				mode: "no-cors",
				heders: {
					'Content-Type':'application/json;charset=utf-8',
					'Accept':'application/json'
				},
				body: JSON.stringify({
					"kubunFileName":KubunListJsonFileName,
					"krawlingListFileName":krawlingListJsonFileName,
					"kbnBefore":kbnBefore,
					"kbnnameBefore":kbnnameBefore,
					"commentBefore":commentBefore,
					"kbnAfter":kbnAfter,
					"kbnnameAfter":kbnnameAfter,
					"commentAfter":commentAfter,
				})
			})
			.then(function(response) {
				if(response.ok) {
					return response.json();
				} else {
					alert("http status is: " + response.status);
					reject(result);
				}
			})
			.then((responseJson) => {
				resolve(responseJson);
				if(responseJson.flag) {
					alert("区分リストを編集しました!");
					resolve(result);
				}
			})
			.catch((error) => {
				alert("区分リストの削除に失敗しました!");
				console.error(error);
				reject(result);
			});
		});
	}
  
	///////////////////////////////////////////////////////////////// 
	// 区分リストデータ削除処理
	setDeleteKubunList = (props) => {
		return new Promise((resolve, reject) => {
			// 削除対象の区分を代入
			var targetKubun = props["delete"][0].kbn;
			// fetch処理
			fetch("/setDeleteKubunList", {
				method: "POST",
				mode: "no-cors",
				heders: {
					'Content-Type':'application/json;charset=utf-8',
					'Accept':'application/json'
				},
				body: JSON.stringify({
					"fileName":KubunListJsonFileName,
					"targetKubun":targetKubun,
				})
			})
			.then(function(response) {
				if(response.ok) {
					return response.json();
				} else {
					alert("http status is: " + response.status);
					reject(false);
				}
			})
			.then((responseJson) => {
				if(responseJson.flag) {
					alert("区分リストを削除しました!");
					resolve(true);
				}
			})
			.catch((error) => {
				alert("区分リストの削除に失敗しました!");
				console.error(error);
				reject(false);
			});
		})
	}
}