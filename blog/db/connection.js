/**
 * Created by ubuntu on 4/13/18.
 */
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '123456',
    database : 'blog',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.log(err);
        console.log("连接数据库失败！");
        return;
    }
    else
        console.log("连接数据库成功！");
});

module.exports = db;