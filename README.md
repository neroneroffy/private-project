# 个人练习项目

## vue.js + node.js + MongoDB 商城实现（练习项目）
技术：Vue2.5.2, Vue-Router, Vuex, Node.js, MongoDB, WebPack

前端页面使用vue构建，不再mock数据，后端服务器由Node.js的Express框架搭建，数据库为MongoDB，利用Mongoose操作数据库，网络请求为axios。

功能：

* 登录退出
* 商品列表（分页请求，并可以加入购物车）
* 购物车（商品数量的加减，商品的删除，多选全选反选价格联动）
* 地址模块（设置默认地址，删除）、订单生成（生成订单号，收货人信息，并插入数据库）
