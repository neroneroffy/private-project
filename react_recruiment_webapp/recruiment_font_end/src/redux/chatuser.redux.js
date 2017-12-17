/**
 * Created by haita on 2017/12/17 0017.
 */
import axios from 'axios';
const USER_LIST = 'USER_LIST';
const initState = {
    userList:[]
};

//reducer
export function chatuser(state = initState,action) {
    switch (action.type){
        case USER_LIST:
            return {...state,userList:action.payload}
        default:
            return state
    }
}

//action creator

function userList(data) {
    return {
        type:USER_LIST,
        payload:data
    }
}

export function getUserList(type) {
    console.log(type)
    return dispatch=>{
        axios.get(`/users/list?type=${type}`)
            .then(res=>{
                dispatch(userList(res.data.data))
                console.log(res.data.data)
            })
    }
}