import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { WingBlank,WhiteSpace,Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
@withRouter
class UserCard extends Component {
    static userList = PropTypes.array.isRequired;
    componentDidMount(){

    }
    handleChat(v){

        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {
                    this.props.userList.map(v=>(
                        v.avatar?
                            (
                                <div key={v._id}>
                                    <Card onClick={()=>{this.handleChat(v)}}>
                                        <Header
                                            title={v.user}
                                            thumb={require(`../../components/img/${v.avatar}.png`)}
                                            extra={v.title}
                                        >

                                        </Header>
                                        <Body>
                                        {v.type === 'boss'? <div>公司：{v.company}</div>:null}
                                        {v.desc.split('\n').map(d=>(
                                            <div key={d}>{d}</div>
                                        ))}
                                        {v.type === 'boss'? <div>薪资：{v.money}</div>:null}
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
export default UserCard