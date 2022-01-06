import React from "react";
import store from "./store/store.js";

export default class Auth extends React.Component {
    componentWillMount() {
        this.checkAuth();
    }

    componentWillUpdate() {
        this.checkAuth();        
    }

    // セッションnullの場合、ログイン画面へ遷移
    checkAuth() {
        var list = store.getState();
        if(list.loginReducer.status == 0 || list.loginReducer.status == -1) {
            window.location.href = "/login";
        }
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}