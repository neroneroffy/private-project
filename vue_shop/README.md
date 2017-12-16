# Vue.js+Node.js+MongoDB商城

> 技术：vue2，axios，vue-router，Node.js，MongoDB，WebPack，EXpress

前端页面使用vue构建，后端服务器由Node.js的Express框架搭建，数据库为MongoDB，网络请求为axios。

功能：
## 功能
* 登录退出
* 商品列表（分页请求，并可以加入购物车）
* 购物车（商品数量的加减，商品的删除，多选全选反选价格联动）
* 地址模块（设置默认地址，删除）、订单生成（生成订单号，收货人信息，并插入数据库）


## 说明
> 分别进入vue_shop_font_end和vue_shop_font_end安装依赖、启动项目

``` bash
# 安装依赖
npm install

# 启动项目
npm run dev

# 打包发布
npm run build

```
## 效果
![image](https://github.com/capslocktao/private-project/blob/master/vue_shop/vueshop_shop.gif)

