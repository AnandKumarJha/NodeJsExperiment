var http = require('http');
var fs = require('fs');
//for file uploading
var formidable = require('formidable');

http.createServer((req, res) => {
    console.log(req.url);
    if (req.url == '/read') {
        fs.readFile('./html_files/index.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (req.url == '/create') {
        //The fs.open() method takes a "flag" as the second argument, 
        //if the flag is "w" for "writing", the specified file is opened 
        //for writing. If the file does not exist, an empty file is created:
        fs.open('./textFiles/test1.txt', 'w', (err, file) => {
            if (err) throw err;
            console.log('created!');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('file created');
        });

        //append can also be used
    } else if (req.url == '/open') {
        //same as create

    } else if (req.url == '/append') {
        //if file exist append the given text in the file otherwise create a 
        //new one and write the text 
        fs.appendFile('./textFiles/test1.txt', 'appended text', (err) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('Text Appended!');
        });
    } else if (req.url == '/write') {
        //if file exist overrite the given file otherwise create a 
        //new one and write the text 
        fs.writeFile('./textFiles/test1.txt', 'new text to write', (err) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('File written!');
            res.end();
        });
    } else if (req.url == '/update') {
        //same as write or append
    } else if (req.url == '/delete') {
        fs.unlink('./textFiles/test1.txt', (err) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            if (err) {
                res.write('' + err);
            } else {
                res.write("file deleted!");
            }
            res.end();
        });
    } else if (req.url == '/rename') {
        fs.rename('./txtFiles/test1.txt', './txtFiles/test2.txt', (err) => {
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.write('File renamed!');
            res.end();
        });
    } else if (req.url == '/upload') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="/uploadToServer" method="post" enctype="multipart/form-data" >');
        res.write('<input type="file" name="filetoupload">');
        res.write('<input type="submit" name="upload to server">');
        res.write('<form>');
        res.end();
    } else if (req.url == '/uploadToServer') {

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = './uploaded_files/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });

    } else {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.write('Something went wrong : ' + req.url);
        res.end();
    }

}).listen(3000);

