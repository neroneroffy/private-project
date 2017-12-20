import React, {Component} from 'react';
import { List,InputItem,NavBar,Icon,Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getChatList,sendMsg,msgReceive } from '../../redux/chat.redux';
import { getChatId } from '../../util/util';
import io from 'socket.io-client';
const socket = io('ws://localhost:3000');

@connect(
    state=>state,
    {getChatList,sendMsg,msgReceive}
)
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text:"",
            msg:[]
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getChatList();
            this.props.msgReceive();
        }
        this.fixedBug()
    }
    fixedBug(){
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
/*        socket.emit('sendmsg',{text:this.state.text})
        this.setState({
            text:""
        })*/
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg(from,to,msg)
        this.setState({
            text:"",
            showEmoji:false
        })
    }
    render() {

        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}))

        const userid = this.props.match.params.user;
        const currentChatId = getChatId(userid,this.props.user._id);
        const chatMsgs = this.props.chat.chatmsg.filter(v=>v.chatid===currentChatId)
        const Item = List.Item;
        const users = this.props.chat.users;
        if(!users[userid]){
            return null
        }

        return (
            <div id="chat-page">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                <div>
                    {
                        chatMsgs.map(v=>{
                            const avatar = require(`../../components/img/${users[v.from].avatar}.png`)
                            return v.from === userid?(
                                <List key={v._id}>
                                    <Item
                                        thumb={avatar}
                                    >
                                        {v.content}
                                    </Item>
                                </List>
                                ):(
                                    <List key={v._id}>
                                        <Item
                                            extra={<img src={avatar} alt=""/>}
                                            className="chat-me"
                                        >
                                            {v.content}
                                        </Item>
                                    </List>
                                )

                        })
                    }
                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({
                                    text:v
                                })
                            }}
                            extra={
                                <div>
                                    <span style={{fontSize:12,marginRight:15}} onClick={()=>{
                                        this.setState({
                                            showEmoji:!this.state.showEmoji
                                        })
                                        this.fixedBug()
                                    }}>😃</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {
                        this.state.showEmoji?
                            <Grid
                                data={emoji}
                                columnNum={9}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(el)=>{
                                    this.setState({
                                        text:this.state.text+el.text
                                    })
                                }}
                            />
                            :
                            null

                    }
                </div>

            </div>
        )
    }
}
export default Chat