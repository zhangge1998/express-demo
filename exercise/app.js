/**
 * Created by ubuntu on 5/14/18.
 */
var express = require('express');
var app = express();

var routes = require('./routes')(app);

app.listen(8082, function(){
    console.log("app listening at http://localhost:8082")
});
