"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CachePageList = exports.KbnList = exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// コンテンツリスト
var ContentsList = /*#__PURE__*/function () {
  function ContentsList() {
    _classCallCheck(this, ContentsList);

    this.ContentsList = [// テスト。区分1：ニュース。
    {
      kbn: 1,
      kbnname: "news",
      jigyosyaid: 1,
      name: "共同通信",
      kiziid: 1,
      title: "脱「安倍・菅」は本当にできるか どうなる自民総裁選、河野、岸田氏に課題",
      source: "https://www.47news.jp/47reporters/6774003.html",
      image: "https://nordot-res.cloudinary.com/c_limit,w_800,f_auto,q_auto:eco/ch/images/808163253683044352/origin_1.jpg"
    }, {
      kbn: 1,
      kbnname: "news",
      jigyosyaid: 2,
      name: "産経新聞",
      kiziid: 2,
      title: "河野氏、１０日に総裁選出馬表明記者会見へ。",
      source: "https://www.sankei.com/article/20210909-SK5BGTCGN5OHREGH3HICFD3U4U/",
      image: "https://www.sankei.com/resizer/xvZDB1vdrfgfcwGTzFIUHCxZJkI=/1200x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/sankei/AUE65QS3VZO63IS72ORDMOBRZ4.jpg"
    }, {
      kbn: 1,
      kbnname: "news",
      jigyosyaid: 5,
      name: "読売新聞オンライン",
      kiziid: 5,
      title: "変異ウイルス「イータ株」、入国検疫で１８人確認…「カッパ株」も１９人",
      source: "https://www.yomiuri.co.jp/national/20210910-OYT1T50031/",
      image: "https://www.yomiuri.co.jp/media/2021/09/20210910-OYT1I50008-1.jpg?type=large"
    }, {
      kbn: 1,
      kbnname: "news",
      jigyosyaid: 6,
      name: "ウェザーマップ",
      kiziid: 6,
      title: "2021年　第四回「さくら開花予想」ウェザーマップ発表",
      source: "https://www.weathermap.co.jp/2021/02/18/20210218sakura4/",
      image: "https://www.weathermap.co.jp/wp-content/uploads/2021/02/sakura_front_1920x1080_day.png"
    }, {
      kbn: 1,
      kbnname: "news",
      jigyosyaid: 7,
      name: "JBPress",
      kiziid: 7,
      title: "不人気だったけど、日本人の命を救った菅義偉政権を惜しむ",
      source: "https://jbpress.ismedia.jp/articles/-/66849",
      image: "https://jbpress.ismcdn.jp/mwimgs/d/6/600mw/img_d6429acd5c38f113403782d6c292435e3412031.jpg"
    }, {
      kbn: 1,
      kbnname: "news",
      jigyosyaid: 8,
      name: "STVニュース北海道",
      kiziid: 8,
      title: "レンジ内部はほとんど焼けず　２人死亡アパート火事　出火原因特定急ぐ",
      source: "https://nordot.app/808632960259325952",
      image: "https://nordot-res.cloudinary.com/c_limit,w_800,f_auto,q_auto:eco/ch/images/808632937258844160/origin_1.jpg"
    }, {
      kbn: 1,
      kbnname: "news",
      jigyosyaid: 3,
      name: "ITmediaMobile",
      kiziid: 3,
      title: "防水＋おサイフケータイだけじゃない　「OPPO Reno5 A」が“安心”して使えるスマホである理由",
      source: "https://www.itmedia.co.jp/mobile/articles/2108/26/news006.html?utm_source=itm&utm_medium=reno5&utm_campaign=ls210805",
      image: "https://image.itmedia.co.jp/mobile/articles/2108/26/l_st52693_oppopr-10.jpg"
    }, // テスト。区分2：生活・雑貨。
    {
      kbn: 2,
      kbnname: "lifestyle",
      jigyosyaid: 7,
      name: "JBPress",
      kiziid: 10,
      title: "日本人に「石の上にも三年」よりも「逃げ恥」が重要と思う理由",
      source: "https://jbpress.ismedia.jp/articles/-/66896",
      image: "https://jbpress.ismcdn.jp/mwimgs/a/2/600mw/img_a2b3bf48688c17f97cc0b70824e4359e502174.jpg"
    }, {
      kbn: 2,
      kbnname: "lifestyle",
      jigyosyaid: 7,
      name: "JBPress",
      kiziid: 11,
      title: "8.29写真ルポ：灯が消えた池袋マルイ「最後の日」",
      source: "https://jbpress.ismedia.jp/articles/-/66719",
      image: "https://jbpress.ismcdn.jp/mwimgs/2/5/600mw/img_250c1e03181a397a1fa68c3a76e7b91476218.jpg"
    }, {
      kbn: 2,
      kbnname: "lifestyle",
      jigyosyaid: 10,
      name: "citrus",
      kiziid: 12,
      title: "海外のファーストフード店でキッチンを覗いたら衛生面が心配になったのだが…その後の展開に心奪われた",
      source: "https://citrus-net.jp/article/93007",
      image: "https://cdn.allaboutnavi.co.jp/twinavi//img/socialnews/twinavi.jp/20201016/EeLCwcYUMAAgVz316028177499561.jpg"
    }, {
      kbn: 2,
      kbnname: "lifestyle",
      jigyosyaid: 2,
      name: "産経新聞",
      kiziid: 13,
      title: "目立ってナンボ　コテコテ看板を生み出す立体技術",
      source: "https://www.sankei.com/article/20210916-BJBPVOZQHVJBFHMSQJ3IKEI2UE/",
      image: "https://www.sankei.com/resizer/OFF8YP9XVQHbb2NeYKIBt7kC1Vc=/1200x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/sankei/QCHI5OFOSBJBBLNSRBVNT4QAYU.jpg"
    }, {
      kbn: 2,
      kbnname: "lifestyle",
      jigyosyaid: 11,
      name: "ESSE",
      kiziid: 14,
      title: "家庭でプロの味！人気上昇中の「あごだし」でつくるぜいたく茶漬け",
      source: "https://esse-online.jp/pr/321742?cx_clicks_art_mdl=3_title",
      image: "https://esse-online.jp/wp-content/uploads/2021/09/1028ek12523.jpg"
    }, {
      kbn: 2,
      kbnname: "lifestyle",
      jigyosyaid: 11,
      name: "ESSE",
      kiziid: 15,
      title: "米びつにコクゾウムシ、家具からトコジラミ？秋も油断禁物のイヤな害虫",
      source: "https://esse-online.jp/housework/316351?cx_clicks_art_mdl=2_title",
      image: "https://esse-online.jp/wp-content/uploads/2021/08/pixta_67767479_M-1.jpg"
    }, {
      kbn: 2,
      kbnname: "lifestyle",
      jigyosyaid: 12,
      name: "楽天トラベル",
      kiziid: 17,
      title: "湯めぐりとそぞろ歩きの名スポット「渋温泉」は女子旅におすすめ！ 【楽天トラベル】",
      source: "https://travel.rakuten.co.jp/mytrip/howto/shibuonsen-guide?lid=topC_feature_shibuonsen-guide_%EF%BD%87",
      image: "https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/styles/main_image/public/migration_article_images/howto/shibuonsen-guide-key.jpg?itok=EQTqMZfG"
    }, // テスト。区分3：スポーツ。
    {
      kbn: 3,
      kbnname: "sports",
      jigyosyaid: 9,
      name: "日刊スポーツ新聞社",
      kiziid: 9,
      title: "巨人５連敗の危機救った丸佳浩「流れが変わった」26打席ぶり安打が同点打",
      source: "https://www.nikkansports.com/baseball/news/202109090001202.html",
      image: "https://www.nikkansports.com/baseball/news/img/202109090001202-w1300_0.jpg"
    }, {
      kbn: 3,
      kbnname: "sports",
      jigyosyaid: 9,
      name: "日刊スポーツ新聞社",
      kiziid: 10,
      title: "アグエロ・バルセロナデビュー戦は10月バレンシア戦予定　スペイン紙",
      source: "https://www.nikkansports.com/soccer/world/news/202109280000851.html",
      image: "https://www.nikkansports.com/soccer/world/news/img/202109280000851-w1300_0.jpg"
    }, // テスト。区分4：映画。
    {
      kbn: 4,
      kbnname: "news",
      jigyosyaid: 4,
      name: "マグミクス",
      kiziid: 4,
      title: "映画『ザ・スーサイド・スクワッド』に詰まった、ガン監督の凄まじい「アメコミ愛」",
      source: "https://magmix.jp/post/61814",
      image: "https://magmix.jp/wp-content/uploads/2021/09/210813-thesuicidesquad-01.jpg"
    }, // テスト。区分5：ファイナンス。
    // テスト。区分6：ゲーム。
    {
      kbn: 6,
      kbnname: "games",
      jigyosyaid: 4,
      name: "マグミクス",
      kiziid: 18,
      title: "平成の名作『マリオカート64』の細かいあるある10選",
      source: "https://magmix.jp/post/63414",
      image: "https://magmix.jp/wp-content/uploads/2021/09/210928-mario-01.jpg"
    }, {
      kbn: 6,
      kbnname: "games",
      jigyosyaid: 4,
      name: "マグミクス",
      kiziid: 16,
      title: "ハード誕生20周年「ゲームキューブ」の名作3選　「リメイク希望！」の声多数",
      source: "https://magmix.jp/post/62144",
      image: "https://magmix.jp/wp-content/uploads/2021/09/210914-gcsoft-01-300x300.jpg"
    }, {
      kbn: 6,
      kbnname: "games",
      jigyosyaid: 4,
      name: "マグミクス",
      kiziid: 19,
      title: "15周年『ダイヤモンド・パール』　バグ技に絶望した小学生を救った、任天堂の真心に感動",
      source: "https://magmix.jp/post/63355",
      image: "https://magmix.jp/wp-content/uploads/2021/09/210928-dp-01.jpg"
    }];
  }

  _createClass(ContentsList, [{
    key: "getContentsList",
    value: function getContentsList() {
      return this.ContentsList;
    }
  }, {
    key: "getKbnName",
    value: function getKbnName() {
      return this.ContentsList[0].kbnname;
    }
  }]);

  return ContentsList;
}(); // 区分リスト 


exports.default = ContentsList;

var KbnList = /*#__PURE__*/function () {
  function KbnList() {
    _classCallCheck(this, KbnList);

    this.KbnList = [{
      kbn: 1,
      kbnname: "ニュース"
    }, {
      kbn: 2,
      kbnname: "生活・雑貨"
    }, {
      kbn: 3,
      kbnname: "スポーツ"
    }, {
      kbn: 4,
      kbnname: "映画・音楽"
    }, {
      kbn: 5,
      kbnname: "ファイナンス"
    }, {
      kbn: 6,
      kbnname: "ゲーム"
    }];
  }

  _createClass(KbnList, [{
    key: "getKbnList",
    value: function getKbnList() {
      return this.KbnList;
    }
  }]);

  return KbnList;
}(); // ヘッダー部分に表示する履歴リスト


exports.KbnList = KbnList;

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