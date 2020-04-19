var http = require('http');
var myModule = require('./my_custom_module/my_module');

http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('hello guys '+myModule.my_var);
    res.end();
}).listen(3000);