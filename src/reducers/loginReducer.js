////////////////////////////////////////////////////
// レデューサー
////////////////////////////////////////////////////
export const dumb = (state = {}) => state;

////////////////////////////////////////////////////
// ログイン
export const initialState = {
    session:false,
    status:0,    // 0:処理前 1:ログイン成功 -1:ログイン失敗
    user:null
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, session:false, status: 0}
        case "LOGIN_RECEIVE_SUCCESS":
            return { ...state, session:true, status: 1, user:action.user}
        case "LOGIN_RECEIVE_FAILED":
            return { ...state, session:false, status:-1}
        case "LOGOUT":
            console.log("loginReducer called. at case LOGOUT.");
            return { ...state, session:false, status:0}    
        default:
            return state;
    }
};

export default loginReducer;