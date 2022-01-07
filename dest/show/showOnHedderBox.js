"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OnHedderBox = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _CachePageList = require("../data/CachePageList.js");

var _App = require("../App.jsx");

var _showContentsBlock = require("./showContentsBlock.jsx");

var _js = require("@mdi/js");

var _react2 = _interopRequireDefault(require("@mdi/react"));

var _core = require("@material-ui/core");

var _reactTransitionGroup = require("react-transition-group");

var _cardComponent = require("../card/cardComponent.jsx");

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

// グローバル。履歴表示の為のデータを格納したクラスのインスタンス生成
var Caches = new _CachePageList.CachePageList(_CachePageList.CachePageList); // クラス

var OnHedderBox = /*#__PURE__*/function (_React$Component) {
  _inherits(OnHedderBox, _React$Component);

  var _super = _createSuper(OnHedderBox);

  function OnHedderBox(props) {
    var _this;

    _classCallCheck(this, OnHedderBox);

    _this = _super.call(this, props);
    _this.state = {
      Caches: Caches.getcachePageList()
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(OnHedderBox, [{
    key: "onClick",
    value: function onClick() {
      // 前回クリックの有ったタイトルボタンの区分を取得。
      var click = _App.PreClickM.GetterPreClick(); //履歴表示ボタンのクラス名変更処理


      var ElementSiteHedderButton = document.getElementById("site-hedder-button");

      if (document.getElementsByClassName(_App.SiteHedderButtonOriginal).length > 0) {
        ElementSiteHedderButton.classList.replace(_App.SiteHedderButtonOriginal, _App.SiteHedderButtonShow);

        _App.SiteHedderActiveM.SetterSiteHedderActive(true);
      } else if (document.getElementsByClassName(_App.SiteHedderButtonShow).length > 0) {
        ElementSiteHedderButton.classList.replace(_App.SiteHedderButtonShow, _App.SiteHedderButtonOriginal);

        _App.SiteHedderActiveM.SetterSiteHedderActive(false);
      } // 親コンポーネントのイベント関数呼び出し。再描画するかフラグ。


      this.props.HedderMortionAcive(); // コンテンツボックスのアニメーション表示・非表示

      (0, _showContentsBlock.MoveBlockOnClick)(click, _App.CaseA);
    } // クローリング設定ページへ遷移するタイミングで、PreClickを1に戻す。

  }, {
    key: "InitialSetup",
    value: function InitialSetup() {
      _App.PreClickM.SetterPreClick(1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // 履歴表示させる画像とリンクをカードクラスで生成する。
      var Rows = this.state.Caches.map(function (Cache, index) {
        return /*#__PURE__*/_react.default.createElement(_cardComponent.MediaCardForCacheList, {
          key: index,
          Cache: Cache
        });
      });
      return /*#__PURE__*/_react.default.createElement("header", {
        id: "site-header"
      }, /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.Transition, {
        in: this.props.mount,
        timeout: 400
      }, function (state) {
        return /*#__PURE__*/_react.default.createElement("div", {
          id: "image-site-hedder",
          className: _App.ImageSiteHeaderOriginal,
          style: _App.TransitionImageSiteHeaderShow[state]
        }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "\u3053\u3053\u306B\u5929\u6C17\u4E88\u5831")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "\u3053\u3053\u306B\u4F55\u304B\u5165\u308C\u3088\u3046\u304B\u3002"), /*#__PURE__*/_react.default.createElement("div", {
          id: "cache-list-box",
          className: _App.CacheList,
          style: _App.TransitionCacheList[state]
        }, Rows)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.Button, {
          id: "site-hedder-button",
          className: _App.SiteHedderButtonOriginal
        }, /*#__PURE__*/_react.default.createElement(_react2.default, {
          path: _js.mdiChevronDoubleDown,
          title: "\u95B2\u89A7\u5C65\u6B74\u3092\u8868\u793A",
          onClick: _this2.onClick,
          size: 1,
          color: "gray"
        }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
          to: "/ShowCrawlSetting"
        }, /*#__PURE__*/_react.default.createElement(_core.Button, {
          id: "hamburger-button",
          onClick: _this2.InitialSetup
        }, /*#__PURE__*/_react.default.createElement(_react2.default, {
          path: _js.mdiHamburger,
          title: "\u30AF\u30ED\u30FC\u30EA\u30F3\u30B0\u3092\u8A2D\u5B9A",
          size: 1,
          color: "gray"
        }))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
          to: "/ShowKubunSetting"
        }, /*#__PURE__*/_react.default.createElement(_core.Button, {
          id: "hamburger-button",
          onClick: _this2.InitialSetup
        }, /*#__PURE__*/_react.default.createElement(_react2.default, {
          path: _js.mdiHamburger,
          title: "\u533A\u5206\u3092\u8A2D\u5B9A",
          size: 1,
          color: "gray"
        })))));
      }));
    }
  }]);

  return OnHedderBox;
}(_react.default.Component);

exports.OnHedderBox = OnHedderBox;
var _default = OnHedderBox;
exports.default = _default;