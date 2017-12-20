import React, {Component} from 'react';
import { Grid,List } from 'antd-mobile';
import PropsTypes from 'prop-types';
class AvatarSelector extends Component {
    static PropsTypes = {
    selectAvatar:PropsTypes.func
};
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        const avatarList = ['boy','bull','chick','crab','girl','hedgehog','hippopotamus','koala','lemur','man','pig','tiger','whale','woman','zebra']
                        .map(v=>({
                            icon:require(`../img/${v}.png`),
                            text:v
                        }));
        const gridHeader = this.state.icon?
                            (
                                <div>
                                    <span>已选择的头像是</span>
                                    <img style={{width:20}} src={this.state.icon} alt=""/>
                                </div>
                            )
                            :
                            '请选择头像';
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    >{/*选择头像的时候，将选择的头像信息存入state*/}</Grid>

                </List>
            </div>
        )
    }
}
export default AvatarSelector