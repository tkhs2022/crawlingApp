///////////////////////////////////////////////////////////////// 
// CSSファイルの無効、有効化
export default function cssFileControl(disableFileName, ableFileName) {
	for(var i = 0; i < document.styleSheets.length; i++) {
		if (document.styleSheets[i].href != null) {
			var styleSheetPath = document.styleSheets[i].href;
			var fileName = styleSheetPath.substring(styleSheetPath.lastIndexOf('/')+1, styleSheetPath.length);
			if (fileName === disableFileName) {
				document.styleSheets[i].disabled = true;
			}
			else if (fileName === ableFileName) {
				document.styleSheets[i].disabled = false;
			}
		}
	}
}

///////////////////////////////////////////////////////////////// 
// CSSファイルの無効化
export function cssFileDisable(disableFileName) {
	for(var i = 0; i < document.styleSheets.length; i++) {
		if (document.styleSheets[i].href != null) {
			var styleSheetPath = document.styleSheets[i].href;
			var fileName = styleSheetPath.substring(styleSheetPath.lastIndexOf('/')+1, styleSheetPath.length);
			if (fileName === disableFileName) {
				document.styleSheets[i].disabled = true;
			}
		}
	}
}

///////////////////////////////////////////////////////////////// 
// CSSファイルの有効化
export function cssFileAble(ableFileName) {
	for(var i = 0; i < document.styleSheets.length; i++) {
		if (document.styleSheets[i].href != null) {
			var styleSheetPath = document.styleSheets[i].href;
			var fileName = styleSheetPath.substring(styleSheetPath.lastIndexOf('/')+1, styleSheetPath.length);
			if (fileName === ableFileName) {
				document.styleSheets[i].disabled = false;
			}
		}
	}
}

///////////////////////////////////////////////////////////////// 
// 区分リストの区分の半角変換と数値変換処理
export function stringToNumber(param) {
	try {
		// 区分の半角変換と数値変換処理
		var result = {};
		var str = "";
		if(param === undefined || param === "") {
			alert("区分には数値を入力してください!");
			throw "(区分リスト新規登録処理)区分入力エラー"; 
		} else {
			for(let i=0; i < param.length; i++) {
				str += String.fromCharCode(param.charCodeAt(i) - 0xFEE0);
			}
			// paramが数値型の場合、lengthは取れない。ここで代入する。
			if(str === "") {
				str = param;
			}
			// 数値変換の処理結果がNan=数値以外であればエラー
			if(isNaN(str)) {
				// 入力値が半角の場合、charCodeAtメソッドの結果がNaNとなる。回避策のIF文
				if(isNaN(Number(param))) {
					// 1.半角数値の場合
					alert("区分には数値を入力してください!");
					throw "(区分リスト新規登録処理)区分入力エラー"; 
					// str = param;
				} else {
					// 2.半角数字の文字列型の場合
					str = Number(param);
				}
			} else {
				// 3.全角→半角且つ数値型に変換する場合
				str = Number(str);            
			}
			result.flag = true;
			result.res = str;
		}
	} catch(error) {
		result.flag = false;
		result.res = str;
		console.error(error);
	} finally {
		return result;	
	}
}