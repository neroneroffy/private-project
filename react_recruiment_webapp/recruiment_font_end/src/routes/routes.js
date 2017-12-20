import React, { Component } from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Login from '../containers/login/login';
import Register from '../containers/register/register';
import BossInfo from '../containers/bossinfo/bossinfo';
import Authroute from '../components/authroute/authroute';
import SeekerInfo from '../containers/seekerinfo/seekerinfo';
import DashBoard from '../containers/dashboard/dashboard';
import Chat from '../containers/chat/chat';
class Routes extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Authroute></Authroute>
                    <Switch>
                        <Route path="/seekerinfo" component={SeekerInfo}></Route>
                        <Route path="/bossinfo" component={BossInfo}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/chat/:user" component={Chat}></Route>
                        <Route component={DashBoard}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default Routes