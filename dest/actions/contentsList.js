"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var action = _interopRequireWildcard(require("../actions/action.js"));

var _store = _interopRequireDefault(require("../store/store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ContentsListJson = require('../data/contents/contents.json');

var ContentsListJsonPath = "../data/contents"; ///////////////////////////////////////////////////////////////// 
// コンテンツリスト
///////////////////////////////////////////////////////////////// 

var ContentsList = /*#__PURE__*/function () {
  function ContentsList() {
    _classCallCheck(this, ContentsList);

    try {
      this.ContentsList = ContentsListJson;
    } catch (error) {
      console.error("make ContentsList error occarred.");
      console.error(error);
    }
  } ///////////////////////////////////////////////////////////////// 
  // コンテンツリストのゲッター


  _createClass(ContentsList, [{
    key: "getContentsList",
    value: function getContentsList(fileName) {
      try {
        this.ContentsList = require("../data/contents" + "/" + fileName);

        _store.default.dispatch(action.SET_SELECTED_FILENAME(fileName, this.ContentsList));
      } catch (error) {
        console.error("make ContentsList error occarred.");
        console.error(error);
      }
    } ///////////////////////////////////////////////////////////////// 
    // ファイルの更新日時を返す

  }, {
    key: "recentUpdateFileDate",
    value: function recentUpdateFileDate(fileKubun, request) {
      return new Promise(function (resolve, reject) {
        // fetch処理
        fetch("/recentUpdateFileDate", {
          method: "POST",
          mode: "no-cors",
          heders: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "fileKubun": fileKubun,
            "request": request
          })
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          }
        }).then(function (responseJson) {
          if (request == "list") {
            _store.default.dispatch(action.SET_FILENAME_LIST(responseJson));
          } else if (request == "mtime") {
            _store.default.dispatch(action.SET_MTIME(responseJson.mtime));
          }

          resolve(responseJson);
        }).catch(function (error) {
          console.error(error);
          reject({
            flag: false
          });
        });
      });
    }
  }]);

  return ContentsList;
}();

exports.default = ContentsList;