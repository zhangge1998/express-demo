var db = require('../db/connection.js');

module.exports = function(app) {
  app.get('/', function(req, res ) {
    res.render('index', { title: '主页' });
  });
  app.get('/reg',checkNotLogin);
  app.get('/reg',function (req,res){
    console.log('请求注册');
    res.render('reg',{title:'注册'});
  });
  app.post('/reg',checkNotLogin);
  app.post('/reg',function (req,res) {
    // console.log(req.body);
    var name = req.body.name;
    var pass = req.body.password;
    var pass_repeat = req.body['password-repeat'];
    var email = req.body.email;
    if( name && pass && pass_repeat && email ) {
      if ( pass != pass_repeat) {
        console.log('buyizhi');
        res.status(400).send({code:400,data:[],msg:'两次输入密码不一致'});
        // return res.redirect('/reg');//返回注册页
      }
      else{
        db.query('SELECT * FROM user WHERE username ="'+name+'"',function (err,result) {
          if(err){
            console.error(err);
            res.status(500).send({code:500,data:[],msg:'database error'});
          }
          else{
            if(result.length==0){
              console.log(1);
              var addSql = 'INSERT INTO user (username,userpass,useremail) VALUES (?,?,?)';
              var addParams = [name,pass,email];
              db.query(addSql,addParams,function (err,result) {
                console.log(result);
                if(err)
                {
                  console.log('error');
                  res.status(500).send({code:500,data:[],msg:'database error'});
                }
                else{
                  res.redirect('/login');
                }
              });
            }
            else{
              res.status(400).send({code:400,data:[],msg:'用户已存在'});
            }
          }

        })
      }
    }

  });
  app.get('/login',checkNotLogin);
  app.get('/login', function (req,res) {
    console.log('请求登录');
    res.render('login',{title:'登录'})
  });
  app.post('/login',checkNotLogin);
  app.post('/login',function (req,res) {
      var name = req.body.name;
      var password = req.body.password;
      console.log(name);
    if(name && password){
      var data = {};
      db.query('SELECT * FROM user WHERE username="'+name+'"',function (err,userData) {
        console.log(userData);
        if(err){
          console.error(err);
          res.status(500).send({code:500,data:[],msg:'database error'});
        }else if(userData.length == 0){
          res.status(400).send({code:400,data:[],msg:'parameters error'});
        }else{
          if(userData[0].userpass != password){
            res.status(400).send({code:400,data:[],msg:'username or password error'});
          }else{
            data.username = userData[0].username;//注意这里是在req上面
            data.userpass = userData[0].userpass;
            req.session.onLineUser = data;
            res.redirect('/');//登陆成功后跳转到主页
          }
        }
      })
    }else{
      res.status(400).send({code:400,data:[],msg:'parameters error'});
    }
  });
  // app.get('/post',checkLogin);
  // app.get('/post',function (req,res) {
  //   res.render('/post',{title:'发表'})
  // });
  // app.post('/post',checkLogin);
  // app.post('/post',function (req,res) {
  // });
  app.get('/logout',checkLogin);
  app.get('/logout',function (req,res) {
    // res.redirect('/login');
    req.session.onLineUser = null;
    res.redirect('/');//登出成功后跳转到主页
  });
  function checkLogin(req, res, next) {
    if (!req.session.onLineUser) {
      res.redirect('/login');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.onLineUser) {
      res.redirect('back');
    }
    next();
  }
};
