var fs = require('fs');

function MakeCheckboxes() {

}

function MakeRadio(question, id) {
    var template_start = '<div class="question"><p>' + question.Question + '</p>';
   
    var template_middle = '<div class="radioButton"><input type="radio" name="yesno' + "_" + i +'" value="yes"> Yes<br><input type="radio" name="yesno' + "_" + i +'" value="No"> No<br></div>'
    var template_end = "</div></div>";
    return template_start + template_middle + template_end;
}

function MakeScale(question){
    var template_start = '<div class="question"><p>' + question.Question + '</p><div class="slider">';
    var slider_max = question.Responses[0];
    var template_middle = '<input type="range" min="0" max="' + question.Responses[0] + '" value="' + slider_max / 2 + '" class="slider" id="pythonSlider">';
    var template_end = '</div></div>';
    return template_start + template_middle + template_end;
}

function MakeCheckboxes(question){
    var template_start = '<div class="question"><p>' + question.Question + '</p><div class="checkbox">';
    var template_middle = "";
    for (i = 0; i < question.Responses.length; i++)
    {
        template_middle += '<input type="checkbox"> ' + question.Responses[i] + '<br>';
    }
    var template_end = '</div></div>';
    return template_start + template_middle + template_end;
}

function Create_Section_For_Question(question)
{
    if (question.Type === "RADIO")
    {
        return MakeRadio(question);
    }
    if (question.Type === "SCALE")
    {
        return MakeScale(question);
    }
    if (question.Type === "CHECKBOX")
    {
        return MakeCheckboxes(question);
    }
}

data = { "LoginData": [{ "Session Name": "#", "Password": "Password", "Timeout": "20" }], "Questions": [{ "Id": 0, "Question": "This text is displayed to the user", "Priority": 1, "Responses": [10], "Aim_To_Match": true, "Type": "SCALE", "ResponseType": "Scale" }, { "Id": 1, "Question": "Can you work in a team", "Priority": 1, "Responses": ["Yes", "No"], "Aim_To_Match": true, "Type": "RADIO", "ResponseType": "Bool" }, { "Id": 2, "Question": "Which languages do you know", "Priority": 1, "Responses": ["C++", "Java", "C#"], "Aim_To_Match": false, "Type": "CHECKBOX", "ResponseType": "MultiBool" }] }

var top_page = fs.readFileSync("top_template.html", "utf8");

var bot_page = fs.readFileSync("bot_template.html", "utf8");

var mid_page;

for (i = 0; i < data.Questions.length; i++) {
    
    //var top = '<div class="question">';
    var middle = Create_Section_For_Question(data.Questions[i]);
    //var bottom = '</div>';

    mid_page +=  middle ;
}

var full_page = top_page + mid_page + bot_page;



fs.writeFile("generated.html", full_page, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 