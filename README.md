业余时间写的关于react,vue两个框架的训练，以及一些小工具

* [React + Node.js +  MongoDB实时聊天WebApp (react_recruiment_webapp)](#react_recruiment_webapp)<br/>
* [React移动端省市县级联选择器 (react_cascader)](#react_cascader)<br/>
* [vue.js + node.js + MongoDB 商城(vue_shop)](#vue_shop)<br/>
* [vue.js + node.js + MongoDB 上传图片组件(vue_uploader)](#vue_uploader)<br/>
* [Vue.js饿了么商家模块(ele)](#ele)

<h2 id="react_recruiment_webapp">React + Node.js +  MongoDB实时聊天WebApp (react_recruiment_webapp)</h2>

>技术：React16，React-Router4，Redux，Node.js，MongoDB，Antd-Mobile

项目分为用户列表、消息列表、个人中心、登录注册四个模块；后台为Node.js，数据库为MongoDB，配合前端的react技术栈实现前后端联调。用户分为求职者和雇主两个角色。用户注册可选角色，注册成功后需要完善信息（求职者：头像，期望职位，个人简介；雇主：头像、招聘职位、公司名、薪资范围、职位描述）。信息完善后求职者跳转到boss列表页，boss跳转到求职者列表页。并且可以点击对方与其聊天。如果有未读消息，则在底部导航的消息列表上显示未读消息数量。点击未读消息，未读消息数量相应减少。重点练习Redux的运用，存储用户信息、用户列表信息、聊天信息、未读消息数量。利用thunk中间件实现axios异步请求，Socket.io实现两个用户角色实时通信。

[项目代码](https://github.com/capslocktao/private-project/tree/master/react_recruiment_webapp)

功能：

* 用户注册登录、退出登录
* 注册完成后完善用户信息
* 根据不同角色跳转到相应页面
* 用户聊天功能

注册登录、退出登录：

![image](https://github.com/capslocktao/private-project/blob/master/react_recruiment_webapp/react_register.gif)

聊天功能：

![image](https://github.com/capslocktao/private-project/blob/master/react_recruiment_webapp/chat_show.gif)

## 总结
在某网上看到了这个教程，蠢蠢欲动，于是去网上找免费的资源，无奈找了一圈也没找到，所以狠了心买了一套。钱确实没白花，之前自己写过一个react上线项目，但是全凭自己摸索出来的，代码目录的组织方式以及redux的状态如何存储都是自己定的。写这个项目时候把用jsx写代码的方式重新认识了一遍，而且，view层和redux的状态层划分的很清晰，需要派发action和获取store状态的组件只需要外层包一个connect，然后要做出动作，触发函数dispatch出去就好。当时理解redux很是费劲，大神们为了把问题简单化，设计了很多架构，但是这些架构越来越复杂，需要一定的学习曲线，不过用的时候，真的是特别的方便。

***

<h2 id="react_cascader">React移动端省市县级联选择器 (react_cascader)</h2>

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

[在组件中的使用说明](https://github.com/capslocktao/private-project/tree/master/react_cascader)
***

<h2 id="vue_shop">vue.js + node.js + MongoDB 商城(vue_shop)</h2>
>技术：Vue2.5.2, Vue-Router, Vuex, Node.js, Express, MongoDB, WebPack

前端页面使用vue构建，不再mock数据，后端服务器由Node.js的Express框架搭建，数据库为MongoDB，网络请求为axios,利用vuex实现登录退出功能，关于商品、购物车、地址的修改都是与后台关联的。

[项目代码](https://github.com/capslocktao/private-project/tree/master/vue_shop)
功能：

* 登录退出
* 商品列表（分页请求，并可以加入购物车）
* 购物车（商品数量的加减，商品的删除，多选全选反选价格联动）
* 地址模块（设置默认地址，删除）、订单生成（生成订单号，收货人信息，并插入数据库）

截图：

![image](https://github.com/capslocktao/private-project/blob/master/vue_shop/vueshop_pic.png)

## 总结
这也是某网上的教程，做这个项目的原因很简单，就是自己想写一些需要后台配合的插件时，很不方便，因为自己只会前端的那些东西，所以决定也搞搞后台，别让自己被自己绊住。这算是node.js+MongoDB的初体验吧，总体感觉这一套后端技术栈对前端很友好，node.js不会有语法障碍，MongoDB又是以json格式存储数据的。所以学的时候很顺畅。写的node.js的时候真的体会到了异步的繁琐，也明白为啥会有promise这东西诞生，因为确实简化了问题了啊。vuex也用了一下下，临时学了一下，要更多的练习。总之写完这个项目后基本够自己目前所用了。往后会写更多的前后台联通的项目。

***

<h2 id="vue_uploader">vue.js + node.js + MongoDB 上传图片组件(vue_uploader)</h2>
<span id="vue_uploader"></span>
>技术：Vue2.5.2, Node.js, Express, MongoDB, WebPack

Vue搭建页面，form绑定一个不可见的iframe实现无刷新提交表单，图片选择完毕后，递归调用axios将所选图片依次post到后台，实现单图和多图的上传功能，并实现图片预览、进度条、检测图片大小是否超出限制（前端检测）。
后台利用formidable解析表单数据，重命名后将图片名称，id，大小,路径存到MongoDB数据库。每次接收并存储完成，给前台返回最新上传的图片。删除分组会连同组内的所有图片一起删除。

[项目代码](https://github.com/capslocktao/private-project/tree/master/vue_uploader)

功能：

* 图片上传
* 上传进度条
* 分组上传，分组查询
* 新建分组，删除分组
* 删除图片
* 选择图片

效果：

![image](https://github.com/capslocktao/private-project/blob/master/vue_uploader/show.gif)

## 总结
这其实是领导下达的一个小任务，但是任务中没有提到要实现这么多的功能。这是在完成任务的前提下又扩展了一下，加上了分组上传，分组查询，新建分组，删除分组的功能，方便自己以后用。本来还想加上分页查询的功能的，分页的前端和后台已经写好并且测试成功了，但是突然想到涉及上传时候传到那哪一页的问题。。看了网上很多的上传插件基本都没有分页查询，所以为了不踩坑，忍痛放弃了这个写好的功能~写代码之前自己一点定要有大局观啊，，，不然后面就很悲观了。后台上传功能基本上是查资料学来的，全部的功能自己一个人写了好几天。算是对自己上次用node.js+MongoDB写vue后台的一个小练习吧，项目文章在[这里](https://segmentfault.com/a/1190000012349559)。

***

<h2 id="ele">Vue.js饿了么商家模块(ele)</h2>
<span id="ele"></span>
>技术：vue2，vue-resource，vue-router，better-scroll，stylus

纯前端练习，三个业务模块：商品，评论，商家。通过vue-resource请求mock数据，引入better-scroll实现页面内所有滚动效果，动画效果通过transition组件实现。flex进行页面布局。

[项目代码](https://github.com/capslocktao/private-project/tree/master/ele)
功能：

* 点击分类目录滚动到相应商品模块
* 购物车数量及商品变化实时计算价格
* 评论筛选（全部、推荐、吐槽、有无内容）
* localStorage实现收藏商家功能
* 评价星级根据数据动态变化

效果：

![image](https://github.com/capslocktao/private-project/blob/master/ele/ele_show.gif)

## 总结
这是入职之前就在写的一个小的练习项目，网上找的教程，当时只实现了商品业务模块，就去上班了。。后来一直没动，前些日子才把后续的完善。这项目虽然简单，也只是个纯前端的练习项目，但是只写了商品业务模块后还是对我入职后开发公司的react项目提供了巨大帮助，webpack配置、项目目录的组织方式，写代码的规范，前期的数据mock。现在写完了，也算有一点小小的成就感，又完成了一个小练习。

