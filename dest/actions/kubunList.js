"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KbnList = void 0;

var _commonFunc = require("../commonFunc");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KubunListJsonFileName = "kbns.json";
var krawlingListJsonFileName = "crawlingList.json";

var KbnListJson = require('../data/kbns/kbns.json'); ///////////////////////////////////////////////////////////////// 
// 区分リスト 
///////////////////////////////////////////////////////////////// 


var KbnList = /*#__PURE__*/function () {
  function KbnList() {
    var _this = this;

    _classCallCheck(this, KbnList);

    _defineProperty(this, "setNewKubunList", function (changedValueKubun, changedValueKubunName, changedValueComment) {
      return new Promise(function (resolve, reject) {
        // 区分の半角変換と数値変換処理
        var str = "";

        for (var i = 0; i < changedValueKubun.length; i++) {
          str += String.fromCharCode(changedValueKubun.charCodeAt(i) - 0xFEE0);
        } // 数値変換の処理結果がNan=数値以外であればエラー


        if (isNaN(Number(str))) {
          if (isNaN(Number(changedValueKubun))) {
            alert("区分には数値を入力してください!");
            throw "(区分リスト新規登録処理)区分入力エラー";
          } else {
            changedValueKubun = Number(changedValueKubun);
          }
        } else {
          changedValueKubun = Number(str);
        } // findindexで検索結果0件の場合は-1を返す。区分リストの追加登録を行う。


        var target = _this.KbnList.kbns.findIndex(function (v) {
          return v.kbn === changedValueKubun;
        });

        if (target === -1) {
          // オブジェクトにデータを追加
          var newKubunList = {};
          newKubunList.kbn = changedValueKubun;
          newKubunList.kbnname = changedValueKubunName;
          newKubunList.comment = changedValueComment;

          _this.KbnList.kbns.push(newKubunList); // fetch処理


          fetch("/addNewKubunList", {
            method: "POST",
            mode: "no-cors",
            heders: {
              'Content-Type': 'application/json;charset=utf-8',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              fileName: KubunListJsonFileName,
              kbn: changedValueKubun,
              kbnname: changedValueKubunName,
              comment: changedValueComment
            })
          }).then(function (response) {
            if (response.ok) {
              return response.json();
            } else {
              alert("http status is: " + response.status);
            }
          }).then(function (responseJson) {
            resolve(responseJson); // jsonオブジェクトを返却する 

            if (responseJson.flag) {
              alert("区分を追加しました!!");
            }
          }).catch(function (error) {
            alert("区分リストの追加に失敗しました!");
            console.error(error);
            reject(false);
          });
        } else {
          alert("入力した区分リストは既に存在します!");
        }
      });
    });

    _defineProperty(this, "setEditKubunList", function (props) {
      return new Promise(function (resolve, reject) {
        var result = {};
        var kbnBefore = props.before[0].kbn;
        var kbnnameBefore = props.before[0].kbnname;
        var commentBefore = props.before[0].comment;
        var kbnAfter = props.after[0].kbn;
        var kbnnameAfter = props.after[0].kbnname;
        var commentAfter = props.after[0].comment; // 区分の半角と数値を変換する外部メソッドを呼び出す
        // stringToNumber:返却値:{flag:"変換成功、失敗フラグ, res:""変換後の値"}

        result = (0, _commonFunc.stringToNumber)(kbnAfter);
        kbnAfter = result["res"]; // 編集後の値についてnullチェック

        if (kbnnameAfter == undefined || commentAfter == undefined || kbnnameAfter == "" || commentAfter == "") {
          alert("全ての項目を入力してください!");
          throw "全ての項目を入力してください!";
        } // 区分の変換結果がtrueの場合のみ、後続の処理を続行する


        if (!result.flag) {
          alert("区分は数値を入力してください。");
          reject(result);
        } // findindexで検索結果0件の場合は-1を返す。クローリング情報の更新は不可。


        var target = _this.KbnList.kbns.findIndex(function (v) {
          return v.kbn === kbnBefore;
        });

        if (target === -1) {
          alert("区分リストの編集に失敗しました!該当の区分が見つかりません!");
          result.flag = false;
          reject(result);
        } else {
          var target = _this.KbnList.kbns.findIndex(function (v) {
            return v.kbn === kbnAfter;
          });

          if (target === -1) {
            alert("区分の値は更新できません。");
            result.flag = false;
            reject(result);
          } // this.KbnList.kbns[target].kbn = kbnAfter;	区分の変更は不可。


          _this.KbnList.kbns[target].kbnname = kbnnameAfter;
          _this.KbnList.kbns[target].comment = commentAfter;
        } // fetch処理


        fetch("/setEditKubunList", {
          method: "POST",
          mode: "no-cors",
          heders: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "kubunFileName": KubunListJsonFileName,
            "krawlingListFileName": krawlingListJsonFileName,
            "kbnBefore": kbnBefore,
            "kbnnameBefore": kbnnameBefore,
            "commentBefore": commentBefore,
            "kbnAfter": kbnAfter,
            "kbnnameAfter": kbnnameAfter,
            "commentAfter": commentAfter
          })
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            alert("http status is: " + response.status);
            reject(result);
          }
        }).then(function (responseJson) {
          resolve(responseJson);

          if (responseJson.flag) {
            alert("区分リストを編集しました!");
            resolve(result);
          }
        }).catch(function (error) {
          alert("区分リストの削除に失敗しました!");
          console.error(error);
          reject(result);
        });
      });
    });

    _defineProperty(this, "setDeleteKubunList", function (props) {
      return new Promise(function (resolve, reject) {
        // 削除対象の区分を代入
        var targetKubun = props["delete"][0].kbn; // fetch処理

        fetch("/setDeleteKubunList", {
          method: "POST",
          mode: "no-cors",
          heders: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "fileName": KubunListJsonFileName,
            "targetKubun": targetKubun
          })
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            alert("http status is: " + response.status);
            reject(false);
          }
        }).then(function (responseJson) {
          if (responseJson.flag) {
            alert("区分リストを削除しました!");
            resolve(true);
          }
        }).catch(function (error) {
          alert("区分リストの削除に失敗しました!");
          console.error(error);
          reject(false);
        });
      });
    });

    this.KbnList = KbnListJson;
  } ///////////////////////////////////////////////////////////////// 
  // 区分リストのゲッター


  _createClass(KbnList, [{
    key: "getKbnList",
    value: function getKbnList() {
      return this.KbnList;
    } ///////////////////////////////////////////////////////////////// 
    // 区分リスト新規登録処理

  }]);

  return KbnList;
}();

exports.KbnList = KbnList;