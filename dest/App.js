"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _loginUi = _interopRequireDefault(require("./loginUi.jsx"));

var _showContentsArea = _interopRequireDefault(require("./show/showContentsArea.jsx"));

var _showCrawlSetting = _interopRequireDefault(require("./show/showCrawlSetting.jsx"));

var _showKubunSetting = _interopRequireDefault(require("./show/showKubunSetting.jsx"));

var _toolbar = _interopRequireDefault(require("./toolbar/toolbar.jsx"));

var _errorBoundary = _interopRequireDefault(require("./error/errorBoundary.jsx"));

var _commonFunc = require("./commonFunc.js");

var _auth = _interopRequireDefault(require("./auth.jsx"));

var _reactRouterDom = require("react-router-dom");

var _store = _interopRequireDefault(require("./store/store.js"));

var _index = require("./index.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

///////////////////////////////////////////////////////////////// 
// メインコンポーネント
var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    _classCallCheck(this, App);

    return _super.apply(this, arguments);
  }

  _createClass(App, [{
    key: "componentWillMount",
    value: ///////////////////////////////////////////////////////////////// 
    // componentWillMount()
    function componentWillMount() {
      // コンテンツリストオブジェクトを取得
      _index.Contents.getContentsList(_store.default.getState().componentReducer.selectedFileName); // ローディングCSSを無効化


      (0, _commonFunc.cssFileDisable)("loading.css"); // コンテンツファイル名のリストを取得

      _index.Contents.recentUpdateFileDate(1, "list"); // コンテンツリスト(最新のもの)最終更新日時を取得。=最終クローリング日時


      _index.Contents.recentUpdateFileDate(1, "mtime");
    } ///////////////////////////////////////////////////////////////// 
    // レンダー

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "loading"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "circle"
      })), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/login",
        component: _loginUi.default
      }), /*#__PURE__*/_react.default.createElement(_auth.default, null, /*#__PURE__*/_react.default.createElement(_toolbar.default, null), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        path: "/ShowCrawlSetting",
        component: _showCrawlSetting.default
      }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        path: "/ShowKubunSetting",
        component: _showKubunSetting.default
      }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        path: "/ShowContentsArea",
        component: _showContentsArea.default
      }))));
    }
  }]);

  return App;
}(_react.default.Component);

exports.default = App;