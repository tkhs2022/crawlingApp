"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrawlingList = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CrawlingListJson = require('../data/crawling/crawlingList.json');

var CrawlingListJsonFileName = "crawlingList.json"; ///////////////////////////////////////////////////////////////// 
// クローリングリスト
///////////////////////////////////////////////////////////////// 

var CrawlingList = /*#__PURE__*/function () {
  function CrawlingList() {
    var _this = this;

    _classCallCheck(this, CrawlingList);

    _defineProperty(this, "addNewCrawlingList", function (props) {
      return new Promise(function (resolve, reject) {
        try {
          // オブジェクトにデータを追加
          var newCrawlingList = {};
          newCrawlingList["kbn"] = props.kbn;
          newCrawlingList["kbnname"] = props.kbnname;
          newCrawlingList["jigyosyaid"] = props.jigyosyaid;
          newCrawlingList["name"] = props.name;
          newCrawlingList["crawlingurl"] = props.crawlingurl;
          newCrawlingList["xpathTitle"] = props.xpathTitle.replace("\"", "\'").replace("\"", "\'");
          newCrawlingList["xpathLink"] = props.xpathLink.replace("\"", "\'").replace("\"", "\'");
          newCrawlingList["xpathImage"] = props.xpathImage.replace("\"", "\'").replace("\"", "\'"); // 編集後の値についてnullチェック

          if (newCrawlingList["kbn"] == "" || newCrawlingList["jigyosyaid"] == "" || newCrawlingList["name"] == "" || newCrawlingList["crawlingurl"] == "" || newCrawlingList["xpathTitle"] == "" || newCrawlingList["xpathLink"] == "" || newCrawlingList["xpathImage"] == "") {
            alert("全ての項目を入力してください!");
            throw "全ての項目を入力してください!";
          } // クローリングオブジェクトにデータを追加


          _this.CrawlingList.crawling.push(newCrawlingList); // fetch処理


          fetch("/addNewCrawlingList", {
            method: "POST",
            mode: "no-cors",
            heders: {
              'Content-Type': 'application/json;charset=utf-8',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              fileName: CrawlingListJsonFileName,
              kbn: newCrawlingList["kbn"],
              kbnname: newCrawlingList["kbnname"],
              jigyosyaid: newCrawlingList["jigyosyaid"],
              name: newCrawlingList["name"],
              crawlingurl: newCrawlingList["crawlingurl"],
              xpathTitle: newCrawlingList["xpathTitle"],
              xpathLink: newCrawlingList["xpathLink"],
              xpathImage: newCrawlingList["xpathImage"]
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
              alert("クローリング対象を追加しました!");
            }
          });
        } catch (error) {
          alert("クローリング対象の追加に失敗しました!");
          console.error(error);
          reject(false);
        }
      });
    });

    _defineProperty(this, "setUpdateCrawlingList", function (item, changedCrawlingUrl, changedCrawlingXpathTitle, changedValueCrawlingXpathLink, changedValueCrawlingXpathImage) {
      return new Promise(function (resolve, reject) {
        try {
          var target = _this.CrawlingList.crawling.findIndex(function (v) {
            return v.kbn === item.kbn && v.jigyosyaid === item.jigyosyaid;
          }); // findindexで検索結果0件の場合は-1を返す。クローリング情報の更新は不可。


          if (target === -1) {
            alert("クローリングの設定を更新できませんでした!");
          } else {
            _this.CrawlingList.crawling[target].crawlingurl = changedCrawlingUrl;
            _this.CrawlingList.crawling[target].xpathTitle = changedCrawlingXpathTitle.replace("\"", "\'").replace("\"", "\'");
            _this.CrawlingList.crawling[target].xpathLink = changedValueCrawlingXpathLink.replace("\"", "\'").replace("\"", "\'");
            _this.CrawlingList.crawling[target].xpathImage = changedValueCrawlingXpathImage.replace("\"", "\'").replace("\"", "\'"); // fetch処理

            fetch("/api", {
              method: "POST",
              mode: "no-cors",
              heders: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                fileName: CrawlingListJsonFileName,
                kbn: item.kbn,
                jigyosyaid: item.jigyosyaid,
                crawlingurl: _this.CrawlingList.crawling[target].crawlingurl,
                xpathTitle: _this.CrawlingList.crawling[target].xpathTitle,
                xpathLink: _this.CrawlingList.crawling[target].xpathLink,
                xpathImage: _this.CrawlingList.crawling[target].xpathImage
              })
            }).then(function (response) {
              if (response.ok) {
                return response.json();
              } else {
                alert("http status is: " + response.status);
              }
            }).then(function (responseJson) {
              if (responseJson.flag) {
                alert("クローリングの設定を更新しました!");
                resolve(responseJson);
              }
            });
          }
        } catch (error) {
          alert("ローカルファイルの更新に失敗しました!該当の区分が見つかりませんでした!");
          console.error(error);
          reject({
            flag: false
          });
        }
      });
    });

    _defineProperty(this, "setDeleteCrawlingList", function (props) {
      // 削除対象の区分を代入
      var targetKubun = props["delete"][0].kbn;
      var targetJigyosyaid = props["delete"][0].jigyosyaid; // fetch処理

      fetch("/setDeleteCrawlingList", {
        method: "POST",
        mode: "no-cors",
        heders: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "fileName": CrawlingListJsonFileName,
          "targetKubun": targetKubun,
          "targetJigyosyaid": targetJigyosyaid
        })
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          alert("http status is: " + response.status);
        }
      }).then(function (responseJson) {
        if (responseJson.flag) {
          alert("クロール対象データを削除しました!");
        }
      }).catch(function (error) {
        alert("クロール対象データの削除に失敗しました!");
        console.error(error);
      });
    });

    try {
      this.CrawlingList = CrawlingListJson;
    } catch (error) {
      console.error("make CrawlingList error occarred.");
      console.error(error);
    }
  } ///////////////////////////////////////////////////////////////// 
  // クローリングリストのゲッター


  _createClass(CrawlingList, [{
    key: "getCrawlingList",
    value: function getCrawlingList() {
      try {
        this.CrawlingList = require("../data/crawling" + "/" + CrawlingListJsonFileName);
        return this.CrawlingList;
      } catch (error) {
        console.error("make ContentsList error occarred.");
        console.error(error);
      }
    } ///////////////////////////////////////////////////////////////// 
    // クローリングリスト新規登録処理

  }, {
    key: "execCrawling",
    value: ///////////////////////////////////////////////////////////////// 
    // クローリングプログラム実行関数
    function execCrawling() {
      return new Promise(function (resolve, reject) {
        // fetch処理
        fetch("/py", {
          method: "POST",
          mode: "no-cors",
          heders: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            fileName: CrawlingListJsonFileName
          })
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          }
        }).then(function (responseJson) {
          resolve(responseJson.flag); // true
        }).catch(function (error) {
          console.error("<crawlingList.js> execCrawling occared eerror.");
          console.error(error);
          reject(false);
        });
      });
    }
  }]);

  return CrawlingList;
}();

exports.CrawlingList = CrawlingList;