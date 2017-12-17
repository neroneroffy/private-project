import React, {Component} from 'react';
import { WingBlank,WhiteSpace,Card } from 'antd-mobile';
import { getUserList } from '../../redux/chatuser.redux'
import { connect } from 'react-redux';

@connect(
    state=>state,
    {getUserList}

)
class Boss extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        this.props.getUserList(this.props.user.type)
    }
    render() {
        console.log(this.props.chatuser)
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {
                    this.props.chatuser.userList.map(v=>(
                        v.avatar?
                            (
                                <div key={v._id}>
                                    <Card>
                                        <Header
                                            title={v.user}
                                            thumb={require(`../../components/img/${v.avatar}.png`)}
                                            extra={v.title}
                                        >

                                        </Header>
                                        <Body>
                                            {v.desc.split('/n').map(v=>(
                                                <div key={v}>{v}</div>
                                            ))}
                                        </Body>
                                    </Card>
                                    <WhiteSpace></WhiteSpace>
                                </div>
)
                            :
                            null

                    ))
                }
            </WingBlank>
        )
    }
}
export default Boss