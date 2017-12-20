/**
 * Created by haita on 2017/12/19 0019.
 */
import React,{ Component } from 'react';
export default function HocForm(Com) {
    class FormComponent extends Component{
        constructor(props){
            super(props)
            this.state={}
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key,val){
            this.setState({
                [key]:val
            })
        }
        render(){
            return (
                <Com handleChange = {this.handleChange} state={this.state} { ...this.props }></Com>
            )
        }
    }
    return FormComponent
}