## React + Node.js +  MongoDB实时聊天WebApp (react_recruiment_webapp)
>技术：React16，React-Router4，Redux，Node.js，MongoDB，Antd-Mobile

React实战项目，项目分为用户列表、消息列表、个人中心、登录注册四个模块；用户分为求职者和雇主两个角色。用户注册可选角色，注册成功后需要完善信息（求职者：头像，期望职位，个人简介；雇主：头像、招聘职位、公司名、薪资范围、职位描述）。信息完善后求职者跳转到boss列表页，boss跳转到求职者列表页。并且可以点击对方与其聊天。如果有未读消息，则在底部导航的消息列表上显示未读消息数量。点击未读消息，未读消息数量相应减少。项目重点练习Redux的运用，存储用户信息、用户列表信息、聊天信息、未读消息数量。利用thunk中间件实现axios异步请求，Socket.io实现两个用户角色实时通信。

功能：

* 用户注册登录、退出登录
* 注册完成后完善用户信息
* 根据不同角色跳转到相应页面
* 用户聊天功能

注册登录、退出登录：

![image](https://github.com/capslocktao/private-project/blob/master/react_recruiment_webapp/react_register.gif)

聊天功能：

![image](https://github.com/capslocktao/private-project/blob/master/react_recruiment_webapp/chat_show.gif)


## vue.js + node.js + MongoDB 商城(vue_shop)
>技术：Vue2.5.2, Vue-Router, Vuex, Node.js, Express, MongoDB, WebPack

前端页面使用vue构建，不再mock数据，后端服务器由Node.js的Express框架搭建，数据库为MongoDB，网络请求为axios。

功能：

* 登录退出
* 商品列表（分页请求，并可以加入购物车）
* 购物车（商品数量的加减，商品的删除，多选全选反选价格联动）
* 地址模块（设置默认地址，删除）、订单生成（生成订单号，收货人信息，并插入数据库）

截图：

![image](https://github.com/capslocktao/private-project/blob/master/vue_shop/vueshop_pic.png)

## vue.js + node.js + MongoDB 上传图片组件(vue_uploader)
>技术：Vue2.5.2, Node.js, Express, MongoDB, WebPack

Vue搭建页面，form绑定一个不可见的iframe实现无刷新提交表单，图片选择完毕后，递归调用axios将所选图片依次post到后台，实现单图和多图的上传功能，并实现图片预览、进度条、检测图片大小是否超出限制（前端检测）。
后台利用formidable解析表单数据，重命名后将图片名称，id，大小,路径存到MongoDB数据库。每次接收并存储完成，给前台返回最新上传的图片。删除分组会连同组内的所有图片一起删除。

功能：

* 图片上传
* 上传进度条
* 分组上传，分组查询
* 新建分组，删除分组
* 删除图片
* 选择图片

效果：

![image](https://github.com/capslocktao/private-project/blob/master/vue_uploader/show.gif)


## Vue.js饿了么商家模块(ele)
>技术：vue2，vue-resource，vue-router，better-scroll，stylus

纯前端练习，三个业务模块：商品，评论，商家。通过vue-resource请求mock数据，引入better-scroll实现页面内所有滚动效果，动画效果通过transition组件实现。flex进行页面布局。

功能：

* 点击分类目录滚动到相应商品模块
* 购物车数量及商品变化实时计算价格
* 评论筛选（全部、推荐、吐槽、有无内容）
* localStorage实现收藏商家功能
* 评价星级根据数据动态变化

效果：

![image](https://github.com/capslocktao/private-project/blob/master/ele/ele_show.gif)


## React移动端省市县级联选择器
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
| onCancel      | 点击模态层取消的函数   | Function |
| onOk          | 选择完毕的回调函数    | Function  |

使用：
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
        this.showCascader = this.showCascader.bind(this);
        this.onCancel = this.onCancel.bind(this)
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
    //点击异步加载数据
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

```

