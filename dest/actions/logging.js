"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logging = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

///////////////////////////////////////////////////////////////// 
// フロントエンドログ出力クラス
///////////////////////////////////////////////////////////////// 
var Logging = /*#__PURE__*/function () {
  function Logging() {
    _classCallCheck(this, Logging);

    var date = new Date();
    this.jikoku = date.getFullYear() + "" + date.getMonth() + "" + date.getDate();
  } ///////////////////////////////////////////////////////////////// 
  // ログ出力api呼び出し


  _createClass(Logging, [{
    key: "outLog",
    value: function outLog(errorinfo) {
      var fileName = "reactLog_" + this.jikoku; // fetch処理

      fetch("/logging", {
        method: "POST",
        mode: "no-cors",
        heders: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "fileName": fileName,
          "errorinfo": errorinfo
        })
      }).catch(function (error) {
        console.error(error);
      });
    }
  }]);

  return Logging;
}();

exports.Logging = Logging;