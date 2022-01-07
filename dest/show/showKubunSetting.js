"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _showContentsArea = require("./showContentsArea.jsx");

var _index = require("../index.jsx");

var _detailCrawlSettingMaterialTable = _interopRequireDefault(require("../materialTable/detailCrawlSettingMaterialTable.jsx"));

var _kubunSettingMaterialTable = _interopRequireDefault(require("../materialTable/kubunSettingMaterialTable.jsx"));

var _showModalWindow = _interopRequireWildcard(require("./showModalWindow.jsx"));

var _commonFunc = _interopRequireWildcard(require("../commonFunc.js"));

var _AddCircle = _interopRequireDefault(require("@material-ui/icons/AddCircle"));

var _materialTableColumns = require("../actions/materialTableColumns");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

///////////////////////////////////////////////////////////////// 
// 区分設定ページを生成する、ルートコンポーネント
///////////////////////////////////////////////////////////////// 
var ShowKubunSetting = /*#__PURE__*/function (_React$Component) {
  _inherits(ShowKubunSetting, _React$Component);

  var _super = _createSuper(ShowKubunSetting);

  function ShowKubunSetting(_props) {
    var _this;

    _classCallCheck(this, ShowKubunSetting);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "setItem", function (item) {
      _this.setState({
        selectedItem: item
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setSelectedCrawling", function (item) {
      var filter = _this.state.crawlings.crawling.filter(function (v) {
        return v.kbn == item.kbn;
      });

      var dummyList = [];

      if (filter.length != 0) {
        filter.map(function (i, index) {
          var list = {};
          list.kbn = i.kbn;
          list.kbnname = i.kbnname;
          list.jigyosyaid = i.jigyosyaid;
          list.name = i.name;
          list.crawlingurl = i.crawlingurl;
          list.xpathTitle = i.xpathTitle;
          list.xpathLink = i.xpathLink;
          list.xpathImage = i.xpathImage;
          dummyList.push(list);
        });
      }

      _this.setState({
        selectedCrawling: dummyList
      });
    });

    _defineProperty(_assertThisInitialized(_this), "callUpdateCrawlingList", function (item, changedCrawlingUrl, changedCrawlingXpathTitle, changedValueCrawlingXpathLink, changedValueCrawlingXpathImage) {
      _showContentsArea.Crawlings.setUpdateCrawlingList(item, changedCrawlingUrl, changedCrawlingXpathTitle, changedValueCrawlingXpathLink, changedValueCrawlingXpathImage).then(function (response) {
        if (response.flag) {
          // 既存のthis.stateにセット
          var copyCrawlingList = _showContentsArea.Crawlings.getCrawlingList();

          _this.setState({
            crawlings: copyCrawlingList
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "callNewCrawlingList", function (item) {
      _showContentsArea.Crawlings.addNewCrawlingList(item).then(function (response) {
        if (response.flag) {
          // 既存のthis.stateにセット
          var copyCrawlingList = _showContentsArea.Crawlings.getCrawlingList();

          _this.setState({
            crawlings: copyCrawlingList
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setStateCrawling", function () {
      var copyCrawlingList = _showContentsArea.Crawlings.getCrawlingList();

      _this.setState({
        crawlings: copyCrawlingList
      });
    });

    _defineProperty(_assertThisInitialized(_this), "callNewKubunList", function (changedValueKubun, changedValueKubunName, changedValueComment) {
      // 非同期処理開始
      _showContentsArea.Kbns.setNewKubunList(changedValueKubun, changedValueKubunName, changedValueComment) // レスポンスはjsonオブジェクト
      .then(function (response) {
        // 区分リストのjsonデータの更新が正常終了した場合、this.stateの区分リストも更新する。
        if (response.flag) {
          var copyKubunList = _showContentsArea.Kbns.getKbnList();

          _this.setState({
            kbns: copyKubunList
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "modalWrapperFlag", function () {
      _this.state.open ? _this.setState({
        open: false
      }) : _this.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setModalIndex", function (props) {
      // パラメータの値をthis.stateにセット
      _this.setState({
        modalIndex: props
      });
    });

    _defineProperty(_assertThisInitialized(_this), "recentKubunUpdateDate", function () {
      _index.Contents.recentUpdateFileDate(2, "mtime") // パラメータ:2は区分リスト
      .then(function (response) {
        if (response) {
          _this.setState({
            recentFileUpdate: response["mtime"]
          });
        } else {
          _this.setState({
            recentFileUpdate: "取得できませんでした"
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    });

    _this.state = {
      kbns: _showContentsArea.Kbns.getKbnList(),
      crawlings: _showContentsArea.Crawlings.getCrawlingList(),
      selectedCrawling: null,
      selectedItem: null,
      open: false,
      modalIndex: 0,
      recentFileUpdate: "未取得"
    };
    return _this;
  } ///////////////////////////////////////////////////////////////// 
  // componentWillMount()


  _createClass(ShowKubunSetting, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // メイン画面のCSSファイル解除
      (0, _commonFunc.default)("App.css", "showCrawlSetting.css");
      (0, _commonFunc.cssFileDisable)("loading.css");
      this.recentKubunUpdateDate();
      this.setState({
        selectedCrawling: []
      });
    } ///////////////////////////////////////////////////////////////// 
    // 設定一覧で選択されたコンテンツデータを返す。

  }, {
    key: "render",
    value: ///////////////////////////////////////////////////////////////// 
    // レンダー
    function render() {
      var _this2 = this;

      ///////////////////////////////////////////////////////////////// 
      // モーダル表示する画面の種別に対応したjsxを返却
      // (init)0:区分セットの区分登録ボタン 1:クロール対象データのデータ登録ボタン 3:クロール対象データの編集ボタン
      var setModalJsx = function setModalJsx() {
        if (_this2.state.modalIndex === 0) {
          return /*#__PURE__*/_react.default.createElement(_showModalWindow.KubunSettingInModal, {
            modalWrapperFlag: _this2.modalWrapperFlag,
            open: _this2.state.open,
            callNewKubunList: _this2.callNewKubunList
          });
        } else if (_this2.state.modalIndex === 1) {
          return /*#__PURE__*/_react.default.createElement(_showModalWindow.RegistKrawlSettingInModal, {
            modalWrapperFlag: _this2.modalWrapperFlag,
            open: _this2.state.open,
            kbns: _showContentsArea.Kbns.getKbnList(),
            setModalIndex: _this2.setModalIndex,
            callNewCrawlingList: _this2.callNewCrawlingList
          });
        } else if (_this2.state.modalIndex === 2) {
          return /*#__PURE__*/_react.default.createElement(_showModalWindow.ShortKrawlSettingInModal, {
            modalWrapperFlag: _this2.modalWrapperFlag,
            open: _this2.state.open,
            selectedItem: _this2.state.selectedItem,
            setModalIndex: _this2.setModalIndex,
            callUpdateCrawlingList: _this2.callUpdateCrawlingList
          });
        }
      };

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 2,
        justifyContent: "flex-start",
        style: {
          padding: "0.5em",
          right: "30%"
        }
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        Item: true,
        xs: 3,
        style: {
          padding: "0.5em"
        }
      }, /*#__PURE__*/_react.default.createElement(_core.Button, {
        id: "button-kubunsetting",
        style: {
          margin: "0.5em",
          backgroundColor: "#1976d2",
          color: "#FFF"
        },
        onClick: function onClick() {
          return _this2.modalWrapperFlag();
        },
        startIcon: /*#__PURE__*/_react.default.createElement(_AddCircle.default, null)
      }, "\u533A\u5206\u767B\u9332"), /*#__PURE__*/_react.default.createElement(_core.Button, {
        id: "button-kubunsetting",
        style: {
          margin: "0.5em",
          backgroundColor: "#1976d2",
          color: "#FFF"
        },
        onClick: function onClick() {
          _this2.setModalIndex(1);

          _this2.modalWrapperFlag();
        },
        startIcon: /*#__PURE__*/_react.default.createElement(_AddCircle.default, null)
      }, "\u30B5\u30A4\u30C8\u767B\u9332")), /*#__PURE__*/_react.default.createElement(_core.Grid, _defineProperty({
        Item: true,
        className: "kubun-status",
        xs: 2,
        justifyContent: "flex-end",
        style: {
          padding: "0.5em",
          margin: "0.5em"
        }
      }, "className", "top-Box"), /*#__PURE__*/_react.default.createElement("div", {
        className: "label-title",
        style: {
          fontSize: "10pt",
          color: "#FFF"
        }
      }, /*#__PURE__*/_react.default.createElement("p", null, "\u6700\u7D42\u66F4\u65B0\u65E5\u6642")), /*#__PURE__*/_react.default.createElement("div", {
        className: "label-data",
        style: {
          fontSize: "10pt",
          color: "#FFF"
        }
      }, /*#__PURE__*/_react.default.createElement("p", null, "\xA0", this.state.recentFileUpdate)))), /*#__PURE__*/_react.default.createElement("div", {
        className: "materialTableWrapper"
      }, /*#__PURE__*/_react.default.createElement(_kubunSettingMaterialTable.default, {
        columns: (0, _materialTableColumns.columnsData)(2),
        data: this.state.kbns.kbns,
        actions: 2,
        editable: 2,
        open: this.state.open,
        setSelectedCrawling: this.setSelectedCrawling
      }), /*#__PURE__*/_react.default.createElement(_detailCrawlSettingMaterialTable.default, {
        columns: (0, _materialTableColumns.columnsData)(3),
        data: this.state.selectedCrawling,
        modalWrapperFlag: this.modalWrapperFlag,
        setModalIndex: this.setModalIndex,
        open: this.state.open,
        setItem: this.setItem,
        setStateCrawling: this.setStateCrawling
      }), /*#__PURE__*/_react.default.createElement(_showModalWindow.default, {
        modalWrapperFlag: this.modalWrapperFlag,
        open: this.state.open,
        content: setModalJsx()
      })));
    }
  }]);

  return ShowKubunSetting;
}(_react.default.Component);

exports.default = ShowKubunSetting;