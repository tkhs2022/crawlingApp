import store from "../store/store.js";
/////////////////////////////////////////////////////////////////
// ログイン情報をリクエスト
// ***レスポンスデータのイメージ***
// array{"status:true, "result":{"user": "yamada"}}
const Login = (user, password) => {
    var _user = user;
    var _password = password;
    return new Promise((resolve, reject) => {
        store.dispatch(LOGIN_REQUEST());
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
                store.dispatch(LOGIN_RECEIVE_SUCCESS(_user));
                resolve(true);
            } else {
                store.dispatch(LOGIN_RECEIVE_FAILED());
                resolve(false);
            }
        })
        .catch(function(error) {
            console.error(error);
            store.dispatch(LOGIN_RECEIVE_FAILED());
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
    LOGIN_RECEIVE_FAILED:"LOGIN_RECEIVE_FAILED",
    SET_PORT:"SET_PORT",
    SET_LOCATION_URL:"SET_LOCATION_URL"
}

// ログアウト処理
export const LOGOUT = () => {
    return {
        type:ActionType.LOGOUT
    };
}

// ログインリクエスト中
export const LOGIN_REQUEST = () => {
    return {
        type: ActionType.LOGIN_REQUEST
    };
}

// リクエスト成功
export const LOGIN_RECEIVE_SUCCESS = (nowUser) => {
    return {
        type: ActionType.LOGIN_RECEIVE_SUCCESS,
        user:nowUser
    };
}

// リクエスト失敗
export const LOGIN_RECEIVE_FAILED = () => {
    return {
        type:ActionType.LOGIN_RECEIVE_FAILED
    };
}

// ポート番号取得
export const SET_PORT = (nowPort) => {
    return {
        type:ActionType.SET_PORT,
        port:nowPort
    };
}

// ロケーションURL取得
export const SET_LOCATION_URL = (nowLocation) => {
    var pattern = "localhost";
    if (nowLocation.match(pattern)) {
        nowLocation = nowLocation.replace(":3000/", "");
    }
    return {
        type:ActionType.SET_LOCATION_URL,
        location:nowLocation
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
    SET_KUBUN_LIST:"SET_KUBUN_LIST",
    SET_CRAWLING_LIST:"SET_CRAWLING_LIST",
    SET_SOCKET_INTERVALID:"SET_SOCKET_INTERVALID"
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
    return {
        type:ActionType2.SET_CRAWLING_STATUS,
        status:nowStatus
    }
}

export const SET_KUBUN_LIST = (nowKubunList) => {
    return {
        type:ActionType2.SET_KUBUN_LIST,
        kubunList:nowKubunList
    }
}

export const SET_CRAWLING_LIST = (nowCrawlingList) => {
    return {
        type:ActionType2.SET_CRAWLING_LIST,
        crawlingList:nowCrawlingList
    }
}

export const SET_SOCKET_INTERVALID = (nowIntervalId) => {
    return {
        type:ActionType2.SET_SOCKET_INTERVALID,
        intervalId:nowIntervalId
    }
}

export default Login;