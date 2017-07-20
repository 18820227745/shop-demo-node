var express = require("express");
var app = express();
var path = require("path");
var winston = require('winston');
var expressWinston = require('express-winston');
var mongoose = require("mongoose");
var config = require('config-lite')(__dirname);
var pkg = require('./package');
var bodyParser = require("body-parser");
var multer = require("multer");
var session = require("express-session");
const formidable = require('express-formidable');

global.dbHelper = require('./common/dbHelper');

global.db = mongoose.connect(config.mongodb);

app.use(session({
  secret: config.session.secret,
  key: config.session.key,
  cookie: {
    maxAge: config.session.maxAge
  }
}));


// 设定views变量，意为视图存放的目录
app.set("views", path.join(__dirname, 'views'));


// 设定view engine变量， 意为网页模板引擎 
//app.set("view engine",'ejs');//ejs:可以直接嵌入变量<%= title %>，include其他页面模块
app.set("view engine", 'html');
app.engine('.html', require('ejs').__express);

// 设施bodyParser模块，是项目中可以直接引用req.body.XXXX
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());



// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')));

//全局中间件，每个路由处理都会先执行这段代码
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});

// app.use(expressWinston.logger({
//   transports: [
//     new (winston.transports.Console)({
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       filename: 'logs/success.log'
//     })
//   ]
// }));
// 路由
require('./routes')(app);
// 错误请求的日志
// app.use(expressWinston.errorLogger({
//   transports: [
//     new winston.transports.Console({
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       filename: 'logs/error.log'
//     })
//   ]
// }));


app.get('/', function (req, res) {
  res.redirect("/home");
});

if (module.parent) {
  module.exports = app;
} else {
  // 监听端口，启动程序
  app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
  });
}



