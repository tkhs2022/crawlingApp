///////////////////////////////////////////////////////////////// 
// フロントエンドログ出力クラス
///////////////////////////////////////////////////////////////// 
export class Logging {
	constructor() {
		var date = new Date();
		this.jikoku = date.getFullYear() + "" + date.getMonth() + "" + date.getDate();
	}
  
	///////////////////////////////////////////////////////////////// 
	// ログ出力api呼び出し
	outLog(errorinfo) {
		var fileName = "reactLog_" + this.jikoku;
			// fetch処理
		fetch("/logging", {
			method: "POST",
			mode: "no-cors",
			heders: {
				'Content-Type':'application/json;charset=utf-8',
				'Accept':'application/json'
			},
			body: JSON.stringify({
				"fileName":fileName,
				"errorinfo":errorinfo
			})
		})
		.catch(function(error) {
			console.error(error);
		});
	}
}
  