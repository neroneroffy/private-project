import React, { Component } from 'react';
import ReactCascader from './react-cascader/react-cascader';
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            cascaderShow:false,
            areaData:[],
            area:""
        };
        this.showCascader = this.showCascader.bind(this);
        this.onCancel = this.onCancel.bind(this)
    }
    componentDidMount(){
        axios.get('/area',{
            params:{
                pid:"0"
            }
        }).then(res=>{
            if(res.status === 200 && res.data.result === true){
                this.setState({
                    areaData:res.data.data
                })
            }
        })
    }

    showCascader(){
        this.setState({
            cascaderShow:true
        })
    }
    onCancel(){
        this.setState({
            cascaderShow:false
        })
    }
    getData(id){

        axios.get(`/area`,{
            params:{pid:id}
        }).then(res=>{
            if(res.status === 200 && res.data.result === true){
                this.setState({
                    areaData:res.data.data
                })
            }
        })
    }
    onOk(result){
        this.setState({
            cascaderShow:false
        });
        let resultData = "";
        result.forEach((v,i)=>{
            resultData += i === 1?`/${v.name}/`:v.name
        });
        this.setState({
            area:resultData
        })

    }
  render() {
    return (
      <div className="App">
        <div className="area-select">选择地区</div>
        <div className="area-input">
          <div onClick={this.showCascader}>{this.state.area}</div>
        </div>

        <ReactCascader
            cascaderShow={this.state.cascaderShow}
            onCancel={this.onCancel}
            getData={this.getData.bind(this)}
            data={this.state.areaData}
            onOk={this.onOk.bind(this)}
        ></ReactCascader>
      </div>
    );
  }
}

export default App;
