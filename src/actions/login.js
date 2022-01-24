import * as action from "../actions/action.js";
import store from "../store/store.js";

///////////////////////////////////////////////////////////////// 
// ポート番号とロケーションURL取得
export default function setThisOriginName() {
	return new Promise((resolve, reject) => {
        console.log("this is setThisOriginName");
        var thisLocation = window.location.href;
        console.log(thisLocation);
		// fetch処理
		fetch("/setThisOriginName", {
			method: "GET",
			mode: "no-cors",
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
				store.dispatch(action.SET_PORT(responseJson.thisPort));
				store.dispatch(action.SET_LOCATION_URL(thisLocation));
                console.log(store.getState().loginReducer.thisPort);
                console.log(store.getState().loginReducer.thisLocation);
                resolve(true);
			}
		})
		.catch((error) => {
			console.error(error);
		});
	})
}