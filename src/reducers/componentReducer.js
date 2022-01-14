////////////////////////////////////////////////////
// レデューサー
////////////////////////////////////////////////////
////////////////////////////////////////////////////
// コンポーネントのstate
export const initialState = {
	fileNameList:["contents"],
	selectedFileName:"contents",	// 拡張子は付けない。バックエンドで操作しているため。
	thisContents:null,
	mtime:"未取得",
	status:"停止",
	thisKubunList:null,
	thisCrawlingList:null
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
			return {
				...state,
				status:action.status,
			}

		case "SET_KUBUN_LIST":
			return {
				...state,
				thisKubunList:action.kubunList
			}

		case "SET_CRAWLING_LIST":
			return {
				...state,
				thisCrawlingList:action.crawlingList
			}

		default:
			return state;
	}
};

export default componentReducer;