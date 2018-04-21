var http = require("http");
var file_retriever = require("./file_retriever");
var url = require('url');
var public_folder = 'public';
var default_file = "/index.html"
var err_page = "/404.html"

http.createServer(function (request, response) {
    if (request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        if (request.url === "/")
        {
            request.url += default_file;
        }
        var requested_filename = public_folder + request.url;
        var default_filename = public_folder + err_page;
        
        response = file_retriever.ReadFile_OR_DefaultFile_OR_Text(
            requested_filename,
            default_filename,
            response
        );
    } else if (request.method === "POST") {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        var body = '';
        request.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        request.on('end', function () {
            console.log("Body: " + body);
        });
        var default_filename = public_folder + "/" + "404.html";
        
        response = file_retriever.ReadFile_OR_DefaultFile_OR_Text(
            default_filename,
            default_filename,
            response
        );
        
    }

}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
console.log('This is the console');