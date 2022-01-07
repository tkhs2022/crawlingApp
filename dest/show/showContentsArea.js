"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ShowContentsArea = exports.MainBlockControl = exports.Kbns = exports.Crawlings = exports.PreClickM = exports.SiteHedderActiveM = exports.SiteHedderActiveMortion = exports.PreClickMortion = exports.TransitionContentsTitleShow = exports.TransitionCacheList = exports.TransitionImageSiteHeaderShow = exports.CaseB = exports.CaseA = exports.DetailShowActiveSiteHedder = exports.DetailHide = exports.DetailShow = exports.DetailOriginal = exports.ContentTitleUnderBorderHide = exports.ContentTitleUnderBorderShow = exports.ContentTitleUnderBorderOriginal = exports.ContentsTitleOriginal = exports.CacheList = exports.SiteHedderButtonShow = exports.SiteHedderButtonOriginal = exports.ImageSiteHeaderOriginal = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _connectedReactRouter = require("connected-react-router");

var _showContentsBlock = require("./showContentsBlock.jsx");

var _showContentsTitle = require("./showContentsTitle.jsx");

var _kubunList = require("../actions/kubunList.js");

var _crawlingList = require("../actions/crawlingList.js");

var _commonFunc = _interopRequireDefault(require("../commonFunc.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

///////////////////////////////////////////////////////////////// 
// 定数定義エリア
// ヘッダー部(背景)
var ImageSiteHeaderOriginal = "imageSiteHeaderOriginal"; // ヘッダー部(履歴表示ボタン)

exports.ImageSiteHeaderOriginal = ImageSiteHeaderOriginal;
var SiteHedderButtonOriginal = "siteHedderButtonOriginal";
exports.SiteHedderButtonOriginal = SiteHedderButtonOriginal;
var SiteHedderButtonShow = "siteHedderButtonShow"; // 履歴表示ボックスのスタイル

exports.SiteHedderButtonShow = SiteHedderButtonShow;
var CacheList = "cacheList"; // コンテンツタイトルボックス

exports.CacheList = CacheList;
var ContentsTitleOriginal = "contentsTitleOriginal"; // コンテンツタイトルボックスの下線

exports.ContentsTitleOriginal = ContentsTitleOriginal;
var ContentTitleUnderBorderOriginal = "contentTitleUnderBorderOriginal";
exports.ContentTitleUnderBorderOriginal = ContentTitleUnderBorderOriginal;
var ContentTitleUnderBorderShow = "contentTitleUnderBorderShow";
exports.ContentTitleUnderBorderShow = ContentTitleUnderBorderShow;
var ContentTitleUnderBorderHide = "contentTitleUnderBorderHide"; // コンテンツボックス

exports.ContentTitleUnderBorderHide = ContentTitleUnderBorderHide;
var DetailOriginal = "detail";
exports.DetailOriginal = DetailOriginal;
var DetailShow = "detailShow";
exports.DetailShow = DetailShow;
var DetailHide = "detailHide";
exports.DetailHide = DetailHide;
var DetailShowActiveSiteHedder = "detailShowActiveSiteHedder"; // MoveBlockOnClick関数呼び出し時のパラメータに、自身の関数名を入れる。

exports.DetailShowActiveSiteHedder = DetailShowActiveSiteHedder;
var CaseA = "OnHedderBox";
exports.CaseA = CaseA;
var CaseB = "ContentsTitleButtonWithBorder"; ///////////////////////////////////////////////////////////////// 
// react-transition-groupで使用するスタイル
// showOnHedderBox.jsx ヘッダー部で使用。
// 2021/12/10 廃止

exports.CaseB = CaseB;
var TransitionImageSiteHeaderShow = {
  entering: {
    height: "200px"
  },
  entered: {
    height: "200px"
  },
  exiting: {
    height: "150px"
  },
  exited: {
    height: "150px"
  }
};
exports.TransitionImageSiteHeaderShow = TransitionImageSiteHeaderShow;
var TransitionCacheList = {
  entering: {
    opacity: "0"
  },
  entered: {
    opacity: "1"
  },
  exiting: {
    opacity: "0"
  },
  exited: {
    opacity: "0"
  }
}; // showContentsTitle.jsx コンテンツタイトル部で使用。

exports.TransitionCacheList = TransitionCacheList;
var TransitionContentsTitleShow = {
  entering: {
    transform: "translateY(120%)"
  },
  entered: {
    transform: "translateY(120%)"
  },
  exiting: {
    transform: "translateY(0%)"
  },
  exited: {
    transform: "translateY(0%)"
  }
}; ///////////////////////////////////////////////////////////////// 
// 区分リストの区分が入る。前回クリックしたタイトルボタンを保持する為に使用。
// デフォルトは区分1のタイトルボタンを保持させる。

exports.TransitionContentsTitleShow = TransitionContentsTitleShow;

var PreClickMortion = /*#__PURE__*/function () {
  function PreClickMortion() {
    _classCallCheck(this, PreClickMortion);

    this.PreClick = null;
  }

  _createClass(PreClickMortion, [{
    key: "SetterPreClick",
    value: function SetterPreClick(param) {
      this.PreClick = param;
    }
  }, {
    key: "GetterPreClick",
    value: function GetterPreClick() {
      return this.PreClick;
    }
  }]);

  return PreClickMortion;
}(); ///////////////////////////////////////////////////////////////// 
// コンテンツボックスが表示されている場合、履歴表示ボタンクリック時に
// コンテンツボックスを断下げする為に使用。


exports.PreClickMortion = PreClickMortion;

var SiteHedderActiveMortion = /*#__PURE__*/function () {
  function SiteHedderActiveMortion() {
    _classCallCheck(this, SiteHedderActiveMortion);

    this.SiteHedderActive = false;
  }

  _createClass(SiteHedderActiveMortion, [{
    key: "SetterSiteHedderActive",
    value: function SetterSiteHedderActive(param) {
      this.SiteHedderActive = param;
    }
  }, {
    key: "GetterSiteHedderActive",
    value: function GetterSiteHedderActive() {
      return this.SiteHedderActive;
    }
  }]);

  return SiteHedderActiveMortion;
}(); ///////////////////////////////////////////////////////////////// 
// インスタンス生成エリア


exports.SiteHedderActiveMortion = SiteHedderActiveMortion;
var SiteHedderActiveM = new SiteHedderActiveMortion(SiteHedderActiveMortion);
exports.SiteHedderActiveM = SiteHedderActiveM;
var PreClickM = new PreClickMortion(PreClickMortion); // export const Contents = new ContentsList(ContentsList);  index.jsxへ移行。

exports.PreClickM = PreClickM;
var Crawlings = new _crawlingList.CrawlingList(_crawlingList.CrawlingList);
exports.Crawlings = Crawlings;
var Kbns = new _kubunList.KbnList(_kubunList.KbnList); ///////////////////////////////////////////////////////////////// 
// メインブロックをコントロール。

exports.Kbns = Kbns;

var MainBlockControl = /*#__PURE__*/function (_React$Component) {
  _inherits(MainBlockControl, _React$Component);

  var _super = _createSuper(MainBlockControl);

  function MainBlockControl(props) {
    _classCallCheck(this, MainBlockControl);

    return _super.call(this, props);
  }

  _createClass(MainBlockControl, [{
    key: "render",
    value: function render() {
      var ContentsRows = this.props.Kbns.kbns.map(function (List, index) {
        return /*#__PURE__*/_react.default.createElement(_showContentsBlock.ContentsBlockControl, {
          key: index,
          Kbn: List.kbn
        });
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "mainBlockControl"
      }, /*#__PURE__*/_react.default.createElement("div", null, ContentsRows));
    }
  }]);

  return MainBlockControl;
}(_react.default.Component); ///////////////////////////////////////////////////////////////// 
// ルートコンポーネント。画面を開いたときに最初に描画される。


exports.MainBlockControl = MainBlockControl;

var ShowContentsArea = /*#__PURE__*/function (_React$Component2) {
  _inherits(ShowContentsArea, _React$Component2);

  var _super2 = _createSuper(ShowContentsArea);

  function ShowContentsArea(props) {
    var _this;

    _classCallCheck(this, ShowContentsArea);

    _this = _super2.call(this, props);
    _this.KbnList = Kbns.getKbnList();
    _this.state = {
      mount: false
    };
    return _this;
  }

  _createClass(ShowContentsArea, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // メイン画面のCSSファイル解除
      (0, _commonFunc.default)("showCrawlSetting.css", "App.css");
    } // HedderMortionAcive(){
    //   this.state.mount ? this.setState({mount:false}) : this.setState({mount:true});
    // }

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_showContentsTitle.ContentsTitleBlock, {
        Kbns: this.KbnList,
        mount: this.state.mount
      }), /*#__PURE__*/_react.default.createElement(MainBlockControl, {
        Kbns: this.KbnList,
        mount: this.state.mount
      }));
    }
  }]);

  return ShowContentsArea;
}(_react.default.Component);

exports.ShowContentsArea = ShowContentsArea;

var _default = (0, _reactRedux.connect)(null, {
  push: _connectedReactRouter.push
})(ShowContentsArea);

exports.default = _default;