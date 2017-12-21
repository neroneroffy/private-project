import React, {Component} from 'react';
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank,Button, WhiteSpace } from 'antd-mobile';
import './login.css'
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HocForm from '../../components/hoc-form/hoc-form'

@connect(
    state=>state.user,
    {login}
)
@HocForm
class Login extends Component {
    constructor(props) {
        super(props);
    }
    register=()=>{
      this.props.history.push('/register');
    };

    handleLogin=()=>{
        this.props.login(this.props.state)
    };
    render() {
        return (
            <div className="login">

                {
                    (this.props.redirectTo&&this.props.redirectTo!=='/login')?<Redirect to={this.props.redirectTo}></Redirect>:""
                }
                <div className="logo-wrapper">
                    <Logo></Logo>
                </div>
                <WingBlank>
                    <List>
                        <InputItem placeholder="" onChange={ value=>{this.props.handleChange('user',value)}}>用户</InputItem>
                        <InputItem placeholder="" type="password" onChange={ value=>{this.props.handleChange('pwd',value)}}>密码</InputItem>
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