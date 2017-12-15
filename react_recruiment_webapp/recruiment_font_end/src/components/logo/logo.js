import React, {Component} from 'react';
import LogoImg from './logo.png'
import './logo.css'
class Logo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="logo-container">
                <img src={LogoImg} alt=""/>
            </div>
        )
    }
}
export default Logo