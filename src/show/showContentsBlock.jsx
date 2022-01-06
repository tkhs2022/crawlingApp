
///////////////////////////////////////////////////////////////// 
// コンテンツボックスに記事を表示するクラス
///////////////////////////////////////////////////////////////// 
import React from "react";
import MediaCardForContentsBlock from '../card/cardComponent.jsx';
// コンテンツボックス部分のスタイル変数
import {DetailOriginal, DetailShow, DetailHide, DetailShowActiveSiteHedder} from './showContentsArea.jsx';
import {SiteHedderActiveM} from './showContentsArea.jsx';
// MoveBlockOnClick関数呼び出し時のパラメータに、自身の関数名を入れる。
import {CaseA, CaseB} from './showContentsArea.jsx';
import store from "../store/store.js";
import { cssFileAble, cssFileDisable } from '../commonFunc.js';
///////////////////////////////////////////////////////////////// 
// コンテンツブロックをコントロール。コンテンツごとに記事を振り分け。(初回のみ)
export class ContentsBlockControl extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // storeアクセスでの待機中はローディングCSSを流す
    cssFileAble("loading.css");
  }

  componentDidMount() {
    cssFileDisable("loading.css");
  }

  render() {
    var contentesList = store.getState().componentReducer.thisContents;
    const Rows = 
     contentesList != undefined &&
      contentesList.article.map((Content, index) => {
        return(
          this.props.Kbn == Content.kbn &&
            <MediaCardForContentsBlock key={index} Content={Content}/>
        );
      });
    
    return(
      // デフォルトでは区分1のコンテンツブロックを表示
      this.props.Kbn == 1 ?
        <div id ={this.props.Kbn} className={DetailShow}>{Rows}</div> :
        <div id ={this.props.Kbn} className={DetailOriginal}>{Rows}</div>
      );
  }
}
   
///////////////////////////////////////////////////////////////// 
// コンテンツボックスのアニメーション表示・非表示。
export const MoveBlockOnClick = (TargetKbn, Caller) => {
  var SiteHedderActive = SiteHedderActiveM.GetterSiteHedderActive();
  
  if (TargetKbn == null && TargetKbn == undefined && Caller == CaseA) {
    return;
  }

  // ボタンクリックのあったコンテンツタイトルに対応するコンテンツブロックを取得
  var ElementOfContentsBlock = document.getElementById(TargetKbn);
  // コンテンツブロックの表示状態(className)を取得
  var TargetContentsBlockClassName = ElementOfContentsBlock.getAttribute("class");

  switch (Caller) {
    // CaseA:履歴表示ボタン処理から呼ばれたケース
    case CaseA:
      switch (TargetContentsBlockClassName) {
        case DetailShow:
          SiteHedderActive && ElementOfContentsBlock.setAttribute("class",DetailShowActiveSiteHedder);
          break;
        case DetailShowActiveSiteHedder:
          !SiteHedderActive && ElementOfContentsBlock.setAttribute("class",DetailShow);
          break;
      }
      break;

    // CaseB:コンテンツタイトルボタン押下処理から呼ばれたケース
    case CaseB:
      switch (TargetContentsBlockClassName) {
        case DetailOriginal:
          SiteHedderActive ? ElementOfContentsBlock.setAttribute("class",DetailShowActiveSiteHedder) : ElementOfContentsBlock.setAttribute("class",DetailShow);         
          break;
        case DetailHide:
          SiteHedderActive ? ElementOfContentsBlock.setAttribute("class",DetailShowActiveSiteHedder) : ElementOfContentsBlock.setAttribute("class",DetailShow);
          break;
        case DetailShow:
          ElementOfContentsBlock.setAttribute("class",DetailHide);
          break;
        case DetailShowActiveSiteHedder:
          ElementOfContentsBlock.setAttribute("class",DetailHide);
          break;
      }
  }
};

export default MoveBlockOnClick;