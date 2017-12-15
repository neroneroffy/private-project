import React, {Component} from 'react';
import axios from 'axios';
//由于authroute组件不是路由组件，所以要引入withRouter，获取路由对象
import { withRouter } from 'react-router-dom';
import { userInfo } from '../../redux/user.redux';
import { connect } from 'react-redux';
@withRouter
@connect(
    null,
    {userInfo}
)
class Authroute extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount(){
        const publicList = ['/login','/register'];
        const pathName = this.props.location.pathName;
        //如果当前页面在登录页或者注册页面，那么不用获取用户信息
        if(publicList.indexOf(pathName)>-1){
            return null;
        }else{
            axios.get('/users/info').then((response)=>{
                let res = response.data;
                console.log(res)
                if(response.status === 200){
                    if(res.code === 1){
                       this.props.history.push('/login')
                    }else{
                       this.props.userInfo(res.data.data)
                    }
                }
            })
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}
export default Authroute