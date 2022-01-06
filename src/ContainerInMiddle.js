import { connect } from 'react-redux';
import * as actions from "./actions/action.js"
import Test from './test.jsx';

const mapStateToProps = (state) => ({
    www: state.status
});

const mapDispatchToProps = (dispatch) => ({
    handleClick: str => dispatch(actions.SET_CRAWLING_STATUS(str))
});

const ContainerInMiddle = connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);

export default ContainerInMiddle;