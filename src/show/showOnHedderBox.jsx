///////////////////////////////////////////////////////////////// 
//ヘッダーに閲覧履歴ボックスを表示するクラス
// 2021/12/10 廃止
///////////////////////////////////////////////////////////////// 
import React from "react";
import {Link} from 'react-router-dom';
// 履歴リストのデータ
import {CachePageList} from '../data/CachePageList.js';
// ヘッダー部分のスタイル変数
// PreClickM関数は現在どの記事ブロックを表示しているか、記事区分を保持しているPreClickの値をコントロールする
import {PreClickM, SiteHedderActiveM} from '../App.jsx';
import {SiteHedderButtonOriginal, SiteHedderButtonShow} from '../App.jsx';
import {ImageSiteHeaderOriginal, TransitionImageSiteHeaderShow} from '../App.jsx';
import {CacheList, TransitionCacheList} from '../App.jsx';
// コンテンツブロックの表示・非表示アニメーションをコントロールする関数。履歴表示ボタン押下時に機能させる。
import {MoveBlockOnClick} from './showContentsBlock.jsx';
// MoveBlockOnClick関数呼び出し時のパラメータに、自身の関数名を入れる。
import {CaseA} from '../App.jsx';
// ヘッダー部分に表示するアイコン
import {mdiChevronDoubleDown} from '@mdi/js';
import {mdiHamburger} from '@mdi/js';
import Icon from '@mdi/react'
// アイコンにボタン機能を付ける
import {Button} from '@material-ui/core';
// JSXの中でスタイルをアニメーション化させるパッケージ。履歴表示ボタン押下によるアニメーションで使用する。
import {Transition} from 'react-transition-group';
// メディアカードを作成するmaterial-uiのパッケージ。履歴表示の為に使用する。
import {MediaCardForCacheList} from '../card/cardComponent.jsx';

// グローバル。履歴表示の為のデータを格納したクラスのインスタンス生成
const Caches = new CachePageList(CachePageList);

// クラス
export class OnHedderBox extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        Caches:Caches.getcachePageList(),
      }

      this.onClick = this.onClick.bind(this);
    }
  
    onClick() {
      // 前回クリックの有ったタイトルボタンの区分を取得。
      let click = PreClickM.GetterPreClick();

      //履歴表示ボタンのクラス名変更処理
      let ElementSiteHedderButton = document.getElementById("site-hedder-button");
      if (document.getElementsByClassName(SiteHedderButtonOriginal).length > 0) {
        ElementSiteHedderButton.classList.replace(SiteHedderButtonOriginal, SiteHedderButtonShow);
        SiteHedderActiveM.SetterSiteHedderActive(true);
      } else if (document.getElementsByClassName(SiteHedderButtonShow).length > 0) {
        ElementSiteHedderButton.classList.replace(SiteHedderButtonShow, SiteHedderButtonOriginal);
        SiteHedderActiveM.SetterSiteHedderActive(false);
      }
  
      // 親コンポーネントのイベント関数呼び出し。再描画するかフラグ。
      this.props.HedderMortionAcive();
      // コンテンツボックスのアニメーション表示・非表示
      MoveBlockOnClick(click, CaseA);
    }

    // クローリング設定ページへ遷移するタイミングで、PreClickを1に戻す。
    InitialSetup() {
      PreClickM.SetterPreClick(1);
    }

    render() {
      // 履歴表示させる画像とリンクをカードクラスで生成する。
      const Rows = this.state.Caches.map((Cache, index) => {
        return(
            <MediaCardForCacheList key={index} Cache={Cache}/>
        );
      });
  
      return(
          <header id="site-header">
            <Transition in={this.props.mount} timeout={400}>
              {(state) => 
              <div id="image-site-hedder" className={ImageSiteHeaderOriginal} style={TransitionImageSiteHeaderShow[state]}>
                <div>
                  <label>ここに天気予報</label>
                </div>
                <div>
                  <div>ここに何か入れようか。</div>
                  <div id="cache-list-box" className={CacheList} style={TransitionCacheList[state]}>{Rows}</div>
                </div>
                <div>
                  <Button id="site-hedder-button" className={SiteHedderButtonOriginal}>
                    <Icon path={mdiChevronDoubleDown} title="閲覧履歴を表示" onClick={this.onClick} size={1} color="gray"></Icon>
                  </Button>
                </div>
                <div>
                  <Link to="/ShowCrawlSetting">
                    <Button id="hamburger-button" onClick={this.InitialSetup}>
                      <Icon path={mdiHamburger} title="クローリングを設定" size={1} color="gray"></Icon>
                    </Button>
                  </Link>
                  <Link to="/ShowKubunSetting">
                    <Button id="hamburger-button" onClick={this.InitialSetup}>
                      <Icon path={mdiHamburger} title="区分を設定" size={1} color="gray"></Icon>
                    </Button>
                  </Link>
                </div>
              </div>
              }
            </Transition>
          </header>
      );
    }
  }

export default OnHedderBox;