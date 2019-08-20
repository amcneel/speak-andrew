var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var fetch = require('node-fetch');
require('dotenv').config()
const redis = require('redis')

const REDIS_URL = process.env.REDIS_URL

var indexRouter = require('./routes/index');
var createRouter = require('./routes/create');

var app = express();

/**
 * Cache requests
 * Redis experiments
 */
/*var redis_client = redis.createClient(REDIS_URL)
var cache = (req, res, next) => {
  const body = req.body.text;
  console.log('req.query:', req.body)
  redis_client.get(body, function (err, data) {
    if (err) throw err;
    console.log('data', data)
    if (data != null) {
        res.send(respond(body, data));
    } else {
        next();
    }
  });
}*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/create', createRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
