"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ModalWrapper;
exports.KrawlSettingInModal = KrawlSettingInModal;
exports.ShortKrawlSettingInModal = ShortKrawlSettingInModal;
exports.RegistKrawlSettingInModal = RegistKrawlSettingInModal;
exports.KubunSettingInModal = KubunSettingInModal;

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Fade = _interopRequireDefault(require("@material-ui/core/Fade"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _AddCircle = _interopRequireDefault(require("@material-ui/icons/AddCircle"));

var _Cancel = _interopRequireDefault(require("@material-ui/icons/Cancel"));

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
// モーダル表示させるためのラッパークラス
function ModalWrapper(props) {
  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    open: props.open,
    onClose: function onClose(e) {
      return props.modalWrapperFlag(e, false);
    },
    style: {
      top: "5%",
      width: "50%",
      left: "20%",
      height: "70%"
    },
    "aria-labelledby": "simple-modal-title",
    "aria-describedby": "simple-modal-description",
    onRequestClose: function onRequestClose(e) {
      return props.modalWrapperFlag(e, false);
    }
  }, props.content);
} ///////////////////////////////////////////////////////////////// 
// 実行結果画面。クローリング設定詳細画面(モーダル表示する)


function KrawlSettingInModal(props) {
  var _useState = (0, _react.useState)(props.selectedCrawling.crawlingurl),
      _useState2 = _slicedToArray(_useState, 2),
      changedValueCrawlingUrl = _useState2[0],
      setValueCrawlingUrl = _useState2[1];

  var _useState3 = (0, _react.useState)(props.selectedCrawling.xpathTitle),
      _useState4 = _slicedToArray(_useState3, 2),
      changedValueCrawlingXpathTitle = _useState4[0],
      setValueCrawlingXpathTitle = _useState4[1];

  var _useState5 = (0, _react.useState)(props.selectedCrawling.xpathLink),
      _useState6 = _slicedToArray(_useState5, 2),
      changedValueCrawlingXpathLink = _useState6[0],
      setValueCrawlingXpathLink = _useState6[1];

  var _useState7 = (0, _react.useState)(props.selectedCrawling.xpathImage),
      _useState8 = _slicedToArray(_useState7, 2),
      changedValueCrawlingXpathImage = _useState8[0],
      setValueCrawlingXpathImage = _useState8[1]; // Modalは非表示の状態でもレンダリング処理が入る為、openフラグがtrueの時にのみ表示する
  // クローリング情報を更新。タイミング:クローリング情報画面にて、updateボタンを押下した時


  var _onClick = function onClick(e) {
    if (e == true) {
      props.callUpdateCrawlingList(props.selectedCrawling, changedValueCrawlingUrl, changedValueCrawlingXpathTitle, changedValueCrawlingXpathLink, changedValueCrawlingXpathImage);
    } else {
      // CLOSEボタン押下処理
      props.modalWrapperFlag(e);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Fade.default, {
    in: props.open
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    className: "modalActive"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    style: {
      padding: "0.5em"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: 8
    }
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      fontSize: "12",
      fontWeight: "bold"
    }
  }, "\u30AF\u30ED\u30FC\u30EB\u8A2D\u5B9A\u8A73\u7D30")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u533A\u5206",
    defaultValue: props.selectedItem.kbn,
    style: {
      width: "10%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u533A\u5206\u540D\u79F0",
    defaultValue: props.selectedItem.kbnname,
    style: {
      width: "20%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30B5\u30A4\u30C8ID",
    defaultValue: props.selectedItem.jigyosyaid,
    style: {
      width: "10%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30B5\u30A4\u30C8\u540D\u79F0",
    defaultValue: props.selectedItem.name,
    style: {
      width: "20%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u8A18\u4E8BID",
    defaultValue: props.selectedItem.kiziid,
    style: {
      width: "21.5%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u8A18\u4E8B\u30BF\u30A4\u30C8\u30EB",
    defaultValue: props.selectedItem.title,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    disabled: "false"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30EA\u30F3\u30AF",
    defaultValue: props.selectedItem.source,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    disabled: "false"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30A4\u30E1\u30FC\u30B8\u30D5\u30A1\u30A4\u30EB",
    defaultValue: props.selectedItem.image,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    disabled: "false"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30B5\u30A4\u30C8\u306EURL",
    defaultValue: props.selectedCrawling.crawlingurl,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingUrl(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30BF\u30A4\u30C8\u30EB\u306EXpath",
    defaultValue: props.selectedCrawling.xpathTitle,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingXpathTitle(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30EA\u30F3\u30AF\u306EXpath",
    defaultValue: props.selectedCrawling.xpathLink,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingXpathLink(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30A4\u30E1\u30FC\u30B8\u30D5\u30A1\u30A4\u30EB\u306EXpath",
    defaultValue: props.selectedCrawling.xpathImage,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingXpathImage(e.target.value);
    }
  }))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    style: {
      fontSize: "midium"
    },
    justify: "flex-end",
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
      return _onClick(true, e);
    },
    startIcon: /*#__PURE__*/_react.default.createElement(_AddCircle.default, null)
  }, "\u66F4\u65B0"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    style: {
      margin: "1.5em",
      fontSize: "midium"
    },
    variant: "contained",
    color: "secondary",
    onClick: function onClick(e) {
      return _onClick(false, e);
    },
    startIcon: /*#__PURE__*/_react.default.createElement(_Cancel.default, null)
  }, "\u9589\u3058\u308B")))));
} ///////////////////////////////////////////////////////////////// 
// 区分設定画面。クローリング設定詳細画面(モーダル表示する)


function ShortKrawlSettingInModal(props) {
  var _useState9 = (0, _react.useState)(props.selectedItem.crawlingurl),
      _useState10 = _slicedToArray(_useState9, 2),
      changedValueCrawlingUrl = _useState10[0],
      setValueCrawlingUrl = _useState10[1];

  var _useState11 = (0, _react.useState)(props.selectedItem.xpathTitle),
      _useState12 = _slicedToArray(_useState11, 2),
      changedValueCrawlingXpathTitle = _useState12[0],
      setValueCrawlingXpathTitle = _useState12[1];

  var _useState13 = (0, _react.useState)(props.selectedItem.xpathLink),
      _useState14 = _slicedToArray(_useState13, 2),
      changedValueCrawlingXpathLink = _useState14[0],
      setValueCrawlingXpathLink = _useState14[1];

  var _useState15 = (0, _react.useState)(props.selectedItem.xpathImage),
      _useState16 = _slicedToArray(_useState15, 2),
      changedValueCrawlingXpathImage = _useState16[0],
      setValueCrawlingXpathImage = _useState16[1]; // Modalは非表示の状態でもレンダリング処理が入る為、openフラグがtrueの時にのみ表示する
  // クローリング情報を更新。タイミング:クローリング情報画面にて、updateボタンを押下した時


  var _onClick2 = function onClick(e) {
    if (e == true) {
      props.callUpdateCrawlingList(props.selectedItem, changedValueCrawlingUrl, changedValueCrawlingXpathTitle, changedValueCrawlingXpathLink, changedValueCrawlingXpathImage);
    } else {
      // CLOSEボタン押下処理
      props.setModalIndex(0);
      props.modalWrapperFlag(e);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Fade.default, {
    in: props.open
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    className: "modalActive"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    style: {
      padding: "0.5em"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: 8
    }
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      fontSize: "12",
      fontWeight: "bold"
    }
  }, "\u30AF\u30ED\u30FC\u30EB\u8A2D\u5B9A\u8A73\u7D30")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u533A\u5206",
    defaultValue: props.selectedItem.kbn,
    style: {
      width: "10%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u533A\u5206\u540D\u79F0",
    defaultValue: props.selectedItem.kbnname,
    style: {
      width: "20%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30B5\u30A4\u30C8ID",
    defaultValue: props.selectedItem.jigyosyaid,
    style: {
      width: "10%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30B5\u30A4\u30C8\u540D\u79F0",
    defaultValue: props.selectedItem.name,
    style: {
      width: "20%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30B5\u30A4\u30C8\u306EURL",
    defaultValue: props.selectedItem.crawlingurl,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingUrl(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30BF\u30A4\u30C8\u30EB\u306EXpath",
    defaultValue: props.selectedItem.xpathTitle,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingXpathTitle(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30EA\u30F3\u30AF\u306EXpath",
    defaultValue: props.selectedItem.xpathLink,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingXpathLink(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30A4\u30E1\u30FC\u30B8\u30D5\u30A1\u30A4\u30EB\u306EXpath",
    defaultValue: props.selectedItem.xpathImage,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingXpathImage(e.target.value);
    }
  }))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    style: {
      fontSize: "midium"
    },
    justify: "flex-end",
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
      return _onClick2(true, e);
    },
    startIcon: /*#__PURE__*/_react.default.createElement(_AddCircle.default, null)
  }, "\u66F4\u65B0"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    style: {
      margin: "1.5em",
      fontSize: "midium"
    },
    variant: "contained",
    color: "secondary",
    onClick: function onClick(e) {
      return _onClick2(false, e);
    },
    startIcon: /*#__PURE__*/_react.default.createElement(_Cancel.default, null)
  }, "\u9589\u3058\u308B")))));
} ///////////////////////////////////////////////////////////////// 
// クローリング設定を新規登録する画面(モーダル表示する)


function RegistKrawlSettingInModal(props) {
  var _useState17 = (0, _react.useState)(""),
      _useState18 = _slicedToArray(_useState17, 2),
      changedValueKubun = _useState18[0],
      setValueKubun = _useState18[1];

  var _useState19 = (0, _react.useState)("区分名称"),
      _useState20 = _slicedToArray(_useState19, 2),
      changedValueKubunName = _useState20[0],
      setValueKubunName = _useState20[1];

  var _useState21 = (0, _react.useState)(""),
      _useState22 = _slicedToArray(_useState21, 2),
      changedValueJigyosyaid = _useState22[0],
      setValueJigyosyaid = _useState22[1];

  var _useState23 = (0, _react.useState)(""),
      _useState24 = _slicedToArray(_useState23, 2),
      changedValueName = _useState24[0],
      setValueName = _useState24[1];

  var _useState25 = (0, _react.useState)(""),
      _useState26 = _slicedToArray(_useState25, 2),
      changedValueCrawlingUrl = _useState26[0],
      setValueCrawlingUrl = _useState26[1];

  var _useState27 = (0, _react.useState)(""),
      _useState28 = _slicedToArray(_useState27, 2),
      changedValueCrawlingXpathTitle = _useState28[0],
      setValueCrawlingXpathTitle = _useState28[1];

  var _useState29 = (0, _react.useState)(""),
      _useState30 = _slicedToArray(_useState29, 2),
      changedValueCrawlingXpathLink = _useState30[0],
      setValueCrawlingXpathLink = _useState30[1];

  var _useState31 = (0, _react.useState)(""),
      _useState32 = _slicedToArray(_useState31, 2),
      changedValueCrawlingXpathImage = _useState32[0],
      setValueCrawlingXpathImage = _useState32[1];

  var kbns = props.kbns; ///////////////////////////////////////////////////////////////// 
  // 区分セレクトボックスで選択した区分の名称を、区分名称欄に自動入力する処理

  var callSetKbnNameLabel = function callSetKbnNameLabel(targetValue) {
    var index = kbns["kbns"].findIndex(function (v) {
      return v.kbn === targetValue;
    });

    if (index != -1) {
      var label = kbns["kbns"][index].kbnname;
      setValueKubunName(label);
      setValueKubun(targetValue);
    }
  }; // Modalは非表示の状態でもレンダリング処理が入る為、openフラグがtrueの時にのみ表示する
  // クローリング情報を更新。タイミング:クローリング情報画面にて、updateボタンを押下した時


  var _onClick3 = function onClick(e) {
    if (e == true) {
      var paramObj = {};
      paramObj["kbn"] = changedValueKubun;
      paramObj["kbnname"] = changedValueKubunName;
      paramObj["jigyosyaid"] = changedValueJigyosyaid;
      paramObj["name"] = changedValueName;
      paramObj["crawlingurl"] = changedValueCrawlingUrl;
      paramObj["xpathTitle"] = changedValueCrawlingXpathTitle;
      paramObj["xpathLink"] = changedValueCrawlingXpathLink;
      paramObj["xpathImage"] = changedValueCrawlingXpathImage; // 親コンポーネントのメソッド呼び出し

      props.callNewCrawlingList(paramObj);
    } else {
      // CLOSEボタン押下処理
      props.setModalIndex(0);
      props.modalWrapperFlag(e);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Fade.default, {
    in: props.open
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    className: "modalActive"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    style: {
      padding: "0.5em"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: 8
    }
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      fontSize: "12",
      fontWeight: "bold"
    }
  }, "\u30AF\u30ED\u30FC\u30EB\u8A2D\u5B9A\u767B\u9332")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    id: "select-paperDiv"
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    id: "select-paperDiv-label"
  }, "\u533A\u5206"), /*#__PURE__*/_react.default.createElement(_Select.default, {
    labelId: "select-paperDiv-label",
    className: "select-paperDiv",
    value: changedValueKubun,
    style: {
      width: "100%",
      margin: 8,
      fontSize: "midium"
    },
    onChange: function onChange(e) {
      return callSetKbnNameLabel(e.target.value);
    }
  }, props.kbns["kbns"].map(function (item, key) {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      value: item.kbn,
      key: key
    }, item.kbn);
  }))), /*#__PURE__*/_react.default.createElement(_TextField.default // label="区分名称"
  , {
    label: changedValueKubunName,
    style: {
      width: "20%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    disabled: "false"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u4E8B\u696D\u8005ID",
    defaultValue: changedValueJigyosyaid,
    style: {
      width: "10%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    onChange: function onChange(e) {
      return setValueJigyosyaid(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u4E8B\u696D\u8005\u540D",
    defaultValue: changedValueName,
    style: {
      width: "20%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    onChange: function onChange(e) {
      return setValueName(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30B5\u30A4\u30C8\u306EURL",
    defaultValue: changedValueCrawlingUrl,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingUrl(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30BF\u30A4\u30C8\u30EB\u306EXpath",
    defaultValue: changedValueCrawlingXpathTitle,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingXpathTitle(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30EA\u30F3\u30AF\u306EXpath",
    defaultValue: changedValueCrawlingXpathLink,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingXpathLink(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30A4\u30E1\u30FC\u30B8\u30D5\u30A1\u30A4\u30EB\u306EXpath",
    defaultValue: changedValueCrawlingXpathImage,
    style: {
      width: "90%",
      margin: 8,
      fontSize: "midium"
    },
    fullWidth: true,
    rows: 1,
    onChange: function onChange(e) {
      return setValueCrawlingXpathImage(e.target.value);
    }
  }))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    style: {
      fontSize: "midium"
    },
    justify: "flex-end",
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
      return _onClick3(true);
    },
    startIcon: /*#__PURE__*/_react.default.createElement(_AddCircle.default, null)
  }, "\u767B\u9332"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    style: {
      margin: "1.5em",
      fontSize: "midium"
    },
    variant: "contained",
    color: "secondary",
    onClick: function onClick(e) {
      return _onClick3(false);
    },
    startIcon: /*#__PURE__*/_react.default.createElement(_Cancel.default, null)
  }, "\u9589\u3058\u308B")))));
} ///////////////////////////////////////////////////////////////// 
// 区分設定を新規登録する画面(モーダル表示する)


function KubunSettingInModal(props) {
  var _useState33 = (0, _react.useState)(""),
      _useState34 = _slicedToArray(_useState33, 2),
      changedValueKubun = _useState34[0],
      setValueKubun = _useState34[1];

  var _useState35 = (0, _react.useState)(""),
      _useState36 = _slicedToArray(_useState35, 2),
      changedValueKubunName = _useState36[0],
      setValueKubunName = _useState36[1];

  var _useState37 = (0, _react.useState)(""),
      _useState38 = _slicedToArray(_useState37, 2),
      changedValueComment = _useState38[0],
      setValueComment = _useState38[1]; // Modalは非表示の状態でもレンダリング処理が入る為、openフラグがtrueの時にのみ表示する
  // 区分情報を新たに登録。タイミング:クローリング情報画面にて、updateボタンを押下した時


  var _onClick4 = function onClick(e) {
    if (e == true) {
      if (changedValueKubun != "" && changedValueKubunName != "" && changedValueComment != "") {
        // 親コンポーネントの区分リスト新規登録処理を呼び出す
        props.callNewKubunList(changedValueKubun, changedValueKubunName, changedValueComment);
      } else {
        alert("全ての項目を入力してください!");
      }
    } else {
      // CLOSEボタン押下処理
      props.modalWrapperFlag(e);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Fade.default, {
    in: props.open
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    className: "modalActive"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    style: {
      padding: "0.5em"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: 8
    }
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      fontSize: "12",
      fontWeight: "bold"
    }
  }, "\u533A\u5206\u8A2D\u5B9A\u767B\u9332")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u533A\u5206",
    defaultValue: changedValueKubun,
    style: {
      width: "10%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    onChange: function onChange(e) {
      return setValueKubun(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u533A\u5206\u540D\u79F0",
    defaultValue: changedValueKubunName,
    style: {
      width: "20%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    onChange: function onChange(e) {
      return setValueKubunName(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "\u30B3\u30E1\u30F3\u30C8",
    defaultValue: changedValueComment,
    style: {
      width: "50%",
      margin: 8,
      fontSize: "midium"
    },
    rows: 1,
    onChange: function onChange(e) {
      return setValueComment(e.target.value);
    }
  }))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    style: {
      fontSize: "midium"
    },
    justify: "flex-end",
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
      return _onClick4(true, e);
    },
    startIcon: /*#__PURE__*/_react.default.createElement(_AddCircle.default, null)
  }, "\u767B\u9332"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    style: {
      margin: "1.5em",
      fontSize: "midium"
    },
    variant: "contained",
    color: "secondary",
    onClick: function onClick(e) {
      return _onClick4(false, e);
    },
    startIcon: /*#__PURE__*/_react.default.createElement(_Cancel.default, null)
  }, "\u9589\u3058\u308B")))));
}