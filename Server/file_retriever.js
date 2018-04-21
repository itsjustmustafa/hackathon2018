var fs = require('fs');

function ReadFile_Or_Text(filename, text, response) {
    fs.readFile(filename, function (err, data) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        if (err) {
            return response.end(text);
        }
        response.write(data);
        return response.end();
    });
}

module.exports = {
    

    ReadFile_OR_DefaultFile_OR_Text(Requested_Filename, Default_Filename, response) {
        fs.readFile(Requested_Filename, function (err, data) {
            if (err) {
                return ReadFile_Or_Text(Default_Filename, "404", response);
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            return response.end();
        });
    }
}