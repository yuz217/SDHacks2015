var express = require('express');
var path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var read = require('./routes/read');
var write = require('./routes/write');
var getStories = require('./routes/getStories');
var getSentences = require('./routes/getSentences');
var addSentence = require('./routes/addSentence');
var addStory = require('./routes/addStory');
var incrementViews = require('./routes/incrementViews');
var incrementNumUsers = require('./routes/incrementNumUsers');
var decrementNumUsers = require('./routes/decrementNumUsers');
var finishStory = require('./routes/finishStory');

var viewStory = require('./routes/viewStory');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);
app.use('/users', users);
app.use('/read', read);
app.use('/write', write);
app.use('/getStories', getStories);
app.use('/getSentences', getSentences);
app.use('/addSentence', addSentence);
app.use('/addStory', addStory);
app.use('/finishStory', finishStory);
app.use('/incrementViews', incrementViews);
app.use('./incrementNumUsers', incrementNumUsers);
app.use('./decrementNumUsers', decrementNumUsers);
app.use('/viewStory', viewStory);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
