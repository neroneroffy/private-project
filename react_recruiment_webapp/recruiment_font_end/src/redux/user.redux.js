/**
 * Created by haita on 2017/12/14 0014.
 */
import axios from 'axios';
import {getRedirectToUrl} from '../util/util';
import { Toast } from 'antd-mobile'
const initialState = {
    redirectTo:"",
    isAuth:false,
    user:"",
    pwd:"",
    repeatPwd:"",
    type:"",
    msg:""
};
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";
//reducer
export function user (state = initialState,action) {

    switch (action.type){
        case REGISTER_SUCCESS://根据返回来的信息，给state赋值
            return {...state,msg:'',redirectTo:getRedirectToUrl(action.payload),isAuth:true,...action.payload};
        case LOGIN_SUCCESS://根据返回来的信息，给state赋值
            return {...state,msg:'',redirectTo:getRedirectToUrl(action.payload),isAuth:true,...action.payload};
        case LOAD_DATA:
            return {...state,...action.payload};
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
function loginSuccess(data) {
    return {
        type:LOGIN_SUCCESS,
        payload:data
    }
}
function loadData(data){
    return {
        type:LOAD_DATA,
        payload:data
    }
}
//注册
export function register ({user,pwd,repeatPwd,type}) {
    if(!user || !pwd || !type){
        Toast.info('用户名或密码不能为空', 1);
        return errorMsg('用户名或密码不能为空');

    }else if(pwd !== repeatPwd){
        Toast.info('两次输入的密码不一致', 1);
        return errorMsg('两次输入的密码不一致');
    }
    return dispatch=>{
        axios.post('/users/register',{
            user,pwd,type
        }).then(res=>{
            if(res.status === 200){
                if(res.data.code === 0){
                    dispatch(registerSuccess({user,pwd,type}))
                }else{
                    if(res.data.msg){
                        Toast.info(res.data.msg, 1);
                    }
                    dispatch(errorMsg(res.data.msg))
                }
            }
        })
    }

}


//登录
export function login({user,pwd}) {
    if(!user || !pwd){
        Toast.info('用户名或密码不能为空', 1);
        return errorMsg('用户名或密码不能为空');
    }
    return dispatch=>{
        axios.post('/users/login',{
            user,pwd
        }).then(res=>{
            if(res.status === 200){
                if(res.data.code === 0){
                    dispatch(loginSuccess({user,pwd}))
                }else{
                    console.log(res.data)
                    if(res.data.msg){
                        Toast.info(res.data.msg, 1);
                        dispatch(errorMsg(res.data.msg))
                    }

                }
            }
        })
    }

}

//校验用户信息
export function userInfo(data) {
    return dispatch=>{
        dispatch(loadData(data))
    }
}