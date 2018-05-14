/**
 * Created by ubuntu on 5/14/18.
 */
var express = require('express');
var app = express();
var router = express.Router();
router.get('/', function(req, res){
   res.send('home');
});
router.get('/login', function(req, res){
    res.send('login');
});
router.get('/register', function(req, res){
    res.send('register');
});

app.use('/', router); //挂载到根路径上
// app.use('/about', router)  若加上这行，就相当于给/ 和　/about指定了相同的回调函数
app.listen(8083, function(){
    console.log('app listening at localhost:8083');
});