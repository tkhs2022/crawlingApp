"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SET_CRAWLING_STATUS = exports.SET_SELECTED_FILENAME = exports.SET_MTIME = exports.SET_FILENAME_LIST = exports.ActionType2 = exports.receiveLoginFailed = exports.receiveLoginSuccess = exports.requestLogin = exports.logout = exports.ActionType = void 0;

var _store = _interopRequireDefault(require("../store/store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/////////////////////////////////////////////////////////////////
// ログイン情報をリクエスト
// ***レスポンスデータのイメージ***
// array{"status:true, "result":{"user": "yamada"}}
var Login = function Login(user, password) {
  return new Promise(function (resolve, reject) {
    _store.default.dispatch(requestLogin());

    fetch("/requestLoginInfo", {
      method: "POST",
      mode: "no-cors",
      heders: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "user": user,
        "password": password
      })
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
    }).then(function (responseJson) {
      if (responseJson.result == true) {
        _store.default.dispatch(receiveLoginSuccess());

        resolve(true);
      } else {
        _store.default.dispatch(receiveLoginFailed());

        resolve(false);
      }
    }).catch(function (error) {
      console.error(error);

      _store.default.dispatch(receiveLoginFailed());

      reject(false);
    });
  });
}; ////////////////////////////////////////////////////////////////////////////
// ここからログイン処理のアクション
////////////////////////////////////////////////////////////////////////////
// アクションタイプをマッピング


var ActionType = {
  LOGOUT: "LOGOUT",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_RECEIVE_SUCCESS: "LOGIN_RECEIVE_SUCCESS",
  LOGIN_RECEIVE_FAILED: "LOGIN_RECEIVE_FAILED"
}; // ログアウト処理

exports.ActionType = ActionType;

var logout = function logout() {
  return {
    type: ActionType.LOGOUT
  };
}; // ログインリクエスト中


exports.logout = logout;

var requestLogin = function requestLogin() {
  return {
    type: ActionType.LOGIN_REQUEST
  };
}; // リクエスト成功


exports.requestLogin = requestLogin;

var receiveLoginSuccess = function receiveLoginSuccess() {
  return {
    type: ActionType.LOGIN_RECEIVE_SUCCESS
  };
}; // リクエスト失敗


exports.receiveLoginSuccess = receiveLoginSuccess;

var receiveLoginFailed = function receiveLoginFailed() {
  return {
    type: ActionType.LOGIN_RECEIVE_FAILED
  };
}; ////////////////////////////////////////////////////////////////////////////
// ここからコンポーネントのアクション
////////////////////////////////////////////////////////////////////////////
// アクションタイプをマッピング


exports.receiveLoginFailed = receiveLoginFailed;
var ActionType2 = {
  SET_FILENAME_LIST: "SET_FILENAME_LIST",
  SET_MTIME: "SET_MTIME",
  SET_SELECTED_FILENAME: "SET_SELECTED_FILENAME",
  SET_CRAWLING_STATUS: "SET_CRAWLING_STATUS"
}; // コンテンツファイルリストを返却

exports.ActionType2 = ActionType2;

var SET_FILENAME_LIST = function SET_FILENAME_LIST(param) {
  return {
    type: ActionType2.SET_FILENAME_LIST,
    fileNameList: param
  };
}; // ファイル最終更新日時


exports.SET_FILENAME_LIST = SET_FILENAME_LIST;

var SET_MTIME = function SET_MTIME(param) {
  return {
    type: ActionType2.SET_MTIME,
    mtime: param
  };
}; // コンテンツファイルリストの中からユーザーが選択したファイルを返却


exports.SET_MTIME = SET_MTIME;

var SET_SELECTED_FILENAME = function SET_SELECTED_FILENAME(selectedFileName, selectedContentsList) {
  return {
    type: ActionType2.SET_SELECTED_FILENAME,
    fileName: selectedFileName,
    contentsList: selectedContentsList
  };
};

exports.SET_SELECTED_FILENAME = SET_SELECTED_FILENAME;

var SET_CRAWLING_STATUS = function SET_CRAWLING_STATUS(nowStatus) {
  console.log("actions.SET_CRAWLING_STATUS called.");
  console.log(nowStatus);
  return {
    type: ActionType2.SET_CRAWLING_STATUS,
    status: nowStatus
  };
};

exports.SET_CRAWLING_STATUS = SET_CRAWLING_STATUS;
var _default = Login;
exports.default = _default;