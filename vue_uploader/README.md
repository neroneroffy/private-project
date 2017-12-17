# vue.js + node.js + MongoDB 上传图片组件

> 技术：Vue2.5.2, Node.js, Express, MongoDB, WebPack

Vue搭建页面，form绑定一个不可见的iframe实现无刷新提交表单，图片选择完毕后，递归调用axios将所选图片依次post到后台，从而实现单图和多图的上传功能，并实现图片预览、进度条、检测图片大小是否超出限制（前端检测）。 后台利用formidable模块解析表单数据，重命名后将图片名称，id，大小,路径存到MongoDB数据库。每次接收并存储完成，给前台返回最新上传的图片。删除分组会连同组内的所有图片一起删除。

功能：
## 功能
* 图片上传
* 上传进度条
* 分组上传，分组查询
* 新建分组，删除分组
* 删除图片
* 点选图片


## 说明
> 分别进入vue-upload-font-end和my-server安装依赖、启动项目

``` bash
# 安装依赖
npm install

# 启动项目
npm run dev

# 打包发布
npm run build

```
## 效果
![image](https://github.com/capslocktao/private-project/raw/master/vue_uploader/show.gif)

