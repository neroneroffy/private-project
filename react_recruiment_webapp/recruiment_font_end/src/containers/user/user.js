import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Result,List,WhiteSpace } from 'antd-mobile';
@connect(
    state=>state.user
)
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;

        return this.props.user?
            (
                <div>
                    {
                        console.log(this.props.desc.split('\n'))

                    }
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
                        <Item>
                            退出登录
                        </Item>
                    </List>
                </div>
            ):null
    }
}
export default User