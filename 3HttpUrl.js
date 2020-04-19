var http = require('http');
var url = require('url');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('The url is being used : <b>'+req.url+'</b>');
    var query = url.parse(req.url, true).query;
    res.write('the query is as follows <b>id :'+query.id+'</b> and <b> name :'+query.name+'</b>');
    res.end();

    //url 
    //http://localhost:3000/?id=200&name=anand
    
    //output
    //The url is being used : /?id=200&name=anandthe query is as follows id :200 and name :anand
}).listen(3000);