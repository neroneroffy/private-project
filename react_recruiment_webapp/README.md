## React + Node.js +  MongoDB实时聊天WebApp (react_recruiment_webapp)

> React16，React-Router4，Redux，Node.js，MongoDB，Antd-Mobile

React实战项目，项目分为用户列表、消息列表、个人中心、登录注册四个模块；用户分为求职者和雇主两个角色。用户注册可选角色，注册成功后需要完善信息（求职者：头像，期望职位，个人简介；雇主：头像、招聘职位、公司名、薪资范围、职位描述）。信息完善后求职者跳转到boss列表页，boss跳转到求职者列表页。并且可以点击对方与其聊天。如果有未读消息，则在底部导航的消息列表上显示未读消息数量。点击未读消息，未读消息数量相应减少。项目重点练习Redux的运用，存储用户信息、用户列表信息、聊天信息、未读消息数量。利用thunk中间件实现axios异步请求，Socket.io实现两个用户角色实时通信。


功能：
## 功能
* 用户注册登录、退出登录
* 注册完成后完善用户信息
* 根据不同角色跳转到相应页面
* 用户聊天功能

## 说明
> 进入recruiment_font_end

``` bash
# 安装依赖
npm install

# 启动项目
npm run dev

# 打包发布
npm run build

```
> 进入server

``` bash
# 安装依赖
npm install

# 进入bin目录
node www

```

注册登录、退出登录：

![image](https://github.com/capslocktao/private-project/blob/master/react_recruiment_webapp/react_register.gif)

聊天功能：

![image](https://github.com/capslocktao/private-project/blob/master/react_recruiment_webapp/chat_show.gif)

