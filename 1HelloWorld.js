var http = require('http');

http.createServer((req, res)=>{

    // //1st way
    // res.write("hello world");
    // res.end();

    // //second way
    // res.end("hello world 2");

    //third way
    //when you want to send html data
    res.writeHead(200, {'Content-type':'text/html'});
    res.write("Hello <h1>world</h1> 3");
    res.end();//to close 
}).listen(3000);