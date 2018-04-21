var database = require('./db_interaction');
var fs = require('fs');
//This class can access the database, get a bunch of responses, then use the tabular format. 



//THIS IS AN EXAMPLE OF HOW TO TURN THE "GENERATED" GROUP INTO A TABLE
database.getResponseData("generated").then(function (data) {
    // use data
    var top ="";
    fs.readFileSync('output_template/output_top.html', 'utf8', function (err,data) {
       top = data;
      });
      var bot ="";
      fs.readFileSync('output_template/output_bot.html', 'utf8', function (err,data) {
        bot = data;
       });
    fs.writeFile("./public/results/" + "generated.html", top + data + bot, function(err) {
        
        console.log("If you just saw a lot of text, the file saved!");
    }); 
    //You're going to have to write your code here for what you want to do with the HTML output. 
    //IN this example, we save to file
    console.log(data);
});


