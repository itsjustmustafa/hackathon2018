var generator = require('./html_generator');
var fs = require('fs');



var data_read = "";

var data_read = JSON.parse(fs.readFileSync('sample_schema.json', 'utf8'));

var output = generator.generate(data_read);

fs.writeFile("../Server/public/surveys/generated.html", output, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 