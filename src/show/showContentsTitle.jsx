///////////////////////////////////////////////////////////////// 
// コンテンツのタイトルを表示するクラス
///////////////////////////////////////////////////////////////// 
import React from "react";
// コンテンツタイトル部分に表示するアイコン
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
// アイコンにボタン機能を付ける
import {Button} from '@material-ui/core';
import Typography from '@mui/material/Typography';
// コンテンツタイトル部分のスタイル変数
import {PreClickM} from './showContentsArea.jsx';
import {ContentsTitleOriginal, TransitionContentsTitleShow} from './showContentsArea.jsx';
import {ContentTitleUnderBorderOriginal, ContentTitleUnderBorderShow, ContentTitleUnderBorderHide} from './showContentsArea.jsx';
// コンテンツブロックの表示・非表示アニメーションをコントロールする関数。履歴表示ボタン押下時に機能させる。
import {MoveBlockOnClick} from './showContentsBlock.jsx';
// MoveBlockOnClick関数呼び出し時のパラメータに、自身の関数名を入れる。
import {CaseB} from './showContentsArea.jsx';
// JSXの中でスタイルをアニメーション化させるパッケージ。履歴表示ボタン押下によるアニメーションで使用する。
import {Transition} from 'react-transition-group';

///////////////////////////////////////////////////////////////// 
// コンテンツタイトルのボタンとクリックイベント。クリックイベントで、
// コンテンツタイトルのボックスに下線を引く。
export class ContentsTitleButtonWithBorder extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex:null
    }
  }

  onClick(e) {
    // 区分毎のボタンからクリックされた区分を、ボタンのselectedプロパティにに登録する
    this.setState({selectedIndex:e});
    // 前回クリックの有ったタイトルボタンの区分を取得。
    let click = PreClickM.GetterPreClick();
    // 前回ボタンクリックのあったコンテンツタイトルについて、下線が表示してあれば非表示
    if (click != null && click != undefined && click != e) {
      let ElementPreClick = document.getElementById("border-" + click);
      let CheckElementPreClick = ElementPreClick.getAttribute("class");
      switch (CheckElementPreClick) {
        case ContentTitleUnderBorderShow:
          ElementPreClick.classList.replace(ContentTitleUnderBorderShow,ContentTitleUnderBorderHide);
          // 表示していたコンテンツブロックを隠す
          MoveBlockOnClick(click, CaseB);
          break;
        case ContentTitleUnderBorderHide:
          break;
        default:
          ElementPreClick.setAttribute("class",ContentTitleUnderBorderOriginal);
          break;
      }
    }
    // 今回ボタンクリックのあったコンテンツタイトルを取得
    let ElementThisClick = document.getElementById("border-" + e);
    let CheckElementThisClick = ElementThisClick.getAttribute("class");
    //  今回ボタンクリックのあったコンテンツタイトルの下線を表示・非表示にする
    switch (CheckElementThisClick) {
      case ContentTitleUnderBorderShow:
        ElementThisClick.classList.replace(ContentTitleUnderBorderShow,ContentTitleUnderBorderHide);
        break;
      case ContentTitleUnderBorderHide:
        ElementThisClick.classList.replace(ContentTitleUnderBorderHide,ContentTitleUnderBorderShow);
        break;
      case ContentTitleUnderBorderOriginal:
        ElementThisClick.classList.replace(ContentTitleUnderBorderOriginal,ContentTitleUnderBorderShow);
        break;
      default:
        ElementThisClick.setAttribute("class",ContentTitleUnderBorderOriginal);
        break;
    }
    // コンテンツボックスのアニメーション表示・非表示
    MoveBlockOnClick(e, CaseB);
    // 今回のボタンクリックのあった区分を保存
    PreClickM.SetterPreClick(e);
  }

  render() {
    return(
      <div>
        <div>
          <Button
            className="contents-title-button"
            selected={this.state.selectedIndex === this.props.index} 
            onClick={(e) => this.onClick(this.props.Kbn, e)}>
            <DoubleArrowIcon title={this.props.name} style={{color:"#FFF"}}/>
          </Button>
        </div>
        {// デフォルトでは区分1のコンテンツブロックを表示
        this.props.Kbn == 1 ? <div id={"border-" + this.props.Kbn} className= {ContentTitleUnderBorderShow}/> : <div id={"border-" + this.props.Kbn} className= {ContentTitleUnderBorderOriginal}/>}
      </div>
    );  
  }
}

///////////////////////////////////////////////////////////////// 
// コンテンツタイトルブロック。タイトル毎にボタンを配置するコンポー
// ネントを呼び出す。
export const ContentsTitleBlock = (props) => {

  const NaviBar = props.Kbns.kbns.map((Kbns,index) => {
    return (
      <Typography key={index} variant="h6" noWrap className="name-title">
        <label>{Kbns.kbnname}</label>
        <ContentsTitleButtonWithBorder Kbn={Kbns.kbn} index={index}/>
      </Typography>
    );
  });

  return( 
    <Transition in={props.mount} timeout={400}>
      {(state) => 
      <div id="contents-title" className={ContentsTitleOriginal} style={TransitionContentsTitleShow[state]}>
        {NaviBar}
      </div>
      }
    </Transition>
  );
}

export default ContentsTitleBlock;