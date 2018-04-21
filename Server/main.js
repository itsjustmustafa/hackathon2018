var http = require("http");
var fs = require('fs');
var url = require('url');

function ReadFile_Or_Text(filename, text, response)
{
    fs.readFile(filename, function (err, data) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        if (err) {
            return response.end(text);
        }
        response.write(data);
        return res.end();
    });
}

function ReadFile_OR_DefaultFile_OR_Text(Requested_Filename, Default_Filename, response)
{
    fs.readFile(Requested_Filename, function (err, data) {
        if (err) {
            return ReadFile_Or_Text(Default_Filename, "404", response);
        }
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        return response.end();
    });
}



http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    var requested_filename = "public" + request.url;
    
    response = ReadFile_OR_DefaultFile_OR_Text(requested_filename,"404.html",response);
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
console.log('This is the console');