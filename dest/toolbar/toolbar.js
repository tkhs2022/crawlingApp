"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ResponsiveDrawer;

var _react = _interopRequireDefault(require("react"));

var _AppBar = _interopRequireDefault(require("@mui/material/AppBar"));

var _Box = _interopRequireDefault(require("@mui/material/Box"));

var _CssBaseline = _interopRequireDefault(require("@mui/material/CssBaseline"));

var _Divider = _interopRequireDefault(require("@mui/material/Divider"));

var _Drawer = _interopRequireDefault(require("@mui/material/Drawer"));

var _List = _interopRequireDefault(require("@mui/material/List"));

var _ListItem = _interopRequireDefault(require("@mui/material/ListItem"));

var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));

var _ExpandLess = _interopRequireDefault(require("@mui/icons-material/ExpandLess"));

var _ExpandMore = _interopRequireDefault(require("@mui/icons-material/ExpandMore"));

var _Collapse = _interopRequireDefault(require("@mui/material/Collapse"));

var _Toolbar = _interopRequireDefault(require("@mui/material/Toolbar"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _Menu = _interopRequireDefault(require("@mui/icons-material/Menu"));

var _Menu2 = _interopRequireDefault(require("@mui/material/Menu"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _styles = require("@material-ui/core/styles");

var _index = require("../index.jsx");

var _reactRouterDom = require("react-router-dom");

var action = _interopRequireWildcard(require("../actions/action.js"));

var _store = _interopRequireDefault(require("../store/store.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var drawerWidth = 240; // ツールバーのタイトルのフォントサイズ調整

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    listItemText: {
      paddingLeft: "1em!important",
      fontSize: "10pt!important"
    },
    listItemTextContentsfile: {
      paddingLeft: "2em!important",
      fontSize: "10pt!important"
    },
    linkElementStyleonLogin: {
      textDecoration: "none"
    },
    linkElementStyleonLogout: {
      textDecoration: "none",
      pointerEvents: "none"
    }
  };
});

function ResponsiveDrawer(props) {
  ///////////////////////////////////////////////////////////////// 
  // コンテンツメニューの開閉を制御する
  var _React$useState = _react.default.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selectedContentsIndex = _React$useState2[0],
      setSelectedContentsIndex = _React$useState2[1];

  var _React$useState3 = _react.default.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      opencontents = _React$useState4[0],
      setOpenContents = _React$useState4[1];

  var styles = useStyles();

  var handleClick = function handleClick() {
    setOpenContents(!opencontents);
  }; ///////////////////////////////////////////////////////////////// 
  // アイコンボタン押下時のメニュー開閉を制御する


  var optionMenuIcon = ["logout"];

  var _React$useState5 = _react.default.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      anchorEl = _React$useState6[0],
      setAnchorEl = _React$useState6[1];

  var open = Boolean(anchorEl);

  var _React$useState7 = _react.default.useState(0),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      selectedIconIndex = _React$useState8[0],
      setSelectedIconIndex = _React$useState8[1]; // アイコンボタン押下処理


  var onClickIconButton = function onClickIconButton(event) {
    setAnchorEl(event.currentTarget);
  }; // アイコンボタン押下時に現れるメニューより選択したアイテムの押下処理


  var onClickSelectedIcon = function onClickSelectedIcon(event, index) {
    event.preventDefault();
    setSelectedIconIndex(index);
    setAnchorEl(null);

    if (selectedIconIndex == 0) {
      // ログアウト処理
      _store.default.dispatch(action.logout());

      window.location.href = "/login";
    }
  }; // メニューを閉じるイベント処理


  var handleClose = function handleClose() {
    setAnchorEl(null);
  }; ///////////////////////////////////////////////////////////////// 
  // 選択されたコンテンツファイル名にselectedを有効化する


  var handleListItemClick = function handleListItemClick(text) {
    setSelectedContentsIndex(text);
  }; ///////////////////////////////////////////////////////////////// 
  // 選択されたコンテンツファイル名を返却


  var callApp = function callApp(selectedFileName) {
    _index.Contents.getContentsList(selectedFileName);
  }; ///////////////////////////////////////////////////////////////// 
  // 左側のメニューバー


  var drawer = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Toolbar.default, null), /*#__PURE__*/_react.default.createElement(_Divider.default, null), /*#__PURE__*/_react.default.createElement(_List.default, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/ShowCrawlSetting",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true,
    selected: selectedContentsIndex === 30,
    onClick: function onClick(e) {
      return handleListItemClick(30, e);
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "\u5B9F\u884C\u7D50\u679C\u30BB\u30C3\u30C8",
    className: "list-item-text",
    classes: {
      primary: styles.listItemText
    }
  }))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/ShowKubunSetting",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true,
    selected: selectedContentsIndex === 20,
    onClick: function onClick(e) {
      return handleListItemClick(20, e);
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "\u533A\u5206\u30BB\u30C3\u30C8",
    className: "list-item-text",
    classes: {
      primary: styles.listItemText
    }
  }))), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "\u30B3\u30F3\u30C6\u30F3\u30C4",
    onClick: handleClick,
    className: "list-item-text",
    classes: {
      primary: styles.listItemText
    }
  }), opencontents ? /*#__PURE__*/_react.default.createElement(_ExpandLess.default, {
    onClick: handleClick,
    style: {
      color: "#FFF",
      marginRight: "1em"
    }
  }) : /*#__PURE__*/_react.default.createElement(_ExpandMore.default, {
    onClick: handleClick,
    style: {
      color: "#FFF",
      marginRight: "1em"
    }
  })), /*#__PURE__*/_react.default.createElement(_Collapse.default, {
    in: opencontents,
    timeout: "auto",
    unmountOnExit: true
  }, _store.default.getState().componentReducer.fileNameList != undefined && _store.default.getState().componentReducer.fileNameList.map(function (fileName, index) {
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: "/ShowContentsArea",
      key: fileName,
      style: {
        textDecoration: "none"
      }
    }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
      button: true,
      selected: selectedContentsIndex === fileName,
      onClick: function onClick(e) {
        handleListItemClick(fileName, e);
        callApp(fileName, e);
      }
    }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
      primary: fileName,
      className: "list-item-text-contentsfile",
      classes: {
        primary: styles.listItemTextContentsfile
      }
    })));
  }))));

  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement(_CssBaseline.default, null), /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    position: "fixed",
    sx: {
      width: {
        sm: "calc(100% - ".concat(drawerWidth, "px)")
      },
      ml: {
        sm: "".concat(drawerWidth, "px")
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    style: {
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "toolbarTypography",
    variant: "h6",
    noWrap: true,
    component: "div",
    style: {
      fontSize: "16pt!important"
    }
  }, "Site Checker..."), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    color: "inherit",
    "aria-label": "opencontents drawer",
    onClick: onClickIconButton,
    edge: "start" // sx={{marginRight: '36px', ...(opencontents && { display: 'none' })}}
    ,
    sx: {
      marginRight: '36px'
    }
  }, /*#__PURE__*/_react.default.createElement(_Menu.default, null)), /*#__PURE__*/_react.default.createElement(_Menu2.default, {
    id: "lock-menu",
    anchorEl: anchorEl,
    open: open,
    onClose: handleClose,
    MenuListProps: {
      'aria-labelledby': 'lock-button',
      role: 'listbox'
    }
  }, optionMenuIcon.map(function (option, index) {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      key: option // disabled={index === 0}
      // selected={index === selectedIconIndex}
      // onClick={(e) => onClickSelectedIcon(e, index)}
      ,
      onClick: function onClick(e) {
        return onClickSelectedIcon(e);
      }
    }, option);
  })))), /*#__PURE__*/_react.default.createElement(_Box.default, {
    component: "nav",
    sx: {
      width: {
        sm: drawerWidth
      },
      flexShrink: {
        sm: 0
      }
    },
    "aria-label": "mailbox folders"
  }, /*#__PURE__*/_react.default.createElement(_Drawer.default, {
    variant: "permanent",
    sx: {
      display: {
        xs: 'none',
        sm: 'block'
      },
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: drawerWidth
      }
    },
    opencontents: true
  }, drawer)));
}