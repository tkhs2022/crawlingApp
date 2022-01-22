///////////////////////////////////////////////////////////////// 
// メインブロッククラス
import React from "react";
import { connect } from 'react-redux'
import ContainerContentsBlockControl from './showContentsBlock.jsx';
import {ContentsTitleBlock} from './showContentsTitle.jsx';
// import {OnHedderBox} from './show/showOnHedderBox.jsx';
import cssFileControl from '../commonFunc.js';
import * as actions from "../actions/action.js"

///////////////////////////////////////////////////////////////// 
// 定数定義エリア
// ヘッダー部(背景)
export const ImageSiteHeaderOriginal ="imageSiteHeaderOriginal";
// ヘッダー部(履歴表示ボタン)
export const SiteHedderButtonOriginal = "siteHedderButtonOriginal";
export const SiteHedderButtonShow = "siteHedderButtonShow";
// 履歴表示ボックスのスタイル
export const CacheList = "cacheList";
// コンテンツタイトルボックス
export const ContentsTitleOriginal ="contentsTitleOriginal";
// コンテンツタイトルボックスの下線
export const ContentTitleUnderBorderOriginal ="contentTitleUnderBorderOriginal";
export const ContentTitleUnderBorderShow ="contentTitleUnderBorderShow";
export const ContentTitleUnderBorderHide ="contentTitleUnderBorderHide";
// コンテンツボックス
export const DetailOriginal = "detail";
export const DetailShow = "detailShow";
export const DetailHide ="detailHide";
export const DetailShowActiveSiteHedder = "detailShowActiveSiteHedder";
// MoveBlockOnClick関数呼び出し時のパラメータに、自身の関数名を入れる。
export const CaseA = "OnHedderBox";
export const CaseB = "ContentsTitleButtonWithBorder";
 
///////////////////////////////////////////////////////////////// 
// react-transition-groupで使用するスタイル
// showOnHedderBox.jsx ヘッダー部で使用。
// 2021/12/10 廃止
export const TransitionImageSiteHeaderShow = {
  entering:{
    height:"200px"
  },
  entered:{
    height:"200px"
  },
  exiting: {
    height:"150px"
  },
  exited: {
    height:"150px"
  }
};
export const TransitionCacheList = {
  entering:{
    opacity:"0"
  },
  entered:{
    opacity:"1"
  },
  exiting: {
    opacity:"0"
  },
  exited: {
    opacity:"0"
  }
}
// showContentsTitle.jsx コンテンツタイトル部で使用。
export const TransitionContentsTitleShow = {
  entering:{
    transform:"translateY(120%)"
  },
  entered:{
    transform:"translateY(120%)"
  },
  exiting: {
    transform:"translateY(0%)"
  },
  exited: {
    transform:"translateY(0%)"
  }
};

///////////////////////////////////////////////////////////////// 
// 区分リストの区分が入る。前回クリックしたタイトルボタンを保持する為に使用。
// デフォルトは区分1のタイトルボタンを保持させる。
export class PreClickMortion {
  constructor() {
    this.PreClick = null;
  }
  SetterPreClick(param) {
    this.PreClick = param;
  }
  GetterPreClick() {
    return this.PreClick;
  }
}

///////////////////////////////////////////////////////////////// 
// コンテンツボックスが表示されている場合、履歴表示ボタンクリック時に
// コンテンツボックスを断下げする為に使用。
export class SiteHedderActiveMortion {
  constructor () {
    this.SiteHedderActive = false;
  }

  SetterSiteHedderActive(param) { 
    this.SiteHedderActive = param;
  }
  GetterSiteHedderActive() {
    return this.SiteHedderActive;
  }
}

///////////////////////////////////////////////////////////////// 
// インスタンス生成エリア
  export const SiteHedderActiveM = new SiteHedderActiveMortion(SiteHedderActiveMortion);
  export const PreClickM = new PreClickMortion(PreClickMortion);

///////////////////////////////////////////////////////////////// 
// メインブロックをコントロール。
export class MainBlockControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ContentsRows = this.props.thisKubunList.map((List, index) => {
      return(
        <ContainerContentsBlockControl key={index} Kbn ={List.kbn}/>
      );    
    });

    return(
      <div className="mainBlockControl">
        <div>{ContentsRows}</div>
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////// 
// ルートコンポーネント。画面を開いたときに最初に描画される。
export class ShowContentsArea extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mount:false,
    }
    // メイン画面のCSSファイル解除
    cssFileControl("showCrawlSetting.css", "App.css");
    // クローリングステータスの状態更新をストップさせる
    if (this.props.thisIntervalId != 0) {
      clearInterval(this.props.thisIntervalId);
      this.props.set_sokcet_intervalID(0);
    }
  }

  // HedderMortionAcive(){
  //   this.state.mount ? this.setState({mount:false}) : this.setState({mount:true});
  // }

  render() {
    return (
      <div>
        {/* <OnHedderBox HedderMortionAcive = {(e)=>this.HedderMortionAcive(this.state.mount, e)} mount = {this.state.mount}/> */}
        <ContentsTitleBlock thisKubunList = {this.props.thisKubunList} mount = {this.state.mount}/>
        <MainBlockControl thisKubunList = {this.props.thisKubunList} mount = {this.state.mount}/>
      </div>
    );
  }
}
///////////////////////////////////////////////////////////////// 
// ReactコンポーネントとReduxストアをコネクト
const mapStateToProps = (state) => ({
	thisKubunList: state.componentReducer.thisKubunList.kbns,
  status: state.loginReducer.status,
  thisIntervalId: state.componentReducer.thisIntervalId
});

const mapDispatchToProps = (dispatch) => ({
  set_sokcet_intervalID: int => dispatch(actions.SET_SOCKET_INTERVALID(int)),
});

const ContainerShowContentsArea = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShowContentsArea);

export default ContainerShowContentsArea;
