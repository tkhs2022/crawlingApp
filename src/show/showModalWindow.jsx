///////////////////////////////////////////////////////////////// 
// モーダル画面を表示させるためのラッパークラス
///////////////////////////////////////////////////////////////// 
import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// クローリング詳細設定のモーダル画面で使用するボタンアイコン
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

///////////////////////////////////////////////////////////////// 
// モーダル表示させるためのラッパークラス
export default function ModalWrapper(props) {
  return(
    <Modal
      open={props.open}
      onClose={(e) => props.modalWrapperFlag(e, false)}
      style={{top: "5%", width: "50%", left: "20%", height:"70%"}}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      onRequestClose={(e) => props.modalWrapperFlag(e, false)}
    >
      {props.content}
    </Modal>
  );
}

///////////////////////////////////////////////////////////////// 
// 実行結果画面。クローリング設定詳細画面(モーダル表示する)
export function KrawlSettingInModal(props) {
    const [changedValueCrawlingUrl, setValueCrawlingUrl] = useState(props.selectedCrawling.crawlingurl);
    const [changedValueCrawlingXpathTitle, setValueCrawlingXpathTitle] = useState(props.selectedCrawling.xpathTitle);
    const [changedValueCrawlingXpathLink, setValueCrawlingXpathLink] = useState(props.selectedCrawling.xpathLink);
    const [changedValueCrawlingXpathImage, setValueCrawlingXpathImage] = useState(props.selectedCrawling.xpathImage);

    // Modalは非表示の状態でもレンダリング処理が入る為、openフラグがtrueの時にのみ表示する
    // クローリング情報を更新。タイミング:クローリング情報画面にて、updateボタンを押下した時
    const onClick = (e) => {
      if (e == true) {
        props.callUpdateCrawlingList(
          props.selectedCrawling,
          changedValueCrawlingUrl,
          changedValueCrawlingXpathTitle,
          changedValueCrawlingXpathLink,
          changedValueCrawlingXpathImage
        )
      } else {
        // CLOSEボタン押下処理
        props.modalWrapperFlag(e);
      }
    };
  
    return(
      <Fade in={props.open}>
        <Paper className={"modalActive"}>
          <Typography style={{padding: "0.5em"}}>
            <div style={{margin: 8}}>
              <label style={{fontSize:"12", fontWeight:"bold"}}>クロール設定詳細</label>
            </div>
            <div>
              <TextField
                label="区分"
                defaultValue={props.selectedItem.kbn}                
                style={{width: "10%", margin: 8, fontSize:"midium"}}
                rows={1}
                disabled="false"
              ></TextField>
              <TextField
                label="区分名称"
                defaultValue={props.selectedItem.kbnname}                
                style={{width: "20%", margin: 8, fontSize:"midium"}}
                rows={1}
                disabled="false"
              ></TextField>
              <TextField
                  label="サイトID"
                  defaultValue={props.selectedItem.jigyosyaid}                
                  style={{width: "10%", margin: 8, fontSize:"midium"}}
                  rows={1}
                  disabled="false"
                ></TextField>
                <TextField
                  label="サイト名称"
                  defaultValue={props.selectedItem.name}                
                  style={{width: "20%", margin: 8, fontSize:"midium"}}
                  rows={1}
                  disabled="false"
                ></TextField>
              <TextField
                  label="記事ID"
                  defaultValue={props.selectedItem.kiziid}                
                  style={{width: "21.5%", margin: 8, fontSize:"midium"}}
                  rows={1}
                  disabled="false"
                ></TextField>
            </div>
            <div>
              <TextField
                    label="記事タイトル"
                    defaultValue={props.selectedItem.title}
                    style={{ width: "90%", margin: 8, fontSize:"midium"}}
                    fullWidth  
                    rows={1}
                    disabled="false"
              ></TextField>
            </div>
            <div>
              <TextField
                label="リンク"
                defaultValue={props.selectedItem.source}
                style={{ width: "90%", margin: 8, fontSize:"midium"}}
                fullWidth
                rows={1}
                disabled="false"
              />
            </div>
            <div>
              <TextField
                label="イメージファイル"
                defaultValue={props.selectedItem.image}
                style={{ width: "90%", margin: 8, fontSize:"midium"}}
                fullWidth
                rows={1}
                disabled="false"
              />
            </div>
            <div>
              <TextField
                label="サイトのURL"
                defaultValue={props.selectedCrawling.crawlingurl}
                style={{ width: "90%", margin: 8, fontSize:"midium"}}
                fullWidth
                rows={1}
                onChange={(e)=> setValueCrawlingUrl(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="タイトルのXpath"
                defaultValue={props.selectedCrawling.xpathTitle}
                style={{ width: "90%", margin: 8, fontSize:"midium"}}
                fullWidth
                rows={1}
                onChange={(e)=> setValueCrawlingXpathTitle(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="リンクのXpath"
                defaultValue={props.selectedCrawling.xpathLink}
                style={{ width: "90%", margin: 8, fontSize:"midium"}}
                fullWidth
                rows={1}
                onChange={(e)=> setValueCrawlingXpathLink(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="イメージファイルのXpath"
                defaultValue={props.selectedCrawling.xpathImage}
                style={{ width: "90%", margin: 8, fontSize:"midium"}}
                fullWidth
                rows={1}
                onChange={(e)=> setValueCrawlingXpathImage(e.target.value)}
              />
            </div>
          </Typography>
          <Grid container style={{fontSize:"midium"}} justify="flex-end" direction="row">
            <Grid item>
              <Button
                style={{margin: "1.5em", fontSize:"midium"}}
                variant="contained"
                color="secondary"
                onClick={(e)=>onClick(true, e)}
                startIcon={<AddCircleIcon/>}
              >
              更新
              </Button>
              <Button
                style={{margin: "1.5em", fontSize:"midium"}}
                variant="contained"
                color="secondary"
                onClick={(e)=>onClick(false, e)}
                startIcon={<CancelIcon/>}
              >
              閉じる
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    );
  }

///////////////////////////////////////////////////////////////// 
// 区分設定画面。クローリング設定詳細画面(モーダル表示する)
export function ShortKrawlSettingInModal(props) {
  const [changedValueCrawlingUrl, setValueCrawlingUrl] = useState(props.selectedItem.crawlingurl);
  const [changedValueCrawlingXpathTitle, setValueCrawlingXpathTitle] = useState(props.selectedItem.xpathTitle);
  const [changedValueCrawlingXpathLink, setValueCrawlingXpathLink] = useState(props.selectedItem.xpathLink);
  const [changedValueCrawlingXpathImage, setValueCrawlingXpathImage] = useState(props.selectedItem.xpathImage);

  // Modalは非表示の状態でもレンダリング処理が入る為、openフラグがtrueの時にのみ表示する
  // クローリング情報を更新。タイミング:クローリング情報画面にて、updateボタンを押下した時
  const onClick = (e) => {
    if (e == true) {
      props.callUpdateCrawlingList(
        props.selectedItem,
        changedValueCrawlingUrl,
        changedValueCrawlingXpathTitle,
        changedValueCrawlingXpathLink,
        changedValueCrawlingXpathImage
      )
    } else {
      // CLOSEボタン押下処理
      props.setModalIndex(0);
      props.modalWrapperFlag(e);
    }
  };

  return(
    <Fade in={props.open}>
      <Paper className={"modalActive"}>
        <Typography style={{padding: "0.5em"}}>
          <div style={{margin: 8}}>
            <label style={{fontSize:"12", fontWeight:"bold"}}>クロール設定詳細</label>
          </div>
          <div>
            <TextField
              label="区分"
              defaultValue={props.selectedItem.kbn}                
              style={{width: "10%", margin: 8, fontSize:"midium"}}
              rows={1}
              disabled="false"
            ></TextField>
            <TextField
              label="区分名称"
              defaultValue={props.selectedItem.kbnname}                
              style={{width: "20%",　margin: 8, fontSize:"midium"}}
              rows={1}
              disabled="false"
            ></TextField>
            <TextField
                label="サイトID"
                defaultValue={props.selectedItem.jigyosyaid}                
                style={{width: "10%", margin: 8, fontSize:"midium"}}
                rows={1}
                disabled="false"                
              ></TextField>
              <TextField
                label="サイト名称"
                defaultValue={props.selectedItem.name}                
                style={{width: "20%", margin: 8, fontSize:"midium"}}
                rows={1}
                disabled="false"
              ></TextField>
          </div>
          <div>
            <TextField
              label="サイトのURL"
              defaultValue={props.selectedItem.crawlingurl}
              style={{ width: "90%", margin: 8, fontSize:"midium"}}
              fullWidth
              rows={1}
              onChange={(e)=> setValueCrawlingUrl(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="タイトルのXpath"
              defaultValue={props.selectedItem.xpathTitle}
              style={{ width: "90%", margin: 8, fontSize:"midium"}}
              fullWidth
              rows={1}
              onChange={(e)=> setValueCrawlingXpathTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="リンクのXpath"
              defaultValue={props.selectedItem.xpathLink}
              style={{ width: "90%", margin: 8, fontSize:"midium"}}
              fullWidth
              rows={1}
              onChange={(e)=> setValueCrawlingXpathLink(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="イメージファイルのXpath"
              defaultValue={props.selectedItem.xpathImage}
              style={{ width: "90%", margin: 8, fontSize:"midium"}}
              fullWidth
              rows={1}
              onChange={(e)=> setValueCrawlingXpathImage(e.target.value)}
            />
          </div>
        </Typography>
        <Grid container style={{fontSize:"midium"}} justify="flex-end" direction="row">
          <Grid item>
            <Button
              style={{margin: "1.5em", fontSize:"midium"}}
              variant="contained"
              color="secondary"
              onClick={(e)=>onClick(true, e)}
              startIcon={<AddCircleIcon/>}
            >
            更新
            </Button>
            <Button
              style={{margin: "1.5em", fontSize:"midium"}}
              variant="contained"
              color="secondary"
              onClick={(e)=>onClick(false, e)}
              startIcon={<CancelIcon/>}
            >
            閉じる
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
}

///////////////////////////////////////////////////////////////// 
// クローリング設定を新規登録する画面(モーダル表示する)
export function RegistKrawlSettingInModal(props) {
  const [changedValueKubun, setValueKubun] = useState("");
  const [changedValueKubunName, setValueKubunName] = useState("区分名称");
  const [changedValueJigyosyaid, setValueJigyosyaid] = useState("");
  const [changedValueName, setValueName] = useState("");
  const [changedValueCrawlingUrl, setValueCrawlingUrl] = useState("");
  const [changedValueCrawlingXpathTitle, setValueCrawlingXpathTitle] = useState("");
  const [changedValueCrawlingXpathLink, setValueCrawlingXpathLink] = useState("");
  const [changedValueCrawlingXpathImage, setValueCrawlingXpathImage] = useState("");

  const kbns = props.kbns;

  ///////////////////////////////////////////////////////////////// 
  // 区分セレクトボックスで選択した区分の名称を、区分名称欄に自動入力する処理
  const callSetKbnNameLabel = (targetValue) => {
    var index = kbns["kbns"].findIndex((v) => v.kbn === targetValue);

    if(index != -1) {
      var label = kbns["kbns"][index].kbnname;
      setValueKubunName(label);
      setValueKubun(targetValue);
    }
  };

  // Modalは非表示の状態でもレンダリング処理が入る為、openフラグがtrueの時にのみ表示する
  // クローリング情報を更新。タイミング:クローリング情報画面にて、updateボタンを押下した時
  const onClick = (e) => {
    if (e == true) {
      var paramObj = {};
      paramObj["kbn"] = changedValueKubun;
      paramObj["kbnname"] = changedValueKubunName;
      paramObj["jigyosyaid"] = changedValueJigyosyaid;
      paramObj["name"] = changedValueName;
      paramObj["crawlingurl"] = changedValueCrawlingUrl;
      paramObj["xpathTitle"] = changedValueCrawlingXpathTitle;
      paramObj["xpathLink"] = changedValueCrawlingXpathLink;
      paramObj["xpathImage"] = changedValueCrawlingXpathImage;

      // 親コンポーネントのメソッド呼び出し
      props.callNewCrawlingList(paramObj);

    } else {
      // CLOSEボタン押下処理
      props.setModalIndex(0);
      props.modalWrapperFlag(e);
    }
  };

  return(
    <Fade in={props.open}>
      <Paper className={"modalActive"}>
        <Typography style={{padding: "0.5em"}}>
          <div style={{margin: 8}}>
            <label style={{fontSize:"12", fontWeight:"bold"}}>クロール設定登録</label>
          </div>
          <div>
            <FormControl id="select-paperDiv">
              <InputLabel id="select-paperDiv-label">区分</InputLabel>
              <Select
                labelId="select-paperDiv-label"
                className="select-paperDiv"
                value={changedValueKubun}
                style={{width: "100%", margin: 8, fontSize:"midium"}}
                onChange={(e)=> callSetKbnNameLabel(e.target.value)}
              >
                {props.kbns["kbns"].map((item, key) => {
                  return(
                    <MenuItem value={item.kbn} key={key}>{item.kbn}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              // label="区分名称"
              label={changedValueKubunName}
              style={{width: "20%",　margin: 8, fontSize:"midium"}}
              rows={1}
              disabled="false"
            ></TextField>
            <TextField
                label="事業者ID"
                defaultValue={changedValueJigyosyaid}
                style={{width: "10%", margin: 8, fontSize:"midium"}}
                rows={1}
                onChange={(e)=> setValueJigyosyaid(e.target.value)}
            ></TextField>
            <TextField
              label="事業者名"
              defaultValue={changedValueName}
              style={{width: "20%", margin: 8, fontSize:"midium"}}
              rows={1}
              onChange={(e)=> setValueName(e.target.value)}
            ></TextField>
          </div>
          <div>
            <TextField
              label="サイトのURL"
              defaultValue={changedValueCrawlingUrl}
              style={{ width: "90%", margin: 8, fontSize:"midium"}}
              fullWidth
              rows={1}
              onChange={(e)=> setValueCrawlingUrl(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="タイトルのXpath"
              defaultValue={changedValueCrawlingXpathTitle}
              style={{ width: "90%", margin: 8, fontSize:"midium"}}
              fullWidth
              rows={1}
              onChange={(e)=> setValueCrawlingXpathTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="リンクのXpath"
              defaultValue={changedValueCrawlingXpathLink}
              style={{ width: "90%", margin: 8, fontSize:"midium"}}
              fullWidth
              rows={1}
              onChange={(e)=> setValueCrawlingXpathLink(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="イメージファイルのXpath"
              defaultValue={changedValueCrawlingXpathImage}
              style={{ width: "90%", margin: 8, fontSize:"midium"}}
              fullWidth
              rows={1}
              onChange={(e)=> setValueCrawlingXpathImage(e.target.value)}
            />
          </div>
        </Typography>
        <Grid container style={{fontSize:"midium"}} justify="flex-end" direction="row">
          <Grid item>
            <Button
              style={{margin: "1.5em", fontSize:"midium"}}
              variant="contained"
              color="secondary"
              onClick={(e)=>onClick(true)}
              startIcon={<AddCircleIcon/>}
            >
            登録
            </Button>
            <Button
              style={{margin: "1.5em", fontSize:"midium"}}
              variant="contained"
              color="secondary"
              onClick={(e)=>onClick(false)}
              startIcon={<CancelIcon/>}
            >
            閉じる
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
}

///////////////////////////////////////////////////////////////// 
// 区分設定を新規登録する画面(モーダル表示する)
export function KubunSettingInModal(props) {
  const [changedValueKubun, setValueKubun] = useState("");
  const [changedValueKubunName, setValueKubunName] = useState("");
  const [changedValueComment, setValueComment] = useState("");

  // Modalは非表示の状態でもレンダリング処理が入る為、openフラグがtrueの時にのみ表示する
  // 区分情報を新たに登録。タイミング:クローリング情報画面にて、updateボタンを押下した時
  const onClick = (e) => {
    if (e == true) {
      if(changedValueKubun != "" && changedValueKubunName != "" && changedValueComment != "") {
        // 親コンポーネントの区分リスト新規登録処理を呼び出す
        props.callNewKubunList(
          changedValueKubun,
          changedValueKubunName,
          changedValueComment,
        )
      } else {
        alert("全ての項目を入力してください!");
      }
    } else {
      // CLOSEボタン押下処理
      props.modalWrapperFlag(e);
    }
  };

  return(
    <Fade in={props.open}>
      <Paper className={"modalActive"}>
        <Typography style={{padding: "0.5em"}}>
          <div style={{margin: 8}}>
            <label style={{fontSize:"12", fontWeight:"bold"}}>区分設定登録</label>
          </div>
          <div>
            <TextField
              label="区分"
              defaultValue={changedValueKubun}
              style={{width: "10%", margin: 8, fontSize:"midium"}}
              rows={1}
              onChange={(e)=> setValueKubun(e.target.value)}
            ></TextField>
            <TextField
              label="区分名称"
              defaultValue={changedValueKubunName}
              style={{width: "20%",　margin: 8, fontSize:"midium"}}
              rows={1}
              onChange={(e)=> setValueKubunName(e.target.value)}
            ></TextField>
            <TextField
                label="コメント"
                defaultValue={changedValueComment}
                style={{width: "50%", margin: 8, fontSize:"midium"}}
                rows={1}
                onChange={(e)=> setValueComment(e.target.value)}
            ></TextField>
          </div>
        </Typography>
        <Grid container style={{fontSize:"midium"}} justify="flex-end" direction="row">
          <Grid item>
            <Button
              style={{margin: "1.5em", fontSize:"midium"}}
              variant="contained"
              color="secondary"
              onClick={(e)=>onClick(true, e)}
              startIcon={<AddCircleIcon/>}
            >
            登録
            </Button>
            <Button
              style={{margin: "1.5em", fontSize:"midium"}}
              variant="contained"
              color="secondary"
              onClick={(e)=>onClick(false, e)}
              startIcon={<CancelIcon/>}
            >
            閉じる
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
}