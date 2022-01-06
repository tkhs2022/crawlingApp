///////////////////////////////////////////////////////////////// 
// ログインクラス
///////////////////////////////////////////////////////////////// 
import React, { useState } from "react";
import Login from "./actions/action.js";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import store from "./store/store.js";

///////////////////////////////////////////////////////////////// 
// コンポーネント
export function LoginUI(props) {
  const [message, setMessage] = useState("未入力。");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  ///////////////////////////////////////////////////////////////// 
  // ログインボタン押下処理
  const onLogin = (e) => {
    e.preventDefault();
    if(user && password) {
      Login(user, password)
      .then((response) => {
        var list = store.getState();
        if(list.loginReducer.status == -1) {
          setMessage("ユーザー名もしくはパスワードが違います。");
        } else if(list.loginReducer.status == 1) {
          setMessage("ログイン成功");
          props.history.push('/ShowContentsArea');
        }  
      });
    } else {
      setMessage("ユーザー名とパスワードを入力してください。");
    }
  }

    return (
      <div>
        <Paper style={{maxWidth:"30%", margin:"0 auto", marginTop:"15%"}}>
          <div>
            <div style={{ color: "red"}}>
              <p style={{margin:"0 auto", padding:"10px"}}>{message}</p>
            </div>
            <div>
              <TextField
                label="ユーザー"
                style={{width: "80%", margin: 8, fontSize:"midium"}}
                rows={1}
                onChange={(e) => setUser(e.target.value)}
              ></TextField>
            </div>
            <div>
              <TextField
                label="パスワード"
                style={{width: "80%", margin: 8, fontSize:"midium"}}
                rows={1}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </div>
          </div>
          <Grid container style={{fontSize:"midium"}} justifyContent="flex-end" direction="row">
            <Grid item>
              <Button
                style={{margin: "1.5em", fontSize:"midium"}}
                variant="contained"
                color="secondary"
                onClick={(e) => onLogin(e)}
              >
              ログイン
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
}

export default LoginUI;