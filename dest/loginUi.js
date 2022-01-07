"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginUI = LoginUI;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _action = _interopRequireDefault(require("./actions/action.js"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _store = _interopRequireDefault(require("./store/store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

///////////////////////////////////////////////////////////////// 
// コンポーネント
function LoginUI(props) {
  var _useState = (0, _react.useState)("未入力。"),
      _useState2 = _slicedToArray(_useState, 2),
      message = _useState2[0],
      setMessage = _useState2[1];

  var _useState3 = (0, _react.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      user = _useState4[0],
      setUser = _useState4[1];

  var _useState5 = (0, _react.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      password = _useState6[0],
      setPassword = _useState6[1]; ///////////////////////////////////////////////////////////////// 
  // ログインボタン押下処理


  var onLogin = function onLogin(e) {
    e.preventDefault();

    if (user && password) {
      (0, _action.default)(user, password).then(function (response) {
        var list = _store.default.getState();

        if (list.loginReducer.status == -1) {
          setMessage("ユーザー名もしくはパスワードが違います。");
        } else if (list.loginReducer.status == 1) {
          setMessage("ログイン成功");
          props.history.push('/ShowContentsArea');
        }
      });
    } else {
      setMessage("ユーザー名とパスワードを入力してください。");
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    style: {
      maxWidth: "30%",
      margin: "0 auto",
      marginTop: "15%"
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: "red"
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      margin: "0 auto",
      padding: "10px"
    }
  }, message)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30E6\u30FC\u30B6\u30FC",
    style: {
      width: "80%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    onChange: function onChange(e) {
      return setUser(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30D1\u30B9\u30EF\u30FC\u30C9",
    style: {
      width: "80%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  }))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    style: {
      fontSize: "midium"
    },
    justifyContent: "flex-end",
    direction: "row"
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    style: {
      margin: "1.5em",
      fontSize: "midium"
    },
    variant: "contained",
    color: "secondary",
    onClick: function onClick(e) {
      return onLogin(e);
    }
  }, "\u30ED\u30B0\u30A4\u30F3")))));
}

var _default = LoginUI;
exports.default = _default;