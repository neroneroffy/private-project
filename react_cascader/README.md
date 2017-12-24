## React移动端省市县级联选择器 (react_cascader)
>技术：react，react-addons-css-transition-group，Node.js，MongoDB

React级联选择器插件。之前工作中遇到了需要用级联选择器的地方，当时时间紧，只好找了一个不太好用的插件，现在有时间自己实现了一个。加载数据方式为异步获取，后端数据为扁平化结构，通过pid来关联上下级。用node.js简单写了下后台。react-cascader-font-end为组件前端，react-cascader-server为后台。

效果：

![image](https://github.com/capslocktao/private-project/blob/master/react_cascader/show.gif)

数据结构：

![image](https://github.com/capslocktao/private-project/blob/master/react_cascader/data.jpg)


| API           | 说明               | 类型      |
| ------------- |:------------------:| --------:|
| cascaderShow  | 是否显示级联选择器    | Boolean  |
| data          | 接收的省市县数据      | Array    |
| getData      | 动态获取数据的函数   | Function |
| onCancel      | 点击模态层取消的函数   | Function |
| onOk          | 选择完毕的回调函数    | Function  |

在组件中使用：
```
import React, { Component } from 'react';
import ReactCascader from './react-cascader/react-cascader';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            cascaderShow:false,//控制选择器是否展示
            areaData:[],//要传入组件的数据
            area:""//仅作外层组件展示选择结果用，与组件没有关系
        };
    }
    componentDidMount(){
        //进入页面需要先请求第一级数据
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
    //唤出级联选择器
    showCascader(){
        this.setState({
            cascaderShow:true
        })
    }
    //点击模态层关闭，取消选择
    onCancel(){
        this.setState({
            cascaderShow:false
        })
    }
    //点击异步加载数据，接受id为参数，传给后台
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
    //确认选择。接收一个参数，为级联选择的结果，包含名称和id
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
            cascaderShow={this.state.cascaderShow.bind(this)}
            onCancel={this.onCancel.bind(this)}
            getData={this.getData.bind(this)}
            data={this.state.areaData}
            onOk={this.onOk.bind(this)}
        ></ReactCascader>
      </div>
    );
  }
}
export default App;

```
