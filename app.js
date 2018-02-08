var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexAction = require('./routes/indexAction');
var userAction = require('./routes/userAction');
var articleAction = require('./routes/articleAction');
var commentAction = require('./routes/commentAction');
var manageArticleAction = require('./routes/manageArticleAction');

var ejs = require('ejs');

var app = express();

app.use(cors({
  origin:['http://localhost:3001'],
  methods:['GET','POST'],
  allwoeHeaders:['Content-Type','Authorization']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'recommand 128 bytes random string',//128 个字符的随机字符串
	cookie:{maxAge:60 * 1000 * 30},
  resave: true,
  rolling:true,
  saveUninitialized:true  
}));
app.use(function(req,res,next){
	res.locals.session = req.session;
	next();
})
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexAction);
app.use('/user', userAction);
app.use('/article',articleAction);
app.use('/comment',commentAction);
app.use('/manage/article',manageArticleAction);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.backUrl = "/";

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
