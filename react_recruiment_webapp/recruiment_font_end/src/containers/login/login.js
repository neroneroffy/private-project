import React, {Component} from 'react';
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank,Button, WhiteSpace } from 'antd-mobile';
import './login.css'
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
@connect(
    state=>state.user,
    {login}
)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            pwd:""
        }
    }
    register=()=>{
      this.props.history.push('/register');
    };
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin=()=>{
        this.props.login(this.state)
    };
    render() {
        return (
            <div className="login">
                {
                    this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:""
                }
                <div className="logo-wrapper">
                    <Logo></Logo>
                </div>
                <WingBlank>
                    <List>
                        <InputItem onChange={ value=>{this.handleChange('user',value)}}>用户</InputItem>
                        <InputItem onChange={ value=>{this.handleChange('pwd',value)}}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick = {this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type="default" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login