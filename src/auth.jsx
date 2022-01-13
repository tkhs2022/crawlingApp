import React from "react";
import { connect } from 'react-redux';

class Auth extends React.Component {
    componentWillMount() {
        this.checkAuth();
    }

    componentWillUpdate() {
        this.checkAuth();        
    }

    // セッションnullの場合、ログイン画面へ遷移
    checkAuth() {
        var status = this.props.status;
        if(status === 0 || status === -1) {
            window.location.href = "/";
        }
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

///////////////////////////////////////////////////////////////// 
// ReactコンポーネントとReduxストアをコネクト
const mapStateToProps = (state) => ({
    status: state.loginReducer.status
  });
  
  const ContainerAuth = connect(
    mapStateToProps,
    null
  )(Auth);
  
  export default ContainerAuth;