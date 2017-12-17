import React, {Component} from 'react';
import { NavBar,InputItem,TextareaItem,WhiteSpace,Button } from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom'
@connect(
    state=>state.user,
    {update}
)
class BossInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title:"",
            company:"",
            money:"",
            desc:"",
            avatar:""
        }
    }
    onChange=(key,val)=>{
        this.setState({
            [key]:val
        })
    };
    selectAvatar=(avatarName)=>{
        this.setState({
            avatar:avatarName
        })
    }
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div className="bossinfo">
                {/*完善信息成功后，跳转到其他页面*/}
                {
                    redirect && redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null
                }
                <NavBar mode="dark">
                    BOSS完善信息
                </NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <WhiteSpace></WhiteSpace>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('company',v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('money',v)}>
                    薪资范围
                </InputItem>
                <TextareaItem onChange={(v)=>this.onChange('desc',v)} rows={3} autoHeight title="职位要求">
                </TextareaItem>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}
export default BossInfo