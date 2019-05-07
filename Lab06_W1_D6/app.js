var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
// Lab06
const fs = require('fs');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Lab06
var gradesRouter = require('./routes/grades');
const logFiles = path.join(__dirname, './access.log');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Setup for Lab06
app.set('x-powered-by', false);
let streamLog = fs.createWriteStream(logFiles, {flags: 'a'});
app.use(logger('combined', {stream: streamLog}));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Lab06
app.use('/grades', gradesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
