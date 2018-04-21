var generator = require('./html_generator');
var fs = require('fs');

data = { "LoginData": [{ "Session Name": "#", "Password": "Password", "Timeout": "20" }], "Questions": [{ "Id": 0, "Question": "This text is displayed to the user", "Priority": 1, "Responses": [10], "Aim_To_Match": true, "Type": "SCALE", "ResponseType": "Scale" }, { "Id": 1, "Question": "Can you work in a team", "Priority": 1, "Responses": ["Yes", "No"], "Aim_To_Match": true, "Type": "RADIO", "ResponseType": "Bool" }, { "Id": 2, "Question": "Which languages do you know", "Priority": 1, "Responses": ["C++", "Java", "C#"], "Aim_To_Match": false, "Type": "CHECKBOX", "ResponseType": "MultiBool" }] }
var output = generator.generate(data);

fs.writeFile("generated.html", output, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 