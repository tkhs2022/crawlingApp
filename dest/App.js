"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MainBlockControl = exports.MoveBlockOnClick = exports.ContentsBlockControl = exports.ContentsTitleBlock = exports.ContentsTitleButtonWithBorder = exports.OnHedderBox = void 0;

var _react = _interopRequireDefault(require("react"));

require("./css/App.css");

var _contents = _interopRequireWildcard(require("./data/contents.js"));

var _cardComponent = _interopRequireWildcard(require("./cardComponent.jsx"));

var _core = require("@material-ui/core");

var _DoubleArrow = _interopRequireDefault(require("@material-ui/icons/DoubleArrow"));

var _js = require("@mdi/js");

var _react2 = _interopRequireDefault(require("@mdi/react"));

var _reactTransitionGroup = require("react-transition-group");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
// 定数定義エリア
///////////////////////////////////////////////////////////////// 
// ヘッダー部(背景)
var ImageSiteHeaderOriginal = "imageSiteHeaderOriginal"; // ヘッダー部(履歴表示ボタン)

var SiteHedderButtonOriginal = "siteHedderButtonOriginal";
var SiteHedderButtonShow = "siteHedderButtonShow"; //

var CacheList = "cacheList"; // コンテンツタイトルボックス

var ContentsTitleOriginal = "contentsTitleOriginal"; // コンテンツタイトルボックスの下線

var ContentTitleUnderBorderOriginal = "contentTitleUnderBorderOriginal";
var ContentTitleUnderBorderShow = "contentTitleUnderBorderShow";
var ContentTitleUnderBorderHide = "contentTitleUnderBorderHide"; // コンテンツボックス

var DetailOriginal = "detail";
var DetailShow = "detailShow";
var DetailHide = "detailHide";
var DetailShowActiveSiteHedder = "detailShowActiveSiteHedder"; // その他コンテンツが入る右側のボックス

var OtherContentsOriginal = "otherContentsOriginal"; // 説明何か書く。

var CaseA = "OnHedderBox";
var CaseB = "ContentsTitleButtonWithBorder"; // グローバル。コンテンツクラスのインスタンス生成

var Contents = new _contents.default(_contents.default);
var Caches = new _contents.CachePageList(_contents.CachePageList); // react-transition-groupで使用するスタイル

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
};
var TransitionOtherContentsShow = {
  entering: {
    transform: "translateY(10%)"
  },
  entered: {
    transform: "translateY(10%)"
  },
  exiting: {
    transform: "translateY(0%)"
  },
  exited: {
    transform: "translateY(0%)"
  }
};
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
};
var PreClick = 1; // 前回クリックしたタイトルボタンを保持する為に使用。デフォルトは区分1のタイトルボタンを保持させる。

var SiteHedderActive = false; // コンテンツボックスが表示されている場合、履歴表示ボタンクリック時にコンテンツボックスを断下げする為に使用
///////////////////////////////////////////////////////////////// 
//ヘッダーに閲覧履歴ボックスを表示
///////////////////////////////////////////////////////////////// 

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
      //履歴表示ボタンのクラス名変更処理
      var ElementSiteHedderButton = document.getElementById("site-hedder-button");

      if (document.getElementsByClassName(SiteHedderButtonOriginal).length > 0) {
        ElementSiteHedderButton.classList.replace(SiteHedderButtonOriginal, SiteHedderButtonShow);
        SiteHedderActive = true;
      } else if (document.getElementsByClassName(SiteHedderButtonShow).length > 0) {
        ElementSiteHedderButton.classList.replace(SiteHedderButtonShow, SiteHedderButtonOriginal);
        SiteHedderActive = false;
      } // 親コンポーネントのイベント関数呼び出し。再描画するかフラグ。


      this.props.HedderMortionAcive(); // コンテンツボックスのアニメーション表示・非表示

      MoveBlockOnClick(PreClick, CaseA);
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
          className: ImageSiteHeaderOriginal,
          style: TransitionImageSiteHeaderShow[state]
        }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "\u3053\u3053\u306B\u5929\u6C17\u4E88\u5831")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "\u3053\u3053\u306B\u4F55\u304B\u5165\u308C\u3088\u3046\u304B\u3002"), /*#__PURE__*/_react.default.createElement("div", {
          id: "cache-list-box",
          className: CacheList,
          style: TransitionCacheList[state]
        }, Rows)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.Button, {
          id: "site-hedder-button",
          className: SiteHedderButtonOriginal,
          onClick: _this2.onClick
        }, /*#__PURE__*/_react.default.createElement(_react2.default, {
          path: _js.mdiChevronDoubleDown,
          title: "\u95B2\u89A7\u5C65\u6B74\u3092\u8868\u793A",
          size: 1,
          color: "gray"
        }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.Button, {
          id: "hamburger-button"
        }, /*#__PURE__*/_react.default.createElement(_react2.default, {
          path: _js.mdiHamburger,
          title: "hamburger",
          size: 1,
          color: "gray"
        }))));
      }));
    }
  }]);

  return OnHedderBox;
}(_react.default.Component); ///////////////////////////////////////////////////////////////// 
// コンテンツタイトルのボタンとクリックイベント。クリックイベントで、
// コンテンツタイトルのボックスに下線を引く。
///////////////////////////////////////////////////////////////// 


exports.OnHedderBox = OnHedderBox;

var ContentsTitleButtonWithBorder = /*#__PURE__*/function (_React$Component2) {
  _inherits(ContentsTitleButtonWithBorder, _React$Component2);

  var _super2 = _createSuper(ContentsTitleButtonWithBorder);

  function ContentsTitleButtonWithBorder(props) {
    var _this3;

    _classCallCheck(this, ContentsTitleButtonWithBorder);

    _this3 = _super2.call(this, props);
    _this3.onClick = _this3.onClick.bind(_assertThisInitialized(_this3));
    return _this3;
  } // コンテンツタイトルボタンのクリックイベント


  _createClass(ContentsTitleButtonWithBorder, [{
    key: "onClick",
    value: function onClick(e) {
      // 前回ボタンクリックのあったコンテンツタイトルについて、下線が表示してあれば非表示
      if (PreClick != null && PreClick != undefined && PreClick != e) {
        var ElementPreClick = document.getElementById("border-" + PreClick);
        var CheckElementPreClick = ElementPreClick.getAttribute("class");

        switch (CheckElementPreClick) {
          case ContentTitleUnderBorderShow:
            ElementPreClick.classList.replace(ContentTitleUnderBorderShow, ContentTitleUnderBorderHide); // 表示していたコンテンツブロックを隠す

            MoveBlockOnClick(PreClick, CaseB);
            break;

          case ContentTitleUnderBorderHide:
            break;

          default:
            ElementPreClick.setAttribute("class", ContentTitleUnderBorderOriginal);
            break;
        }
      } // 今回ボタンクリックのあったコンテンツタイトルを取得


      var ElementThisClick = document.getElementById("border-" + e);
      var CheckElementThisClick = ElementThisClick.getAttribute("class"); //  今回ボタンクリックのあったコンテンツタイトルの下線を表示・非表示にする

      switch (CheckElementThisClick) {
        case ContentTitleUnderBorderShow:
          ElementThisClick.classList.replace(ContentTitleUnderBorderShow, ContentTitleUnderBorderHide);
          break;

        case ContentTitleUnderBorderHide:
          ElementThisClick.classList.replace(ContentTitleUnderBorderHide, ContentTitleUnderBorderShow);
          break;

        case ContentTitleUnderBorderOriginal:
          ElementThisClick.classList.replace(ContentTitleUnderBorderOriginal, ContentTitleUnderBorderShow);
          break;

        default:
          ElementThisClick.setAttribute("class", ContentTitleUnderBorderOriginal);
          break;
      } // コンテンツボックスのアニメーション表示・非表示


      MoveBlockOnClick(e, CaseB); // 今回のボタンクリックのあった区分を保存

      PreClick = e;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.Button, {
        className: "contents-title-button",
        onClick: function onClick(e) {
          return _this4.onClick(_this4.props.Kbn, e);
        }
      }, /*#__PURE__*/_react.default.createElement(_DoubleArrow.default, {
        title: this.props.name
      }))), // デフォルトでは区分1のコンテンツブロックを表示
      this.props.Kbn == 1 ? /*#__PURE__*/_react.default.createElement("div", {
        id: "border-" + this.props.Kbn,
        className: ContentTitleUnderBorderShow
      }) : /*#__PURE__*/_react.default.createElement("div", {
        id: "border-" + this.props.Kbn,
        className: ContentTitleUnderBorderOriginal
      }));
    }
  }]);

  return ContentsTitleButtonWithBorder;
}(_react.default.Component); ///////////////////////////////////////////////////////////////// 
// コンテンツタイトルブロック。タイトル毎にボタンを配置するコンポー
// ネントを呼び出す。
///////////////////////////////////////////////////////////////// 


exports.ContentsTitleButtonWithBorder = ContentsTitleButtonWithBorder;

var ContentsTitleBlock = function ContentsTitleBlock(props) {
  var NaviBar = props.Kbns.map(function (Kbns, index) {
    return /*#__PURE__*/_react.default.createElement("h3", {
      key: index,
      className: "name-title"
    }, /*#__PURE__*/_react.default.createElement("label", null, Kbns.kbnname), /*#__PURE__*/_react.default.createElement(ContentsTitleButtonWithBorder, {
      Kbn: Kbns.kbn
    }));
  });
  return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.Transition, {
    in: props.mount,
    timeout: 400
  }, function (state) {
    return /*#__PURE__*/_react.default.createElement("div", {
      id: "contents-title",
      className: ContentsTitleOriginal,
      style: TransitionContentsTitleShow[state]
    }, NaviBar);
  });
}; ///////////////////////////////////////////////////////////////// 
// コンテンツブロックをコントロール。コンテンツごとに記事を振り分け。
///////////////////////////////////////////////////////////////// 


exports.ContentsTitleBlock = ContentsTitleBlock;

var ContentsBlockControl = /*#__PURE__*/function (_React$Component3) {
  _inherits(ContentsBlockControl, _React$Component3);

  var _super3 = _createSuper(ContentsBlockControl);

  function ContentsBlockControl(props) {
    var _this5;

    _classCallCheck(this, ContentsBlockControl);

    _this5 = _super3.call(this, props);
    _this5.state = {
      Contents: Contents.getContentsList()
    };
    return _this5;
  }

  _createClass(ContentsBlockControl, [{
    key: "render",
    value: function render() {
      var _this6 = this;

      var Rows = this.state.Contents.map(function (Content, index) {
        return _this6.props.Kbn == Content.kbn && /*#__PURE__*/_react.default.createElement(_cardComponent.default, {
          key: index,
          Content: Content
        });
      });
      return (// デフォルトでは区分1のコンテンツブロックを表示
        this.props.Kbn == 1 ? /*#__PURE__*/_react.default.createElement("div", {
          id: this.props.Kbn,
          className: DetailShow
        }, Rows) : /*#__PURE__*/_react.default.createElement("div", {
          id: this.props.Kbn,
          className: DetailOriginal
        }, Rows)
      );
    }
  }]);

  return ContentsBlockControl;
}(_react.default.Component); ///////////////////////////////////////////////////////////////// 
// コンテンツボックスのアニメーション表示・非表示。
/////////////////////////////////////////////////////////////////


exports.ContentsBlockControl = ContentsBlockControl;

var MoveBlockOnClick = function MoveBlockOnClick(TargetKbn, Caller) {
  if (TargetKbn == null && TargetKbn == undefined && Caller == CaseA) {
    return;
  } // ボタンクリックのあったコンテンツタイトルに対応するコンテンツブロックを取得


  var ElementOfContentsBlock = document.getElementById(TargetKbn); // コンテンツブロックの表示状態(className)を取得

  var TargetContentsBlockClassName = ElementOfContentsBlock.getAttribute("class");

  switch (Caller) {
    // CaseA:履歴表示ボタン処理から呼ばれたケース
    case CaseA:
      switch (TargetContentsBlockClassName) {
        case DetailShow:
          SiteHedderActive && ElementOfContentsBlock.setAttribute("class", DetailShowActiveSiteHedder);
          break;

        case DetailShowActiveSiteHedder:
          !SiteHedderActive && ElementOfContentsBlock.setAttribute("class", DetailShow);
          break;
      }

      break;
    // CaseB:コンテンツタイトルボタン押下処理から呼ばれたケース

    case CaseB:
      switch (TargetContentsBlockClassName) {
        case DetailOriginal:
          SiteHedderActive ? ElementOfContentsBlock.setAttribute("class", DetailShowActiveSiteHedder) : ElementOfContentsBlock.setAttribute("class", DetailShow);
          break;

        case DetailHide:
          SiteHedderActive ? ElementOfContentsBlock.setAttribute("class", DetailShowActiveSiteHedder) : ElementOfContentsBlock.setAttribute("class", DetailShow);
          break;

        case DetailShow:
          ElementOfContentsBlock.setAttribute("class", DetailHide);
          break;

        case DetailShowActiveSiteHedder:
          ElementOfContentsBlock.setAttribute("class", DetailHide);
          break;
      }

  }
}; ///////////////////////////////////////////////////////////////// 
// メインブロックをコントロール。
/////////////////////////////////////////////////////////////////


exports.MoveBlockOnClick = MoveBlockOnClick;

var MainBlockControl = /*#__PURE__*/function (_React$Component4) {
  _inherits(MainBlockControl, _React$Component4);

  var _super4 = _createSuper(MainBlockControl);

  function MainBlockControl() {
    _classCallCheck(this, MainBlockControl);

    return _super4.apply(this, arguments);
  }

  _createClass(MainBlockControl, [{
    key: "render",
    value: function render() {
      var ContentsRows = this.props.Kbns.map(function (List, index) {
        return /*#__PURE__*/_react.default.createElement(ContentsBlockControl, {
          key: index,
          Kbn: List.kbn
        });
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "mainBlockControl"
      }, /*#__PURE__*/_react.default.createElement("div", null, ContentsRows), /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.Transition, {
        in: this.props.mount,
        timeout: 400
      }, function (state) {
        return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
          id: "other-contents",
          className: OtherContentsOriginal,
          style: TransitionOtherContentsShow[state]
        }, "\u3053\u3053\u306B\u306F\u5225\u30B3\u30F3\u30C6\u30F3\u30C4\u304C\u5165\u308B\u4E88\u5B9A\uFF1F"));
      }));
    }
  }]);

  return MainBlockControl;
}(_react.default.Component);

exports.MainBlockControl = MainBlockControl;
var _default = OnHedderBox;
exports.default = _default;