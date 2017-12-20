import React, {Component} from 'react';
import { Route,Switch } from 'react-router-dom';
import Seeker from '../seeker/seeker';
import Boss from '../boss/boss';
import Msg from '../msg/msg';
import User from '../user/user';
import { connect } from 'react-redux';
import { NavBar,TabBar } from 'antd-mobile';
import NavLinkBar from '../../components/nav-link-bar/nav-link-bar';
import { getChatList,msgReceive } from '../../redux/chat.redux';
@connect(
    state=>state,
    {getChatList,msgReceive}
)

class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount(){

        if(!this.props.chat.chatmsg.length){
            console.log(this.props.chat.chatmsg.length);
            this.props.getChatList();
            this.props.msgReceive();
        }
    }
    render() {
        const {pathname} = this.props.location;

        const user = this.props.user;
        const navList = [
            {
                path:'/boss',
                text:'求职者',
                icon:'boss',
                title:'求职者列表',
                component:Boss,
                hide:user.type === 'seeker'
            },
            {
                path:'/seeker',
                text:'BOSS列表',
                icon:'job',
                title:'BOSS列表',
                component:Seeker,
                hide:user.type === 'boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'个人中心',
                icon:'job',
                title:'个人中心',
                component:User
            },
        ];
        return (
            <div>
                {
                    pathname !=='/'?
                        <NavBar mode="dark" className="fixed-header">
                            {
                                navList.find(v=>v.path === pathname).title//找出navList列表中path与当前URL相符的元素，取其中的title
                            }
                        </NavBar>
                        :
                        null
                }
                <div style={{marginTop:55,marginBottom:45}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }

                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}
export default DashBoard