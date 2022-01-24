///////////////////////////////////////////////////////////////// 
// クローリングの設定画面を表示するクラス
///////////////////////////////////////////////////////////////// 
import React from "react";
import { Button, Grid } from "@material-ui/core";
// コンテンツボックスに表示する記事データとクローリング情報のデータ
import { setNewKubunList } from '../actions/kubunList.js';
import { recentUpdateFileDate } from '../actions/contentsList.js';
import { setUpdateCrawlingList, addNewCrawlingList } from '../actions/crawlingList.js';
import DetailCrawlSettingMaterialTable from '../materialTable/detailCrawlSettingMaterialTable.jsx';
import KubunSettingMaterialTable from '../materialTable/kubunSettingMaterialTable.jsx';
import { KubunSettingInModal, ShortKrawlSettingInModal, RegistKrawlSettingInModal } from './showModalWindow.jsx';
import ModalWrapper from './showModalWindow.jsx';
import cssFileControl from '../commonFunc.js';
import { columnsData } from '../actions/materialTableColumns';
import { connect } from 'react-redux';
import * as actions from "../actions/action.js"
// アイコン
import AddCircleIcon from '@material-ui/icons/AddCircle';
///////////////////////////////////////////////////////////////// 
// 区分設定ページを生成する、ルートコンポーネント
///////////////////////////////////////////////////////////////// 
class ShowKubunSetting extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      kbns:this.props.thisKubunList,
      selectedCrawling:[],
      selectedItem:null,
      open:false,
      modalIndex:0,
      recentFileUpdate:"未取得",
    }
    // メイン画面のCSSファイル解除
    cssFileControl("App.css", "showCrawlSetting.css");
    // 区分セットの最終更新日時を取得
    this.recentKubunUpdateDate();
    // クローリングステータスの状態更新をストップさせる
    if (this.props.thisIntervalId != 0) {
      clearInterval(this.props.thisIntervalId);
      this.props.set_sokcet_intervalID(0);
    }
  }

  ///////////////////////////////////////////////////////////////// 
  // 設定一覧で選択されたコンテンツデータを返す。
  setItem = (item) => {
    this.setState({selectedItem:item});
  };

  ///////////////////////////////////////////////////////////////// 
  // 区分セットテーブルで選択された区分のクロール対象データを返す。
  setSelectedCrawling = (item) => {
    var filter = this.props.thisCrawlingList.filter((v) => v.kbn === item.kbn);
    var dummyList = [];
    if(filter.length !== 0) {
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
      setUpdateCrawlingList (
        item,
        changedCrawlingUrl,
        changedCrawlingXpathTitle,
        changedValueCrawlingXpathLink,
        changedValueCrawlingXpathImage
      )
      .then((response) => {
        if (response.flag) {
          this.setSelectedCrawling(item);  // クロール対象データセット更新
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
    addNewCrawlingList(item)
    .then(()=>{
      this.setSelectedCrawling(item);  // クロール対象データセット更新
    })
    .catch((error) => {
      console.error(error);
    });
  }

  ///////////////////////////////////////////////////////////////// 
  // 区分情報を新規登録する処理。setNewKubunListメソッドの中でstoreのデータも更新している。
  callNewKubunList = (changedValueKubun, changedValueKubunName, changedValueComment) => { 
    setNewKubunList(changedValueKubun, changedValueKubunName, changedValueComment)
    .then(()=>{
      this.setStateKbns();  // 区分データセット更新
    })
    .catch((error) => {
      console.error(error);
    })
  }

  ///////////////////////////////////////////////////////////////// 
  // 区分セットテーブルで選択された区分のクロール対象データを返す。
  setSelectedCrawling = (item) => {
    var filter =  this.props.thisCrawlingList.filter((v) => v.kbn == item.kbn);
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
    this.setState({selectedCrawling:dummyList});
  };

  ///////////////////////////////////////////////////////////////// 
  // 区分データセット更新
  setStateKbns = () => {
    this.setState({kbns:this.props.thisKubunList});
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
    recentUpdateFileDate(2, "mtime") // パラメータ:2は区分リスト
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
            kbns={this.state.kbns}
            callNewKubunList={this.callNewKubunList}
          />          
        );
      } else if(this.state.modalIndex === 1) {
        return (
          <RegistKrawlSettingInModal
            modalWrapperFlag={this.modalWrapperFlag}
            open={this.state.open}
            kbns={this.state.kbns}
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
              size="small"
              onClick={()=>this.modalWrapperFlag()}
              startIcon={<AddCircleIcon/>}
            >区分登録</Button>
            <Button
              id="button-kubunsetting"
              style={{margin:"0.5em", backgroundColor:"#1976d2", color:"#FFF"}}
              size="small"
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
            data={this.state.kbns}
            actions={2}
            editable={2}
            open={this.state.open}
            setSelectedCrawling={this.setSelectedCrawling}
            setStateKbns={this.setStateKbns}
          />
          {/* パラメータの数字3は区分設定画面のクロール対象データセットを指す(他の画面と区別する為) */}
          <DetailCrawlSettingMaterialTable
            columns={columnsData(3)}
            data={this.state.selectedCrawling}
            modalWrapperFlag={this.modalWrapperFlag}
            setModalIndex={this.setModalIndex}
            open={this.state.open}
            setItem={this.setItem}
            setSelectedCrawling={this.setSelectedCrawling}
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

///////////////////////////////////////////////////////////////// 
// ReactコンポーネントとReduxストアをコネクト
const mapStateToProps = (state) => ({
	thisKubunList: state.componentReducer.thisKubunList.kbns,
  thisCrawlingList: state.componentReducer.thisCrawlingList.crawling,
  thisIntervalId: state.componentReducer.thisIntervalId
});

const mapDispatchToProps = (dispatch) => ({
  set_sokcet_intervalID: int => dispatch(actions.SET_SOCKET_INTERVALID(int))
});

const ContainerShowKubunSetting = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShowKubunSetting);

export default ContainerShowKubunSetting;