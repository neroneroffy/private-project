var express = require('express');
var area = require('./routes/area');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cascader');
mongoose.connection.on('connected',()=>{
  console.log('MongonDB数据库链接成功')
});
var app = express();

app.use('/area', area);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
