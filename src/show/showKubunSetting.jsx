///////////////////////////////////////////////////////////////// 
// クローリングの設定画面を表示するクラス
///////////////////////////////////////////////////////////////// 
import React from "react";
import { Button, Grid } from "@material-ui/core";
// import update from 'immutability-helper';
// コンテンツボックスに表示する記事データとクローリング情報のデータ
import { Kbns, Crawlings } from './showContentsArea.jsx';
import { Contents } from '../index.jsx';
import DetailCrawlSettingMaterialTable from '../materialTable/detailCrawlSettingMaterialTable.jsx';
import KubunSettingMaterialTable from '../materialTable/kubunSettingMaterialTable.jsx';
import { KubunSettingInModal, ShortKrawlSettingInModal, RegistKrawlSettingInModal } from './showModalWindow.jsx';
import ModalWrapper from './showModalWindow.jsx';
import cssFileControl from '../commonFunc.js';
import { cssFileDisable } from '../commonFunc.js';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { columnsData } from '../actions/materialTableColumns';

///////////////////////////////////////////////////////////////// 
// 区分設定ページを生成する、ルートコンポーネント
///////////////////////////////////////////////////////////////// 
export default class ShowKubunSetting extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      kbns:Kbns.getKbnList(),
      crawlings:Crawlings.getCrawlingList(),
      selectedCrawling:null,
      selectedItem:null,
      open:false,
      modalIndex:0,
      recentFileUpdate:"未取得",
    }
  }

  ///////////////////////////////////////////////////////////////// 
  // componentWillMount()
  componentWillMount() {
    // メイン画面のCSSファイル解除
    cssFileControl("App.css", "showCrawlSetting.css");
    cssFileDisable("loading.css");
    this.recentKubunUpdateDate();
    this.setState({selectedCrawling:[]})
  }

  ///////////////////////////////////////////////////////////////// 
  // 設定一覧で選択されたコンテンツデータを返す。
  setItem = (item) => {
    this.setState({selectedItem:item});
  };

  ///////////////////////////////////////////////////////////////// 
  // 区分セットテーブルで選択された区分のクロール対象データを返す。
  setSelectedCrawling = (item) => {
    var filter =  this.state.crawlings.crawling.filter((v) => v.kbn == item.kbn);
    var dummyList = [];
    if(filter.length != 0) {
      filter.map((i, index) => {
        let list = {};
        list.kbn = i.kbn
        list.kbnname = i.kbnname
        list.jigyosyaid = i.jigyosyaid
        list.name = i.name
        list.crawlingurl = i.crawlingurl
        list.xpathTitle = i.xpathTitle
        list.xpathLink = i.xpathLink
        list.xpathImage = i.xpathImage
        dummyList.push(list);
      });
    }
    this.setState({selectedCrawling:dummyList})
  };

  ///////////////////////////////////////////////////////////////// 
  // CrawlingList.jsのクローリング情報の更新処理を呼び出す。this.state.selectedItemを更新している。
  // jsonオブジェクトのデータも更新する。
  callUpdateCrawlingList = (
    item,
    changedCrawlingUrl,
    changedCrawlingXpathTitle,
    changedValueCrawlingXpathLink,
    changedValueCrawlingXpathImage) => { 
      Crawlings.setUpdateCrawlingList (
        item,
        changedCrawlingUrl,
        changedCrawlingXpathTitle,
        changedValueCrawlingXpathLink,
        changedValueCrawlingXpathImage
      )
      .then((response) => {
        if (response.flag) {
          // 既存のthis.stateにセット
          var copyCrawlingList = Crawlings.getCrawlingList();
          this.setState({crawlings:copyCrawlingList});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ///////////////////////////////////////////////////////////////// 
  // クローリング情報の新規登録処理を呼び出す。
  // jsonオブジェクトのデータも更新する。
  callNewCrawlingList = (item) => { 
    Crawlings.addNewCrawlingList(item)
    .then((response) => {
      if (response.flag) {
        // 既存のthis.stateにセット
        var copyCrawlingList = Crawlings.getCrawlingList();
        this.setState({crawlings:copyCrawlingList});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  ///////////////////////////////////////////////////////////////// 
  // this.state.crawlingsを更新する
  setStateCrawling = () => {
    var copyCrawlingList = Crawlings.getCrawlingList();
    this.setState({crawlings:copyCrawlingList});
  }

  ///////////////////////////////////////////////////////////////// 
  // 区分情報を新規登録する処理。this.state及びjsonデータも更新する。
  callNewKubunList = (changedValueKubun, changedValueKubunName, changedValueComment) => { 
    // 非同期処理開始
    Kbns.setNewKubunList(changedValueKubun, changedValueKubunName, changedValueComment) // レスポンスはjsonオブジェクト
    .then((response)=> {
      // 区分リストのjsonデータの更新が正常終了した場合、this.stateの区分リストも更新する。
      if(response.flag) {
        var copyKubunList = Kbns.getKbnList();
        this.setState({kbns:copyKubunList});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  ///////////////////////////////////////////////////////////////// 
  // 編集ボタン押下時の処理はkubunSettingMaterialTable.jsx,detailCrawlSettingMaterialTable.jsx

  ///////////////////////////////////////////////////////////////// 
  // 削除ボタン押下時の処理はkubunSettingMaterialTable.jsx,detailCrawlSettingMaterialTable.jsx

  ///////////////////////////////////////////////////////////////// 
  // モーダル表示・非表示の設定をフラグ管理する
  modalWrapperFlag = () => {
    this.state.open ? this.setState({open:false}) : this.setState({open:true});
  };

  ///////////////////////////////////////////////////////////////// 
  // モーダル表示する画面の種別を判定
  // (init)0:編集画面 1:新規登録画面
  setModalIndex = (props) => {
    // パラメータの値をthis.stateにセット
    this.setState({modalIndex:props});
  }

  ///////////////////////////////////////////////////////////////// 
  // 最終更新日時を返す
  recentKubunUpdateDate = () => {
    Contents.recentUpdateFileDate(2, "mtime") // パラメータ:2は区分リスト
    .then((response) => {
      if(response) {
        this.setState({recentFileUpdate:response["mtime"]});
      } else {
        this.setState({recentFileUpdate:"取得できませんでした"});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  ///////////////////////////////////////////////////////////////// 
  // レンダー
  render() {
    ///////////////////////////////////////////////////////////////// 
    // モーダル表示する画面の種別に対応したjsxを返却
    // (init)0:区分セットの区分登録ボタン 1:クロール対象データのデータ登録ボタン 3:クロール対象データの編集ボタン
    const setModalJsx = () => {
      if(this.state.modalIndex === 0) {
        return (
          <KubunSettingInModal 
            modalWrapperFlag={this.modalWrapperFlag}
            open={this.state.open}
            callNewKubunList={this.callNewKubunList}
          />          
        );
      } else if(this.state.modalIndex === 1) {
        return (
          <RegistKrawlSettingInModal
            modalWrapperFlag={this.modalWrapperFlag}
            open={this.state.open}
            kbns={Kbns.getKbnList()}
            setModalIndex={this.setModalIndex}
            callNewCrawlingList={this.callNewCrawlingList}
          />
        );
      } else if(this.state.modalIndex === 2) {
        return (
          <ShortKrawlSettingInModal 
            modalWrapperFlag={this.modalWrapperFlag}
            open={this.state.open}
            selectedItem={this.state.selectedItem}
            setModalIndex={this.setModalIndex}
            callUpdateCrawlingList={this.callUpdateCrawlingList}
          />
        );
      }
    }

    return(
      <div>
        <Grid container spacing={2} justifyContent="flex-start" style={{padding: "0.5em", right: "30%"}}>
          <Grid Item xs={3} style={{padding: "0.5em"}}>
            <Button
              id="button-kubunsetting"
              style={{margin:"0.5em", backgroundColor:"#1976d2", color:"#FFF"}}
              onClick={()=>this.modalWrapperFlag()}
              startIcon={<AddCircleIcon/>}
            >区分登録</Button>
            <Button
              id="button-kubunsetting"
              style={{margin:"0.5em", backgroundColor:"#1976d2", color:"#FFF"}}
              onClick={()=>{
                this.setModalIndex(1);
                this.modalWrapperFlag()
              }}
              startIcon={<AddCircleIcon/>}
            >サイト登録</Button>
          </Grid>
          <Grid Item className="kubun-status" xs={2} justifyContent="flex-end" style={{padding: "0.5em", margin:"0.5em"}} className="top-Box">
            <div className="label-title" style={{fontSize:"10pt", color:"#FFF"}}><p>最終更新日時</p></div>
            <div className="label-data" style={{fontSize:"10pt", color:"#FFF"}}><p>&nbsp;{this.state.recentFileUpdate}</p></div>
          </Grid>
        </Grid>
        <div className="materialTableWrapper">
          {/* パラメータの数字2は区分設定画面の区分セットを指す(他の画面と区別する為) */}
          <KubunSettingMaterialTable
            columns ={columnsData(2)}
            data={this.state.kbns.kbns}
            actions={2}
            editable={2}
            open={this.state.open}
            setSelectedCrawling={this.setSelectedCrawling}
          />
          {/* パラメータの数字3は区分設定画面のクロール対象データセットを指す(他の画面と区別する為) */}
          <DetailCrawlSettingMaterialTable
            columns={columnsData(3)}
            data={this.state.selectedCrawling}
            modalWrapperFlag={this.modalWrapperFlag}
            setModalIndex={this.setModalIndex}
            open={this.state.open}
            setItem={this.setItem}
            setStateCrawling={this.setStateCrawling}
          />
          <ModalWrapper
            modalWrapperFlag={this.modalWrapperFlag}
            open={this.state.open}
            content={setModalJsx()}
          />
        </div>
      </div>
    );
  }
}