"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _connectedReactRouter = require("connected-react-router");

var _loginReducer = _interopRequireDefault(require("../reducers/loginReducer.js"));

var _componentReducer = _interopRequireDefault(require("../reducers/componentReducer.js"));

var _history = _interopRequireDefault(require("../history.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  router: (0, _connectedReactRouter.connectRouter)(_history.default),
  loginReducer: _loginReducer.default,
  componentReducer: _componentReducer.default
}), (0, _redux.applyMiddleware)((0, _connectedReactRouter.routerMiddleware)(_history.default)));
var _default = store;
exports.default = _default;