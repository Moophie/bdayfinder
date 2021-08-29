const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const config = require('config');

const passport = require('./passport/passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coinsRouter = require('./routes/api/v1/coins');

const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.dbconn || config.get('database.conn'), {
  useNewUrlParser: true,
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// JWT authentication example, use on other routes than index
// app.use('/', passport.authenticate('jwt', {session: false}), indexRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/coins', coinsRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
