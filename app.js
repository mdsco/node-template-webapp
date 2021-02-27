const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookie_parser = require('cookie-parser');
var body_parser = require('body-parser');
const nunjucks = require('nunjucks')


var index = require('./routes/index');

var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html.njk');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cookie_parser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;