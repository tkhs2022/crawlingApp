"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MediaCardForCacheList = exports.MediaCardForContentsBlock = void 0;

var _react = _interopRequireDefault(require("react"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardActionArea = _interopRequireDefault(require("@material-ui/core/CardActionArea"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/////////////////////////////////////////////////////////////////
// スタイル。各種記事ブロックに収める画像とリンクをカードクラスで生成する。
// 詳細なプロパティはindex.cssに記述。
/////////////////////////////////////////////////////////////////
var ArticleCardStyle = (0, _styles.makeStyles)({
  root: {},
  media: {
    height: 140
  }
}); ///////////////////////////////////////////////////////////////// 
// 各種記事ブロックに収める画像とリンクをカードクラスで生成する。
///////////////////////////////////////////////////////////////// 

var MediaCardForContentsBlock = function MediaCardForContentsBlock(props) {
  var Content = props.Content;
  var classes = ArticleCardStyle();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "article"
  }, /*#__PURE__*/_react.default.createElement(_Card.default, {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_CardActionArea.default, null, /*#__PURE__*/_react.default.createElement("a", {
    href: Content.source,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/_react.default.createElement(_CardMedia.default, {
    className: classes.media,
    image: Content.image,
    title: Content.title
  }), /*#__PURE__*/_react.default.createElement(_CardContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    component: "h2"
  }, Content.name), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle1",
    color: "textSecondary",
    component: "h2"
  }, Content.title))))));
}; ///////////////////////////////////////////////////////////////// 
// 各種記事ブロックに収める画像とリンクをカードクラスで生成する。
///////////////////////////////////////////////////////////////// 


exports.MediaCardForContentsBlock = MediaCardForContentsBlock;

var MediaCardForCacheList = function MediaCardForCacheList(props) {
  var Cache = props.Cache;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "CacheList"
  }, /*#__PURE__*/_react.default.createElement(_Card.default, null, /*#__PURE__*/_react.default.createElement(_CardActionArea.default, null, /*#__PURE__*/_react.default.createElement("a", {
    href: Cache.source,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/_react.default.createElement(_CardMedia.default, {
    component: "img",
    image: Cache.image,
    title: Cache.title
  })))));
};

exports.MediaCardForCacheList = MediaCardForCacheList;
var _default = MediaCardForContentsBlock;
exports.default = _default;