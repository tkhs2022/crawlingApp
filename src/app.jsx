import React from 'react';
import LoginUI from './loginUi.jsx';
import getContentsList from './actions/contentsList.js';
import { recentUpdateFileDate } from './actions/contentsList.js';
import getKbnList from './actions/kubunList.js';
import getCrawlingList from './actions/crawlingList.js';
import ContainerAuth from './auth.jsx';
import ContainerShowContentsArea from './show/showContentsArea.jsx';
import ContainerShowCrawlSetting  from './show/showCrawlSetting.jsx';
import ContainerShowKubunSetting  from './show/showKubunSetting.jsx';
import ContainerResponsiveDrawer from './toolbar/toolbar.jsx';
import ErrorBoundary from './error/errorBoundary.jsx';
import { Route, Switch } from 'react-router-dom';
import store from "./store/store.js";

///////////////////////////////////////////////////////////////// 
// メインコンポーネント
export default class App extends React.Component {
  constructor (props){
    super(props);
    Promise.resolve()
    .then(getContentsList(store.getState().componentReducer.selectedFileName))
    .then(getKbnList())
    .then(getCrawlingList())
    .then(() => {
      // コンテンツファイル名のリストを取得
      recentUpdateFileDate(1, "list");
      // コンテンツリスト(最新のもの)最終更新日時を取得。=最終クローリング日時
      recentUpdateFileDate(1, "mtime");
    });
  }

  ///////////////////////////////////////////////////////////////// 
  // レンダー
  render() {
    return(
      <ErrorBoundary>
        <div className="loading"><span className="circle"></span></div>
        <Switch>
          <Route exact path='/' component={LoginUI}/>
          <ContainerAuth>
            <ContainerResponsiveDrawer/>
            <Route path='/ShowCrawlSetting' component={ContainerShowCrawlSetting}/>
            <Route path='/ShowKubunSetting' component={ContainerShowKubunSetting}/>
            <Route path='/ShowContentsArea' component={ContainerShowContentsArea}/>
          </ContainerAuth>
        </Switch>
      </ErrorBoundary>
    );
  }
}