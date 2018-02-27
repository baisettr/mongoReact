const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');

var path = require('path');

//  connecing to mongo server
var mongoOptions = require('./config/mongoDb.json');
var mongoose = require('mongoose');
mongoose.connect(mongoOptions.url);
mongoose.Promise = global.Promise;

var index = require('./routes/index');
var tweet = require('./routes/tweet');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use('/', index);
app.use('/tweet', tweet);

app.use(function (req, res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;