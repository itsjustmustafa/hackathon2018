var database = require('./db_interaction');

//THIS IS AN EXAMPLE OF HOW TO TURN THE GROUPS INTO A STRING
database.getResponseData("generated").then(function (data) {
    // use data

    //You're going to have to write your code here for what you want to do with the HTML output. 
    //IN this example, we save to file
    console.log(data);
});


