///////////////////////////////////////////////////////////////// 
// クローリングの設定画面を表示するクラス
///////////////////////////////////////////////////////////////// 
import React from "react";
import { Button, Grid } from "@material-ui/core";
import { connect } from 'react-redux';
import { io } from "socket.io-client";
// コンテンツボックスに表示する記事データとクローリング情報のデータ
import { recentUpdateFileDate } from '../actions/contentsList.js';
import { setUpdateCrawlingList, execCrawling, addNewCrawlingList } from '../actions/crawlingList.js';
import CrawlSettingMaterialTable from '../materialTable/crawlSettingMaterialTable.jsx';
import { KrawlSettingInModal, RegistKrawlSettingInModal } from './showModalWindow.jsx';
import ModalWrapper from './showModalWindow.jsx';
import cssFileControl from '../commonFunc.js';
import { columnsData } from '../actions/materialTableColumns.js';
import * as actions from "../actions/action.js"
// アイコン
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

///////////////////////////////////////////////////////////////// 
// クローリング設定ページを生成する、ルートコンポーネント
///////////////////////////////////////////////////////////////// 
export class ShowCrawlSetting extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      open:false,
      modalIndex:0,
      selectedItem:null,
      selectedCrawling:null,
      recentFileUpdate:"未取得"
    }
    // クローリングステータスの状態更新
    this.startCrawlingStatusInterval();
    // メイン画面のCSSファイル解除
    cssFileControl("App.css", "showCrawlSetting.css");
    // 最終クロール日時
    this.UpdateFileDate();
  }

  ///////////////////////////////////////////////////////////////// 
  // 最終クロール日時
  UpdateFileDate = () => {
    recentUpdateFileDate(1, "mtime") // パラメータ:2は区分リスト
    .then((response) => {
      if(response) {
        this.setState({recentFileUpdate:this.props.mtime});
      } else {
        this.setState({recentFileUpdate:"取得できませんでした"});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  ///////////////////////////////////////////////////////////////// 
  // componentDidMount()
  componentDidMount() {
    // ステータスの背景色指定
    var element = document.getElementById("p-status-data");
    if(this.props.status === "停止") {
      element.style.backgroundColor = "#005FFF";
    } else if(this.props.status === "実行中") {
      element.style.backgroundColor = "#00FF3B";
    } else if(this.props.status === "実行完了") {
      element.style.backgroundColor = "#FF4F02";
    } else if(this.props.status === "エラー") {
      element.style.backgroundColor = "#FF0000";
    }
  }

  ///////////////////////////////////////////////////////////////// 
  // 設定一覧で選択されたコンテンツデータを返す。
  setItem = (item) => {
    var target = this.props.thisContentsArticle.findIndex((v) => v.kbn === item.kbn && v.kiziid === item.kiziid);
    this.setState({selectedItem:this.props.thisContentsArticle[target]});
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
    }

  ///////////////////////////////////////////////////////////////// 
  // CrawlingList.jsのクローリング情報の新規登録処理を呼び出す。
  // jsonオブジェクトのデータも更新する。
  callNewCrawlingList = (item) => { 
    addNewCrawlingList(item)
  }

  ///////////////////////////////////////////////////////////////// 
  // モーダル表示・非表示の設定をフラグ管理する
  modalWrapperFlag = (e) => {
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
  // 全て開始ボタン押下時の処理
  execCrawling = () => {
    var element = document.getElementById("p-status-data");
    var status= this.props.status;
    if(status === "停止" || status === "エラー" || status === "実行完了") {
      // クローリング実行処理呼び出し
      execCrawling()
      .then((response) => {
        // クローリングプログラム実行結果：正常終了
        if(response) {
          this.props.setCrawlingStatus("実行中");
          element.style.backgroundColor = "#00FF3B";
        } else {
        // クローリングプログラム実行結果：異常終了
          this.props.setCrawlingStatus("エラー");
          element.style.backgroundColor = "#FF0000";          
        }
      })
      .catch((error) => {
        // クローリングプログラム実行結果：異常終了
        console.error(error);
        this.props.setCrawlingStatus("エラー");
        element.style.backgroundColor = "#FF0000";
      });
    } else {
      // クローリングプログラムの呼び出しを行わない
      alert("クローリング実行中は無効です。");
    }
  };

  ///////////////////////////////////////////////////////////////// 
  // クローリングステータスの状態更新を20秒間隔で行う
  startCrawlingStatusInterval = () => {
    // クロール実行中のみ処理を行う
    var Id = setInterval(() => {
      this.callUpdateCrawlingStatus()
    }, 20000);
    this.props.set_sokcet_intervalID(Id);
  }

  ///////////////////////////////////////////////////////////////// 
  // クローリングステータスの状態更新をストップさせる
  stopCrawlingStatusInterval = () => {
    if (this.props.thisIntervalId != 0) {
      clearInterval(this.props.thisIntervalId);
      this.props.set_sokcet_intervalID(0);  
    }
  }

  ///////////////////////////////////////////////////////////////// 
  // クローリングステータスの状態更新
  callUpdateCrawlingStatus = () => {
    // HTMLエレメント取得
    var element = document.getElementById("p-status-data");
    // ソケット接続要求
    // var originName = this.props.thisLocation + ":" + this.props.thisPort;
    var originName = this.props.thisLocation;
    console.log(this.props.thisLocation);
    // const socket = io(originName);
    const socket = io.connect();
    // クローリングプログラムの実行ステータスを受信
    socket.on("info", (msg) => {
      // ストアのデータを更新
      switch (msg) {
        case 0:
          this.props.setCrawlingStatus("実行中");
          element.style.backgroundColor = "#00FF3B";
          break;
        case 1:
          this.props.setCrawlingStatus("実行完了");
          element.style.backgroundColor = "#FF4F02";
          this.stopCrawlingStatusInterval();
          break;
        case -1:
          this.props.setCrawlingStatus("エラー");
          element.style.backgroundColor = "#FF0000";
          this.stopCrawlingStatusInterval();
          break;
        case 99:
          this.props.setCrawlingStatus("停止");
          element.style.backgroundColor = "#005FFF";
          break;
        default:
          this.props.setCrawlingStatus("停止");
          element.style.backgroundColor = "#005FFF";
          break;
      }
      // 切断
      socket.close();
    });
  }

  ///////////////////////////////////////////////////////////////// 
  // レンダー
  render() {
    ///////////////////////////////////////////////////////////////// 
    // モーダル表示する画面の種別に対応したjsxを返却
    // (init)0:編集画面 1:新規登録画面
    const setModalJsx = () => {
      if(this.state.modalIndex === 0) {
        return (
          <KrawlSettingInModal 
            modalWrapperFlag={this.modalWrapperFlag}
            open={this.state.open}
            selectedItem={this.state.selectedItem}
            selectedCrawling={this.state.selectedCrawling}
            callUpdateCrawlingList={this.callUpdateCrawlingList}
          />
        );
      } else if(this.state.modalIndex === 1) {
        return (
          <RegistKrawlSettingInModal
            modalWrapperFlag={this.modalWrapperFlag}
            open={this.state.open}
            kbns={this.props.thisKubunList}
            setModalIndex={this.setModalIndex}
            callNewCrawlingList={this.callNewCrawlingList}
          />
        );
      }
    };

    return(
      <div>
        <Grid container spacing={1}>
          <Grid Item xs={4} style={{padding: "0.5em"}}>
            <Button
              id="button-krawlsetting"
              style={{margin:"0.5em", backgroundColor:"#1976d2", color:"#FFF"}}
              size="small"
              variant="contained"
              onClick={()=>{
                this.setModalIndex(1);
                this.modalWrapperFlag();
              }}
              startIcon={<AddCircleIcon/>}
            >サイト登録</Button>
            <Button
              id="button-krawlsetting"
              style={{margin:"0.5em", backgroundColor:"#1976d2", color:"#FFF"}}
              size="small"
              variant="contained"
              onClick={()=>this.execCrawling()}
              startIcon={<ScreenSearchDesktopIcon/>}
            >すべて開始</Button>
            <Button
              id="button-krawlsetting"
              style={{margin:"0.5em", backgroundColor:"#1976d2", color:"#FFF"}}
              size="small"
              variant="contained"
              onClick={()=>this.callUpdateCrawlingStatus()}
              startIcon={<ScreenSearchDesktopIcon/>}
            >再読み込み</Button>
          </Grid>
          <Grid Item id="crawl-status" xs={2} style={{padding: "0.5em", margin:"0.5em"}}>
            <div id="label-reffer-title" style={{fontSize:"10pt", color:"#FFF"}}><p>参照データ</p></div>
            <div id="label-reffer-data" style={{fontSize:"10pt", color:"#FFF"}}><p>&nbsp;{this.props.selectedFileName}</p></div>
          </Grid>
          <Grid Item id="crawl-status" xs={2} style={{padding: "0.5em", margin:"0.5em"}}>
            <div id="label-krawl-title" style={{fontSize:"10pt", color:"#FFF"}}><p>最終クロール日時</p></div>
            <div id="label-krawl-data" style={{fontSize:"10pt", color:"#FFF"}}><p>&nbsp;{this.props.mtime}</p></div>
            <div id="label-status-title" style={{fontSize:"10pt", color:"#FFF"}}><p>クロール状態</p></div>
            <div id="label-status-data" style={{fontSize:"10pt", color:"#FFF"}}><p id="p-status-data">{this.props.status}</p></div>
          </Grid>
        </Grid>
        {/* パラメータの数字1はクローリング設定画面を指す(他の画面と区別する為) */}
        <CrawlSettingMaterialTable
          columns={columnsData(1)} 
          data={this.props.thisContentsArticle}
          actions={1}
          editable={1}
          modalWrapperFlag={this.modalWrapperFlag}
          setItem={this.setItem}
        />
        <ModalWrapper
          modalWrapperFlag={this.modalWrapperFlag}
          open={this.state.open}
          content={setModalJsx()}
        />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////// 
// ReactコンポーネントとReduxストアをコネクト
const mapStateToProps = (state) => ({
  thisContentsArticle: state.componentReducer.thisContents.article,
  thisKubunList: state.componentReducer.thisKubunList.kbns,
  thisCrawlingList: state.componentReducer.thisCrawlingList.crawling,
  selectedFileName: state.componentReducer.selectedFileName,
  status: state.componentReducer.status,
  mtime: state.componentReducer.mtime,
  thisIntervalId: state.componentReducer.thisIntervalId,
  thisPort: state.loginReducer.thisPort,
  thisLocation: state.loginReducer.thisLocation,
});

const mapDispatchToProps = (dispatch) => ({
  setCrawlingStatus: str => dispatch(actions.SET_CRAWLING_STATUS(str)),
  set_sokcet_intervalID: int => dispatch(actions.SET_SOCKET_INTERVALID(int)),
});

const ContainerShowCrawlSetting = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowCrawlSetting);

export default ContainerShowCrawlSetting;