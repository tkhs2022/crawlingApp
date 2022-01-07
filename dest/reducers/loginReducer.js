"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.loginReducer = exports.initialState = exports.dumb = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

////////////////////////////////////////////////////
// レデューサー
////////////////////////////////////////////////////
var dumb = function dumb() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return state;
}; ////////////////////////////////////////////////////
// ログイン


exports.dumb = dumb;
var initialState = {
  session: false,
  status: 0 // 0:処理前 1:ログイン成功 -1:ログイン失敗

};
exports.initialState = initialState;

var loginReducer = function loginReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "LOGIN_REQUEST":
      return _objectSpread(_objectSpread({}, state), {}, {
        session: false,
        status: 0
      });

    case "LOGIN_RECEIVE_SUCCESS":
      return _objectSpread(_objectSpread({}, state), {}, {
        session: true,
        status: 1
      });

    case "LOGIN_RECEIVE_FAILED":
      return _objectSpread(_objectSpread({}, state), {}, {
        session: false,
        status: -1
      });

    case "LOGOUT":
      console.log("loginReducer called. at case LOGOUT.");
      return _objectSpread(_objectSpread({}, state), {}, {
        session: false,
        status: 0
      });

    default:
      return state;
  }
};

exports.loginReducer = loginReducer;
var _default = loginReducer;
exports.default = _default;