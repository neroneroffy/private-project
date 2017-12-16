﻿﻿# 练习

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


## React + Node.js +  MongoDB实时聊天WebApp (react_recruiment_webapp)
>技术：React16，React-Router4，Redux，Node.js，MongoDB，Antd-Mobile

React实战项目，重点练习Redux的运用，利用thunk实现Redux异步操作，Socket.io实现两个用户角色实时通信。
功能：

* 用户的注册登录
* 根据不同角色跳转到不同页面
* 实时聊天

其余功能开发中...
