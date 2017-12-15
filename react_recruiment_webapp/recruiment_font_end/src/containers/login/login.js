import React, {Component} from 'react';
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank,Button, WhiteSpace } from 'antd-mobile';
import './login.css'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    register=()=>{
      this.props.history.push('/register');
    };
    render() {
        return (
            <div className="login">
                <div className="logo-wrapper">
                    <Logo></Logo>
                </div>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button type="default" onClick={this.register}>注册</Button>
                </WingBlank>

            </div>
        )
    }
}
export default Login