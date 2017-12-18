import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { WingBlank,WhiteSpace,Card } from 'antd-mobile';
class UserCard extends Component {
    static userList = PropTypes.array.isRequired;
    componentDidMount(){

    }

    render(){
        console.log(this.props.userList);
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {
                    this.props.userList.map(v=>(
                        v.avatar?
                            (
                                <div key={v._id}>
                                    {
                                        console.log(v)
                                    }
                                    <Card>
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