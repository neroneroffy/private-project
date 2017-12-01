var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var app = express();
var MongoClient = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/database";
var http = require('http');
var url = 'http://www.imooc.com/learn/348';
/*var cheerio = require('cheerio');
function filterChapters(html) {
    var $ = cheerio.load(html);
    var chapters = $('.chapter'
    );
    var courseData = [];
    chapters.each(function (item) {
        var chapterItem = $(this);
        var chapterTitle = chapterItem.find('strong').text();
        var video = chapterItem.find('.video').children('li');
        var chapterData = {
            chapterTitle : chapterTitle,
            videos:[]
        }
    })
}
http.get(url,function (res) {
    var html = "";
    res.on('data',function (data) {
        html += data;
    });
    res.on('end',function () {
        console.log(html);
    })
}).on("error",function () {
    console.log('err')
})*/

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
//链接mongoDB数据库
var operateData = function(db,callback){
    //链接到表 site
    var collection = db.collection('site');
    //插入数据
/*    var data = [{"name":"菜鸟教程","url":"www.database.com"},{"name":"菜鸟工具","url":"c.database.com"}];
    collection.insert(data,function(err,result){
        if(err){
            console.log('Error:'+err);
            return;
        }
        callback(result);
    });*/
    //查询数据
    var whereData = {"name":"菜鸟教程"};
    collection.find(whereData).toArray(function (err,result) {
        if(err){
          //console.log("Error:"+err);
          return;
        };
        callback(result);
    });
    //更新数据
    var updateData = {$set:{"url":"www.baidu.com"}};
    collection.update(whereData,updateData,{multi:true},function (err,result) {
        if(err){
          //console.log("Error:"+err);
          return;
        }
        callback(result);
    });
    collection.remove(whereData,function (err,result) {
        if(err){
            //console.log("Error:"+err);
            return
        }
        callback(result)
    })
};
MongoClient.connect(DB_CONN_STR,function(err,db){
    //console.log('链接成功！');
    operateData(db,function(result){
        //console.log(result);
        db.close();
    })
});

module.exports = app;
