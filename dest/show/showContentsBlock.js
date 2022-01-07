"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MoveBlockOnClick = exports.ContentsBlockControl = void 0;

var _react = _interopRequireDefault(require("react"));

var _cardComponent = _interopRequireDefault(require("../card/cardComponent.jsx"));

var _showContentsArea = require("./showContentsArea.jsx");

var _store = _interopRequireDefault(require("../store/store.js"));

var _commonFunc = require("../commonFunc.js");

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
// コンテンツブロックをコントロール。コンテンツごとに記事を振り分け。(初回のみ)
var ContentsBlockControl = /*#__PURE__*/function (_React$Component) {
  _inherits(ContentsBlockControl, _React$Component);

  var _super = _createSuper(ContentsBlockControl);

  function ContentsBlockControl(props) {
    _classCallCheck(this, ContentsBlockControl);

    return _super.call(this, props);
  }

  _createClass(ContentsBlockControl, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // storeアクセスでの待機中はローディングCSSを流す
      (0, _commonFunc.cssFileAble)("loading.css");
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _commonFunc.cssFileDisable)("loading.css");
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var contentesList = _store.default.getState().componentReducer.thisContents;

      var Rows = contentesList != undefined && contentesList.article.map(function (Content, index) {
        return _this.props.Kbn == Content.kbn && /*#__PURE__*/_react.default.createElement(_cardComponent.default, {
          key: index,
          Content: Content
        });
      });
      return (// デフォルトでは区分1のコンテンツブロックを表示
        this.props.Kbn == 1 ? /*#__PURE__*/_react.default.createElement("div", {
          id: this.props.Kbn,
          className: _showContentsArea.DetailShow
        }, Rows) : /*#__PURE__*/_react.default.createElement("div", {
          id: this.props.Kbn,
          className: _showContentsArea.DetailOriginal
        }, Rows)
      );
    }
  }]);

  return ContentsBlockControl;
}(_react.default.Component); ///////////////////////////////////////////////////////////////// 
// コンテンツボックスのアニメーション表示・非表示。


exports.ContentsBlockControl = ContentsBlockControl;

var MoveBlockOnClick = function MoveBlockOnClick(TargetKbn, Caller) {
  var SiteHedderActive = _showContentsArea.SiteHedderActiveM.GetterSiteHedderActive();

  if (TargetKbn == null && TargetKbn == undefined && Caller == _showContentsArea.CaseA) {
    return;
  } // ボタンクリックのあったコンテンツタイトルに対応するコンテンツブロックを取得


  var ElementOfContentsBlock = document.getElementById(TargetKbn); // コンテンツブロックの表示状態(className)を取得

  var TargetContentsBlockClassName = ElementOfContentsBlock.getAttribute("class");

  switch (Caller) {
    // CaseA:履歴表示ボタン処理から呼ばれたケース
    case _showContentsArea.CaseA:
      switch (TargetContentsBlockClassName) {
        case _showContentsArea.DetailShow:
          SiteHedderActive && ElementOfContentsBlock.setAttribute("class", _showContentsArea.DetailShowActiveSiteHedder);
          break;

        case _showContentsArea.DetailShowActiveSiteHedder:
          !SiteHedderActive && ElementOfContentsBlock.setAttribute("class", _showContentsArea.DetailShow);
          break;
      }

      break;
    // CaseB:コンテンツタイトルボタン押下処理から呼ばれたケース

    case _showContentsArea.CaseB:
      switch (TargetContentsBlockClassName) {
        case _showContentsArea.DetailOriginal:
          SiteHedderActive ? ElementOfContentsBlock.setAttribute("class", _showContentsArea.DetailShowActiveSiteHedder) : ElementOfContentsBlock.setAttribute("class", _showContentsArea.DetailShow);
          break;

        case _showContentsArea.DetailHide:
          SiteHedderActive ? ElementOfContentsBlock.setAttribute("class", _showContentsArea.DetailShowActiveSiteHedder) : ElementOfContentsBlock.setAttribute("class", _showContentsArea.DetailShow);
          break;

        case _showContentsArea.DetailShow:
          ElementOfContentsBlock.setAttribute("class", _showContentsArea.DetailHide);
          break;

        case _showContentsArea.DetailShowActiveSiteHedder:
          ElementOfContentsBlock.setAttribute("class", _showContentsArea.DetailHide);
          break;
      }

  }
};

exports.MoveBlockOnClick = MoveBlockOnClick;
var _default = MoveBlockOnClick;
exports.default = _default;