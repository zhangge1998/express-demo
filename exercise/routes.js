/**
 * Created by ubuntu on 5/14/18.
 */
module.exports = function(app) {
    // app.use("/home", function(request, response, next) {
    //     response.writeHead(200, { "Content-Type": "text/plain" });
    //     response.end("Welcome to the homepage!\n");
    // });
    //
    // app.use("/about", function(request, response, next) {
    //     response.writeHead(200, { "Content-Type": "text/plain" });
    //     response.end("Welcome to the aboutpage!\n");
    // });
    //
    // app.use(function(request, response) {
    //     response.writeHead(404, { "Content-Type": "text/plain" });
    //     response.end("404 error!\n");
    // });
    app.all('*', function(request, response, next){
        response.writeHead(200, { "Content-Type": "text/plain" });
        next();
    });
    app.get('/', function(req,res){
        res.end('welcome, to the homepage');
    });
    app.get('/login', function(req, res){
        res.end('welcome to the loginpage');
    });
    app.get('*', function(req, res){
        res.end('404 error');
    })
};