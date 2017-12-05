var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var query = require('./routes/query');
var menuDatas = require('./routes/menudata');
var app = express();
var MongoClient = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/database";
var http = require('http');
var url = 'http://www.imooc.com/learn/348';


// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置views文件夹未存放视图文件的目录
app.set('view engine', 'jade');//设置模板引擎为jade

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//加载日志中间件
app.use(bodyParser.json());//加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false }));//加载解析json的中间件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/upload', upload);
app.use('/query', query);
app.use('/menudatas', menuDatas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);//捕获404错误，并转发到错误处理器
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
