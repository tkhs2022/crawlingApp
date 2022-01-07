"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ContentsTitleBlock = exports.ContentsTitleButtonWithBorder = void 0;

var _react = _interopRequireDefault(require("react"));

var _DoubleArrow = _interopRequireDefault(require("@material-ui/icons/DoubleArrow"));

var _core = require("@material-ui/core");

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _showContentsArea = require("./showContentsArea.jsx");

var _showContentsBlock = require("./showContentsBlock.jsx");

var _reactTransitionGroup = require("react-transition-group");

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
// コンテンツタイトルのボタンとクリックイベント。クリックイベントで、
// コンテンツタイトルのボックスに下線を引く。
var ContentsTitleButtonWithBorder = /*#__PURE__*/function (_React$Component) {
  _inherits(ContentsTitleButtonWithBorder, _React$Component);

  var _super = _createSuper(ContentsTitleButtonWithBorder);

  function ContentsTitleButtonWithBorder(props) {
    var _this;

    _classCallCheck(this, ContentsTitleButtonWithBorder);

    _this = _super.call(this, props);
    _this.state = {
      selectedIndex: null
    };
    return _this;
  }

  _createClass(ContentsTitleButtonWithBorder, [{
    key: "onClick",
    value: function onClick(e) {
      // 区分毎のボタンからクリックされた区分を、ボタンのselectedプロパティにに登録する
      this.setState({
        selectedIndex: e
      }); // 前回クリックの有ったタイトルボタンの区分を取得。

      var click = _showContentsArea.PreClickM.GetterPreClick(); // 前回ボタンクリックのあったコンテンツタイトルについて、下線が表示してあれば非表示


      if (click != null && click != undefined && click != e) {
        var ElementPreClick = document.getElementById("border-" + click);
        var CheckElementPreClick = ElementPreClick.getAttribute("class");

        switch (CheckElementPreClick) {
          case _showContentsArea.ContentTitleUnderBorderShow:
            ElementPreClick.classList.replace(_showContentsArea.ContentTitleUnderBorderShow, _showContentsArea.ContentTitleUnderBorderHide); // 表示していたコンテンツブロックを隠す

            (0, _showContentsBlock.MoveBlockOnClick)(click, _showContentsArea.CaseB);
            break;

          case _showContentsArea.ContentTitleUnderBorderHide:
            break;

          default:
            ElementPreClick.setAttribute("class", _showContentsArea.ContentTitleUnderBorderOriginal);
            break;
        }
      } // 今回ボタンクリックのあったコンテンツタイトルを取得


      var ElementThisClick = document.getElementById("border-" + e);
      var CheckElementThisClick = ElementThisClick.getAttribute("class"); //  今回ボタンクリックのあったコンテンツタイトルの下線を表示・非表示にする

      switch (CheckElementThisClick) {
        case _showContentsArea.ContentTitleUnderBorderShow:
          ElementThisClick.classList.replace(_showContentsArea.ContentTitleUnderBorderShow, _showContentsArea.ContentTitleUnderBorderHide);
          break;

        case _showContentsArea.ContentTitleUnderBorderHide:
          ElementThisClick.classList.replace(_showContentsArea.ContentTitleUnderBorderHide, _showContentsArea.ContentTitleUnderBorderShow);
          break;

        case _showContentsArea.ContentTitleUnderBorderOriginal:
          ElementThisClick.classList.replace(_showContentsArea.ContentTitleUnderBorderOriginal, _showContentsArea.ContentTitleUnderBorderShow);
          break;

        default:
          ElementThisClick.setAttribute("class", _showContentsArea.ContentTitleUnderBorderOriginal);
          break;
      } // コンテンツボックスのアニメーション表示・非表示


      (0, _showContentsBlock.MoveBlockOnClick)(e, _showContentsArea.CaseB); // 今回のボタンクリックのあった区分を保存

      _showContentsArea.PreClickM.SetterPreClick(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.Button, {
        className: "contents-title-button",
        selected: this.state.selectedIndex === this.props.index,
        onClick: function onClick(e) {
          return _this2.onClick(_this2.props.Kbn, e);
        }
      }, /*#__PURE__*/_react.default.createElement(_DoubleArrow.default, {
        title: this.props.name,
        style: {
          color: "#FFF"
        }
      }))), // デフォルトでは区分1のコンテンツブロックを表示
      this.props.Kbn == 1 ? /*#__PURE__*/_react.default.createElement("div", {
        id: "border-" + this.props.Kbn,
        className: _showContentsArea.ContentTitleUnderBorderShow
      }) : /*#__PURE__*/_react.default.createElement("div", {
        id: "border-" + this.props.Kbn,
        className: _showContentsArea.ContentTitleUnderBorderOriginal
      }));
    }
  }]);

  return ContentsTitleButtonWithBorder;
}(_react.default.Component); ///////////////////////////////////////////////////////////////// 
// コンテンツタイトルブロック。タイトル毎にボタンを配置するコンポー
// ネントを呼び出す。


exports.ContentsTitleButtonWithBorder = ContentsTitleButtonWithBorder;

var ContentsTitleBlock = function ContentsTitleBlock(props) {
  var NaviBar = props.Kbns.kbns.map(function (Kbns, index) {
    return /*#__PURE__*/_react.default.createElement(_Typography.default, {
      key: index,
      variant: "h6",
      noWrap: true,
      className: "name-title"
    }, /*#__PURE__*/_react.default.createElement("label", null, Kbns.kbnname), /*#__PURE__*/_react.default.createElement(ContentsTitleButtonWithBorder, {
      Kbn: Kbns.kbn,
      index: index
    }));
  });
  return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.Transition, {
    in: props.mount,
    timeout: 400
  }, function (state) {
    return /*#__PURE__*/_react.default.createElement("div", {
      id: "contents-title",
      className: _showContentsArea.ContentsTitleOriginal,
      style: _showContentsArea.TransitionContentsTitleShow[state]
    }, NaviBar);
  });
};

exports.ContentsTitleBlock = ContentsTitleBlock;
var _default = ContentsTitleBlock;
exports.default = _default;