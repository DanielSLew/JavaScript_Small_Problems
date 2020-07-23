const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const upload  = require('multer')();
const fs = require('fs');

const apiRouter = require('./routes/api');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(upload.none());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.get('/add', function(req, res) {
  fs.readFile(__dirname + '/public/add.html', 'utf8', (err, text) => {
    res.send(text);
  });
});

app.get('/add-schedules', function(req, res) {
  fs.readFile(__dirname + '/public/add-schedules.html', 'utf8', (err, text) => {
    res.send(text);
  });
});

app.get('/bookings', function(req, res) {
  fs.readFile(__dirname + '/public/bookings.html', 'utf8', (err, text) => {
    res.send(text);
  });
});

app.get('/see-bookings', function(req, res) {
  fs.readFile(__dirname + '/public/student-bookings.html', 'utf8', (err, text) => {
    res.send(text);
  });
});

app.get('/cancel', function(req, res) {
  fs.readFile(__dirname + '/public/cancel.html', 'utf8', (err, text) => {
    res.send(text);
  });
});

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
