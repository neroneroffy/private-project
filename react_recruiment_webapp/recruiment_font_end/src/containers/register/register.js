import React, {Component} from 'react';
import Logo from '../../components/logo/logo';
import { List, InputItem, Radio, WingBlank,Button, WhiteSpace } from 'antd-mobile';
import './register.css'
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';

const RadioItem = Radio.RadioItem;
@connect(
    state=>state.user,
    {register}
)
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type:'seeker',
            user:'',
            pwd:'',
            repeatPwd:''
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister=()=>{
        this.props.register(this.state)
    };

    render() {
        return (
            <div className="register">
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={ value=>{this.handleChange('user',value)}}>用户名</InputItem>
                        <InputItem onChange={ value=>{this.handleChange('pwd',value)}} type="password">密码</InputItem>
                        <InputItem onChange={ value=>{this.handleChange('repeatPwd',value)}} type="password">确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <p className="register-role">选择角色</p>
                    <List>
                        <RadioItem checked={this.state.type === 'seeker'} onChange={()=>{this.handleChange('type','seeker')}}>求职者</RadioItem>
                        <RadioItem checked={this.state.type === 'boss'} onChange={()=>{this.handleChange('type','boss')}}>BOSS</RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>

            </div>
        )
    }
}
export default Register