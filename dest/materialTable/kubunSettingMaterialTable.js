"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = KubunSettingMaterialTable;

var _react = _interopRequireWildcard(require("react"));

var _materialTable = _interopRequireDefault(require("material-table"));

var _showContentsArea = require("../show/showContentsArea.jsx");

var _AddBox = _interopRequireDefault(require("@material-ui/icons/AddBox"));

var _ArrowDownward = _interopRequireDefault(require("@material-ui/icons/ArrowDownward"));

var _Check = _interopRequireDefault(require("@material-ui/icons/Check"));

var _ChevronLeft = _interopRequireDefault(require("@material-ui/icons/ChevronLeft"));

var _ChevronRight = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));

var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));

var _DeleteOutline = _interopRequireDefault(require("@material-ui/icons/DeleteOutline"));

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _FilterList = _interopRequireDefault(require("@material-ui/icons/FilterList"));

var _FirstPage = _interopRequireDefault(require("@material-ui/icons/FirstPage"));

var _LastPage = _interopRequireDefault(require("@material-ui/icons/LastPage"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

var _SaveAlt = _interopRequireDefault(require("@material-ui/icons/SaveAlt"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _ViewColumn = _interopRequireDefault(require("@material-ui/icons/ViewColumn"));

var _Save = _interopRequireDefault(require("@material-ui/icons/Save"));

var _Details = _interopRequireDefault(require("@material-ui/icons/Details"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// MaterialTableに使用するアイコンを定数化
var tableIcons = {
  Add: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_AddBox.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Check: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Check.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Clear: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Clear.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Delete: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_DeleteOutline.default, _extends({}, props, {
      ref: ref
    }));
  }),
  DetailPanel: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ChevronRight.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Edit: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Edit.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Export: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_SaveAlt.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Filter: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_FilterList.default, _extends({}, props, {
      ref: ref
    }));
  }),
  FirstPage: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_FirstPage.default, _extends({}, props, {
      ref: ref
    }));
  }),
  LastPage: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_LastPage.default, _extends({}, props, {
      ref: ref
    }));
  }),
  NextPage: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ChevronRight.default, _extends({}, props, {
      ref: ref
    }));
  }),
  PreviousPage: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, _extends({}, props, {
      ref: ref
    }));
  }),
  ResetSearch: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Clear.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Search: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Search.default, _extends({}, props, {
      ref: ref
    }));
  }),
  SortArrow: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ArrowDownward.default, _extends({}, props, {
      ref: ref
    }));
  }),
  ThirdStateCheck: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Remove.default, _extends({}, props, {
      ref: ref
    }));
  }),
  ViewColumn: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ViewColumn.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Save: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Save.default, _extends({}, props, {
      ref: ref
    }));
  })
}; ///////////////////////////////////////////////////////////////// 
// MaterialTableを生成する、ルートコンポーネント
///////////////////////////////////////////////////////////////// 

function KubunSettingMaterialTable(props) {
  // 区分リストのデータをセット
  var _useState = (0, _react.useState)(props.data),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1]; /////////////////////////////////////////////////////////////////
  // 区分セット。MaterialTableのeditable属性


  var editableKubunSetting = /*#__PURE__*/_react.default.createElement(_materialTable.default, {
    title: "\u533A\u5206\u30BB\u30C3\u30C8",
    columns: props.columns,
    data: data,
    editable: {
      ///////////////////////////////////////////////////////////////// 
      // 区分リストの編集処理
      onRowUpdate: function onRowUpdate(newData, oldData) {
        return new Promise(function (resolve, reject) {
          var dataSet = {
            "before": [],
            "after": []
          }; // setTimeout(() => {
          // const dataUpdate = [...data];
          // const index = oldData.tableData.id;
          // dataSet.before.push(data[index]);
          // dataUpdate[index] = newData;
          // setData([...dataUpdate]);

          dataSet.before.push(oldData);
          dataSet.after.push(newData);
          resolve(dataSet); // }, 1000);
        }).then(function (response) {
          _showContentsArea.Kbns.setEditKubunList(response);
        }).catch(function (error) {
          console.error(error);
        });
      },
      ///////////////////////////////////////////////////////////////// 
      // 区分リストの削除処理
      onRowDelete: function onRowDelete(oldData) {
        return new Promise(function (resolve, reject) {
          var dataSet = {
            "delete": []
          }; // setTimeout(() => {

          var dataDelete = _toConsumableArray(data);

          var index = oldData.tableData.id; // バックエンドに渡す為の削除対象データ

          dataSet.delete.push(oldData);
          dataDelete.splice(index, 1);
          setData(_toConsumableArray(dataDelete));
          resolve(dataSet); // }, 1000);
        }).then(function (response) {
          _showContentsArea.Kbns.setDeleteKubunList(response);
        }).catch(function (error) {
          console.error(error);
        });
      }
    },
    options: {
      showTitle: true,
      search: true,
      tableLayout: "auto",
      overflowX: "scroll",
      paging: false,
      maxBodyHeight: 450,
      headerStyle: {
        position: 'sticky',
        top: 0,
        fontSize: "9pt"
      },
      searchFieldStyle: {
        padding: "0.5em",
        fontSize: "8pt"
      }
    },
    localization: {
      header: {
        actions: ''
      },
      body: {
        editRow: {
          deleteText: "データは削除されます。よろしいですか？"
        }
      }
    },
    icons: tableIcons,
    actions: [// 詳細ボタン。現在登録されているクロールデータを表示する
    {
      icon: _Details.default,
      tooltip: "Edt your's settings.",
      cellStyle: {
        fontSize: "0.8em",
        width: "10%",
        minWidth: "10%"
      },
      headerStyle: {
        fontWeight: "bold",
        width: "10%",
        minWidth: "10%"
      },
      onClick: function onClick(e, rowData) {
        props.setSelectedCrawling(rowData);
      }
    }]
  }); /////////////////////////////////////////////////////////////////
  // MaterialTableの戻り値


  return /*#__PURE__*/_react.default.createElement("div", {
    className: "materialKubunSetting",
    style: {
      maxWidth: "45%",
      minWidth: "45%",
      marginLeft: "16.6rem",
      padding: "0.5em",
      fontSize: "10pt"
    }
  }, editableKubunSetting);
}