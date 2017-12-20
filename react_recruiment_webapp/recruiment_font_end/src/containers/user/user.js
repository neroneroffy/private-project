import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Result,List,WhiteSpace,Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert;
        alert('注销', '确认退出吗', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确认', onPress: () => {
                browserCookie.erase('userid');
                this.props.logoutSubmit()
            }},
        ])
        //

    }
    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        return this.props.user?
            (
                <div>
                    <Result
                        img={<img src={require(`../../components/img/${this.props.avatar}.png`)} alt=""/>}
                        title={this.props.user}
                        message={this.props.type === 'boss'?this.props.company:null}
                    />
                    <List renderHeader="简介">
                        <Item multipleLine = {true}>
                            {this.props.title}
                            {
                                this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)
                            }
                            {
                                this.props.money?<Brief>{this.props.money}</Brief>:null
                            }

                        </Item>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <List>
                        <Item onClick={this.logout}>
                            退出登录
                        </Item>
                    </List>
                </div>
            ):<Redirect to={this.props.redirectTo}></Redirect>
    }
}
export default User