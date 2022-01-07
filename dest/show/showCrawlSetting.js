"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ShowCrawlSetting = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _reactRedux = require("react-redux");

var _showContentsArea = require("./showContentsArea.jsx");

var _index = require("../index.jsx");

var _crawlSettingMaterialTable = _interopRequireDefault(require("../materialTable/crawlSettingMaterialTable.jsx"));

var _showModalWindow = _interopRequireWildcard(require("./showModalWindow.jsx"));

var _commonFunc = _interopRequireWildcard(require("../commonFunc.js"));

var _AddCircle = _interopRequireDefault(require("@material-ui/icons/AddCircle"));

var _materialTableColumns = require("../actions/materialTableColumns.js");

var actions = _interopRequireWildcard(require("../actions/action.js"));

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
// クローリング設定ページを生成する、ルートコンポーネント
///////////////////////////////////////////////////////////////// 
var ShowCrawlSetting = /*#__PURE__*/function (_React$Component) {
  _inherits(ShowCrawlSetting, _React$Component);

  var _super = _createSuper(ShowCrawlSetting);

  function ShowCrawlSetting(_props) {
    var _this;

    _classCallCheck(this, ShowCrawlSetting);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "setItem", function (item) {
      var target = _this.props.thisContentsArticle.findIndex(function (v) {
        return v.kiziid === item.kiziid;
      });

      _this.setState({
        selectedItem: _this.props.thisContentsArticle[target]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setSelectedCrawling", function (item) {
      var target = _this.state.crawlings.crawling.findIndex(function (v) {
        return v.kbn === item.kbn && v.jigyosyaid === item.jigyosyaid;
      });

      _this.setState({
        selectedCrawling: _this.state.crawlings.crawling[target]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "callUpdateCrawlingList", function (item, changedCrawlingUrl, changedCrawlingXpathTitle, changedValueCrawlingXpathLink, changedValueCrawlingXpathImage) {
      _showContentsArea.Crawlings.setUpdateCrawlingList(item, changedCrawlingUrl, changedCrawlingXpathTitle, changedValueCrawlingXpathLink, changedValueCrawlingXpathImage).then(function (response) {
        if (response.flag) {
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
          // 既存の区分リストのthis.stateにセット
          var copyCrawlingList = _showContentsArea.Crawlings.getCrawlingList();

          _this.setState({
            crawlings: copyCrawlingList
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "modalWrapperFlag", function (e) {
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

    _defineProperty(_assertThisInitialized(_this), "execCrawling", function () {
      var element = document.getElementById("p-status-data");
      var status = _this.props.status;

      if (status == "停止" || status == "エラー" || status == "実行完了") {
        _this.props.setCrawlingStatus("実行中");

        (0, _commonFunc.cssFileAble)("loading.css");
        element.style.backgroundColor = "#00FF3B"; // クローリング実行処理呼び出し、実行結果取得

        _showContentsArea.Crawlings.execCrawling().then(function (response) {
          // 実行結果レスポンスが返却された場合、ステータスを「実行完了」に。ローディングCSSを無効に。
          _this.props.setCrawlingStatus("実行完了");

          (0, _commonFunc.cssFileDisable)("loading.css");
          element.style.backgroundColor = "#FF4F02"; // 最終クローリング日時を更新

          _index.Contents.recentUpdateFileDate(1, "mtime") // パラメータ:2は区分リスト
          .then(function (response) {
            if (response) {
              _this.setState({
                recentFileUpdate: _this.props.mtime
              }); // コンテンツファイル名のリストを取得


              _index.Contents.recentUpdateFileDate(1, "list").then(function () {});
            } else {
              _this.setState({
                recentFileUpdate: "取得できませんでした"
              });
            }

            (0, _commonFunc.cssFileDisable)("loading.css");
          }).catch(function (error) {
            console.error(error);
          });
        }).catch(function (error) {
          console.error(error);

          _this.props.setCrawlingStatus("エラー");

          (0, _commonFunc.cssFileDisable)("loading.css");
          element.style.backgroundColor = "#FF0000";
        });
      } else {
        alert("クローリング実行中は無効です。");
      }
    });

    _this.state = {
      contents: _this.props.thisContentsArticle,
      selectedFileName: _this.props.selectedFileName,
      crawlings: _showContentsArea.Crawlings.getCrawlingList(),
      open: false,
      modalIndex: 0,
      selectedItem: null,
      selectedCrawling: null,
      status: _this.props.status,
      recentFileUpdate: "未取得"
    };
    return _this;
  } ///////////////////////////////////////////////////////////////// 
  // componentWillMount()


  _createClass(ShowCrawlSetting, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      // メイン画面のCSSファイル解除
      (0, _commonFunc.default)("App.css", "showCrawlSetting.css"); // 最終クロール日時

      _index.Contents.recentUpdateFileDate(1, "mtime") // パラメータ:2は区分リスト
      .then(function (response) {
        if (response) {
          _this2.setState({
            recentFileUpdate: _this2.props.mtime
          });
        } else {
          _this2.setState({
            recentFileUpdate: "取得できませんでした"
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    } ///////////////////////////////////////////////////////////////// 
    // componentDidMount()

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // ステータスの背景色指定
      var element = document.getElementById("p-status-data");

      if (this.props.status == "停止") {
        element.style.backgroundColor = "#005FFF";
      } else if (this.props.status == "実行中") {
        element.style.backgroundColor = "#00FF3B";
      } else if (this.props.status == "実行完了") {
        element.style.backgroundColor = "#FF4F02";
      } else if (this.props.status == "エラー") {
        element.style.backgroundColor = "#FF0000";
      }
    } ///////////////////////////////////////////////////////////////// 
    // 設定一覧で選択されたコンテンツデータを返す。

  }, {
    key: "render",
    value: ///////////////////////////////////////////////////////////////// 
    // レンダー
    function render() {
      var _this3 = this;

      ///////////////////////////////////////////////////////////////// 
      // モーダル表示する画面の種別に対応したjsxを返却
      // (init)0:編集画面 1:新規登録画面
      var setModalJsx = function setModalJsx() {
        if (_this3.state.modalIndex === 0) {
          return /*#__PURE__*/_react.default.createElement(_showModalWindow.KrawlSettingInModal, {
            modalWrapperFlag: _this3.modalWrapperFlag,
            open: _this3.state.open,
            selectedItem: _this3.state.selectedItem,
            selectedCrawling: _this3.state.selectedCrawling,
            callUpdateCrawlingList: _this3.callUpdateCrawlingList
          });
        } else if (_this3.state.modalIndex === 1) {
          return /*#__PURE__*/_react.default.createElement(_showModalWindow.RegistKrawlSettingInModal, {
            modalWrapperFlag: _this3.modalWrapperFlag,
            open: _this3.state.open,
            kbns: _showContentsArea.Kbns.getKbnList(),
            setModalIndex: _this3.setModalIndex,
            callNewCrawlingList: _this3.callNewCrawlingList
          });
        }
      };

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 1
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        Item: true,
        xs: 3,
        style: {
          padding: "0.5em"
        }
      }, /*#__PURE__*/_react.default.createElement(_core.Button, {
        id: "button-krawlsetting",
        style: {
          margin: "0.5em",
          backgroundColor: "#1976d2",
          color: "#FFF"
        },
        variant: "contained",
        onClick: function onClick() {
          _this3.setModalIndex(1);

          _this3.modalWrapperFlag();
        },
        startIcon: /*#__PURE__*/_react.default.createElement(_AddCircle.default, null)
      }, "\u30B5\u30A4\u30C8\u767B\u9332"), /*#__PURE__*/_react.default.createElement(_core.Button, {
        id: "button-krawlsetting",
        style: {
          margin: "0.5em",
          backgroundColor: "#1976d2",
          color: "#FFF"
        },
        variant: "contained",
        onClick: function onClick() {
          return _this3.execCrawling();
        },
        startIcon: /*#__PURE__*/_react.default.createElement(_AddCircle.default, null)
      }, "\u3059\u3079\u3066\u958B\u59CB")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        Item: true,
        id: "crawl-status",
        xs: 2,
        style: {
          padding: "0.5em",
          margin: "0.5em"
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        id: "label-reffer-title",
        style: {
          fontSize: "10pt",
          color: "#FFF"
        }
      }, /*#__PURE__*/_react.default.createElement("p", null, "\u53C2\u7167\u30C7\u30FC\u30BF")), /*#__PURE__*/_react.default.createElement("div", {
        id: "label-reffer-data",
        style: {
          fontSize: "10pt",
          color: "#FFF"
        }
      }, /*#__PURE__*/_react.default.createElement("p", null, "\xA0", this.props.selectedFileName))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        Item: true,
        id: "crawl-status",
        xs: 2,
        style: {
          padding: "0.5em",
          margin: "0.5em"
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        id: "label-krawl-title",
        style: {
          fontSize: "10pt",
          color: "#FFF"
        }
      }, /*#__PURE__*/_react.default.createElement("p", null, "\u6700\u7D42\u30AF\u30ED\u30FC\u30EB\u65E5\u6642")), /*#__PURE__*/_react.default.createElement("div", {
        id: "label-krawl-data",
        style: {
          fontSize: "10pt",
          color: "#FFF"
        }
      }, /*#__PURE__*/_react.default.createElement("p", null, "\xA0", this.props.mtime)), /*#__PURE__*/_react.default.createElement("div", {
        id: "label-status-title",
        style: {
          fontSize: "10pt",
          color: "#FFF"
        }
      }, /*#__PURE__*/_react.default.createElement("p", null, "\u30AF\u30ED\u30FC\u30EB\u72B6\u614B")), /*#__PURE__*/_react.default.createElement("div", {
        id: "label-status-data",
        style: {
          fontSize: "10pt",
          color: "#FFF"
        }
      }, /*#__PURE__*/_react.default.createElement("p", {
        id: "p-status-data"
      }, this.props.status)))), /*#__PURE__*/_react.default.createElement(_crawlSettingMaterialTable.default, {
        columns: (0, _materialTableColumns.columnsData)(1),
        data: this.props.thisContentsArticle,
        actions: 1,
        editable: 1,
        modalWrapperFlag: this.modalWrapperFlag,
        setItem: this.setItem,
        setSelectedCrawling: this.setSelectedCrawling
      }), /*#__PURE__*/_react.default.createElement(_showModalWindow.default, {
        modalWrapperFlag: this.modalWrapperFlag,
        open: this.state.open,
        content: setModalJsx()
      }));
    }
  }]);

  return ShowCrawlSetting;
}(_react.default.Component); ///////////////////////////////////////////////////////////////// 
// ReactコンポーネントとReduxストアをコネクト


exports.ShowCrawlSetting = ShowCrawlSetting;

var mapStateToProps = function mapStateToProps(state) {
  return {
    thisContentsArticle: state.componentReducer.thisContents.article,
    selectedFileName: state.componentReducer.selectedFileName,
    status: state.componentReducer.status,
    mtime: state.componentReducer.mtime
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setCrawlingStatus: function setCrawlingStatus(str) {
      return dispatch(actions.SET_CRAWLING_STATUS(str));
    }
  };
};

var ContainerShowCrawlSetting = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ShowCrawlSetting);
var _default = ContainerShowCrawlSetting;
exports.default = _default;