import { INPUT_VALUE } from './types'

const initialState={
    loginId:"",
    password:"",
    isLogin:false,
    email:""
}
const loginReducer=(state=initialState,action)=>{
    switch(action.type){
        case INPUT_VALUE:
            return{
                ...state,
                loginId:action.loginId,
                password:action.password,
                isLogin:action.isLogin,
                email:action.email
            };
        default:
            return state;
    }
}

export default loginReducer;