import { INPUT_VALUE } from './types'
export const inputValue=({loginId,password,isLogin,email)=>{
    return{
        type:INPUT_VALUE,
        loginId,
        password,
        isLogin,
        email
    }
}