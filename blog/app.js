var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('express-session');
var Store = require('express-mysql-session');

var routes = require('./routes/index');

var app = express();

app.set('port', process.env.PORT || 8081);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var db = {
  host:'localhost',
  user:'root',
  password:'123456',
  database:'blog',
};

app.use(session(
    {
      resave: false,
      saveUninitialized: true,
      secret:'react',
      store:new Store(db)
    }
));


//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;