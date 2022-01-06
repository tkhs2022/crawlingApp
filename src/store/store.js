import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import loginReducer from '../reducers/loginReducer.js';
import componentReducer from '../reducers/componentReducer.js';
import history from '../history.js';

const store = createStore (
	combineReducers({
		router: connectRouter(history),
		loginReducer,
		componentReducer
	}),
	applyMiddleware(
		routerMiddleware(history)
	)
);

export default store;
