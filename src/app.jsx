import React from 'react';
import LoginUI from './loginUi.jsx';
import ShowContentsArea from './show/showContentsArea.jsx';
import ContainerShowCrawlSetting  from './show/showCrawlSetting.jsx';
import ShowKubunSetting  from './show/showKubunSetting.jsx';
import ResponsiveDrawer from './toolbar/toolbar.jsx';
import ErrorBoundary from './error/errorBoundary.jsx';
import { cssFileDisable } from './commonFunc.js';
import Auth from './auth.jsx';
import { Route, Switch } from 'react-router-dom';
import store from "./store/store.js";
import { Contents } from './index.jsx';
import ContainerInMiddle from './ContainerInMiddle.js';

///////////////////////////////////////////////////////////////// 
// メインコンポーネント
export default class App extends React.Component {
  ///////////////////////////////////////////////////////////////// 
  // componentWillMount()
  componentWillMount() {
    // コンテンツリストオブジェクトを取得
    Contents.getContentsList(store.getState().componentReducer.selectedFileName);
    // ローディングCSSを無効化
    cssFileDisable("loading.css");
    // コンテンツファイル名のリストを取得
    Contents.recentUpdateFileDate(1, "list");
    // コンテンツリスト(最新のもの)最終更新日時を取得。=最終クローリング日時
    Contents.recentUpdateFileDate(1, "mtime");
  }

  ///////////////////////////////////////////////////////////////// 
  // レンダー
  render() {
    return(
      <ErrorBoundary>
        <div className="loading"><span className="circle"></span></div>
        <Switch>
          <Route exact path='/login' component={LoginUI}/>
          <Auth>
            <ResponsiveDrawer/>
            <Route path='/ShowCrawlSetting' component={ContainerShowCrawlSetting}/>
            <Route path='/ShowKubunSetting' component={ShowKubunSetting}/>
            <Route path='/ShowContentsArea' component={ShowContentsArea}/>
          </Auth>
        </Switch>
      </ErrorBoundary>
    );
  }
}