////////////////////////////////////////////////////
// レデューサー
////////////////////////////////////////////////////
import { push } from 'connected-react-router';

////////////////////////////////////////////////////
// コンポーネントのstate
export const dumb = (state = {}) => state;
export const initialState = {
	fileNameList:[],
	selectedFileName:"contents.json",
	thisContents:null,
	mtime:"未取得",
	status:"停止"
};

export const componentReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_FILENAME_LIST":
			return {
				...state,
				fileNameList:action.fileNameList
			}

		case "SET_MTIME":
			return {
				...state,
				mtime:action.mtime
			}
	
		case "SET_SELECTED_FILENAME":
			return {
				...state,
				selectedFileName:action.fileName,
				thisContents:action.contentsList
			}

		case "SET_CRAWLING_STATUS":
			console.log(new Date() + "componentReduser.SET_CRAWLING_STATUS called.");
			console.log(action.status);
			return {
				...state,
				status:action.status,
			}

		default:
			return state;
	}
};


export default componentReducer;