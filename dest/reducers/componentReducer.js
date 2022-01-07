"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.componentReducer = exports.initialState = exports.dumb = void 0;

var _connectedReactRouter = require("connected-react-router");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

////////////////////////////////////////////////////
// コンポーネントのstate
var dumb = function dumb() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return state;
};

exports.dumb = dumb;
var initialState = {
  fileNameList: [],
  selectedFileName: "contents.json",
  thisContents: null,
  mtime: "未取得",
  status: "停止"
};
exports.initialState = initialState;

var componentReducer = function componentReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "SET_FILENAME_LIST":
      return _objectSpread(_objectSpread({}, state), {}, {
        fileNameList: action.fileNameList
      });

    case "SET_MTIME":
      return _objectSpread(_objectSpread({}, state), {}, {
        mtime: action.mtime
      });

    case "SET_SELECTED_FILENAME":
      return _objectSpread(_objectSpread({}, state), {}, {
        selectedFileName: action.fileName,
        thisContents: action.contentsList
      });

    case "SET_CRAWLING_STATUS":
      console.log(new Date() + "componentReduser.SET_CRAWLING_STATUS called.");
      console.log(action.status);
      return _objectSpread(_objectSpread({}, state), {}, {
        status: action.status
      });

    default:
      return state;
  }
};

exports.componentReducer = componentReducer;
var _default = componentReducer;
exports.default = _default;