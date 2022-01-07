"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CachePageList = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

///////////////////////////////////////////////////////////////// 
// ヘッダー部分に表示する履歴リスト
var CachePageList = /*#__PURE__*/function () {
  function CachePageList() {
    _classCallCheck(this, CachePageList);

    this.cachePageList = [{
      lastvisited: "2021-09-28 17:55:00",
      title: "Amazon | 本, ファッション, 家電から食品まで | アマゾン",
      source: "https://www.amazon.co.jp/",
      image: "https://www.10wallpaper.com/wallpaper/1280x960/1603/Amazon_logo_brand_company-High_Quality_HD_Wallpaper_1280x960.jpg"
    }, {
      lastvisited: "2021-09-24 21:18:00",
      title: "楽天トラベル: 宿・ホテル予約 国内旅行・海外旅行 予約サイト",
      source: "https://travel.rakuten.co.jp/",
      image: "https://img.travel.rakuten.co.jp/smart/webclipIcon.png"
    }, {
      lastvisited: "2021-09-06 07:47:00",
      title: "JBpress (ジェイビープレス) ｜ リアルな知性で世界に勝つ",
      source: "https://jbpress.ismedia.jp/",
      image: "https://jbpress.ismcdn.jp/common/images/favicons/apple-touch-icon-120x120.png"
    }, {
      lastvisited: "2021-09-06 07:47:00",
      title: "価格.com - 「買ってよかった」をすべてのひとに。",
      source: "https://kakaku.com/",
      image: "https://img1.kakaku.k-img.com/images/favicon/favicon.ico"
    }];
  }

  _createClass(CachePageList, [{
    key: "getcachePageList",
    value: function getcachePageList() {
      return this.cachePageList;
    }
  }]);

  return CachePageList;
}();

exports.CachePageList = CachePageList;