"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Test = Test;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _AddCircle = _interopRequireDefault(require("@material-ui/icons/AddCircle"));

var _reactRedux = require("react-redux");

var actions = _interopRequireWildcard(require("./actions/action.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Test(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: "500px",
      marginTop: "300px"
    }
  }, /*#__PURE__*/_react.default.createElement("p", null, props.state), /*#__PURE__*/_react.default.createElement(_core.Button, {
    onClick: function onClick() {
      return props.handleClick("実行中");
    }
  }, "\u30C6\u30B9\u30C8\u30DC\u30BF\u30F3\u3067\u3059", /*#__PURE__*/_react.default.createElement(_AddCircle.default, null)));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    state: state.componentReducer.status
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleClick: function handleClick(str) {
      return dispatch(actions.SET_CRAWLING_STATUS(str));
    }
  };
};

var ContainerInMiddle = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Test);
var _default = ContainerInMiddle;
exports.default = _default;