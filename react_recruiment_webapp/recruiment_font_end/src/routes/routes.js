import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Login from '../containers/login/login';
import Register from '../containers/register/register';
import Authroute from '../components/authroute/authroute';
const Boss = ()=>{
    return <h2>boss</h2>
}
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
                    <Route path="/boss" component={Boss}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </div>
            </BrowserRouter>
        )
    }
}
export default Routes