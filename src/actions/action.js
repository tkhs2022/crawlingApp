import store from "../store/store.js";
/////////////////////////////////////////////////////////////////
// ログイン情報をリクエスト
// ***レスポンスデータのイメージ***
// array{"status:true, "result":{"user": "yamada"}}
const Login = (user, password) => {
    return new Promise((resolve, reject) => {
        store.dispatch(requestLogin());
        fetch("/requestLoginInfo", {
            method: "POST",
            mode: "no-cors",
            heders: {
                'Content-Type':'application/json;charset=utf-8',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                "user":user,
                "password":password
            })
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(function(responseJson) {
            if(responseJson.result == true) {
                store.dispatch(receiveLoginSuccess());
                resolve(true);
            } else {
                store.dispatch(receiveLoginFailed());
                resolve(false);
            }
        })
        .catch(function(error) {
            console.error(error);
            store.dispatch(receiveLoginFailed());
            reject(false);
        });
    });
}

////////////////////////////////////////////////////////////////////////////
// ここからログイン処理のアクション
////////////////////////////////////////////////////////////////////////////
// アクションタイプをマッピング
export const ActionType = {
    LOGOUT:"LOGOUT",
    LOGIN_REQUEST:"LOGIN_REQUEST",
    LOGIN_RECEIVE_SUCCESS:"LOGIN_RECEIVE_SUCCESS",
    LOGIN_RECEIVE_FAILED:"LOGIN_RECEIVE_FAILED"
}

// ログアウト処理
export const logout = () => {
    return {
        type:ActionType.LOGOUT
    };
}

// ログインリクエスト中
export const requestLogin = () => {
    return {
        type: ActionType.LOGIN_REQUEST
    };
}

// リクエスト成功
export const receiveLoginSuccess = () => {
    return {
        type: ActionType.LOGIN_RECEIVE_SUCCESS
    };
}

// リクエスト失敗
export const receiveLoginFailed = () => {
    return {
        type:ActionType.LOGIN_RECEIVE_FAILED
    };
}

////////////////////////////////////////////////////////////////////////////
// ここからコンポーネントのアクション
////////////////////////////////////////////////////////////////////////////
// アクションタイプをマッピング
export const ActionType2 = {
	SET_FILENAME_LIST:"SET_FILENAME_LIST",
    SET_MTIME:"SET_MTIME",
	SET_SELECTED_FILENAME:"SET_SELECTED_FILENAME",
    SET_CRAWLING_STATUS:"SET_CRAWLING_STATUS",
}

// コンテンツファイルリストを返却
export const SET_FILENAME_LIST = (param) => {
	return {
			type: ActionType2.SET_FILENAME_LIST,
            fileNameList:param
	};
}

// ファイル最終更新日時
export const SET_MTIME = (param) => {
	return {
			type:ActionType2.SET_MTIME,
            mtime:param
	};
}

// コンテンツファイルリストの中からユーザーが選択したファイルを返却
export const SET_SELECTED_FILENAME = (selectedFileName, selectedContentsList) => {
	return {
			type:ActionType2.SET_SELECTED_FILENAME,
            fileName:selectedFileName,
            contentsList:selectedContentsList
	};
}

export const SET_CRAWLING_STATUS = (nowStatus) => {
    console.log("actions.SET_CRAWLING_STATUS called.");
    console.log(nowStatus);
    return {
        type:ActionType2.SET_CRAWLING_STATUS,
        status:nowStatus
    }
}

export default Login;