/**
 * Created by haita on 2017/12/14 0014.
 */
import axios from 'axios';
const initialState = {
    isAuth:false,
    user:"",
    pwd:"",
    repeatPwd:"",
    type:"",
    msg:""
};
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
//reducer
export function user (state = initialState,action) {
    switch (action.type){
        case REGISTER_SUCCESS:
            return {...state,msg:'',isAuth:true,...action.payload};
        case ERROR_MSG:
            return {...state,msg:"",isAuth:false,msg:action.msg};
        default:
            return state;
    }
}


//action creater:
function errorMsg(msg) {
    return {
        msg:msg,
        type:ERROR_MSG
    }
}
function registerSuccess(data) {
    return {
        type:REGISTER_SUCCESS,
        payload:data
    }
}


export function register ({user,pwd,repeatPwd,type}) {
    if(!user || !pwd || !type){
        return errorMsg('用户名或密码不能为空');
    }else if(pwd !== repeatPwd){
        return errorMsg('两次输入的密码不一致');
    }
    return dispatch=>{
        axios.post('/users/register',{
            user,pwd,type
        }).then(res=>{
            if(res.status === 200){
                if(res.data.code === 1){
                    dispatch(registerSuccess({user,pwd,repeatPwd}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        })
    }

}