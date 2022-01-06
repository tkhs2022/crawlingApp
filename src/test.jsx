import React from 'react';
import { Button } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { connect } from 'react-redux';
import * as actions from "./actions/action.js"

export function Test(props){
    return (
        <div style={{marginLeft:"500px", marginTop:"300px"}}>
            <p>{props.state}</p>
            <Button onClick={()=>props.handleClick("実行中")}>テストボタンです<AddCircleIcon/></Button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    state: state.componentReducer.status
});

const mapDispatchToProps = (dispatch) => ({
    handleClick: str => dispatch(actions.SET_CRAWLING_STATUS(str))
});

const ContainerInMiddle = connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);

export default ContainerInMiddle;
