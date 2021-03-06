var fs = require('fs');


function MakeRadio(question, id) {
    var template_start = '<div class="question"><p>' + question.Question + '</p>';

    var template_middle = '<div class="radioButton"><input type="radio" name="yesno' + "_" + i + '" value="yes"> Yes<br><input type="radio" name="yesno' + "_" + i + '" value="No"> No<br></div>'
    var template_end = "</div></div>";
    return template_start + template_middle + template_end;
}

function MakeScale(question) {
    var template_start = '<div class="question"><p>' + question.Question + '</p><div class="slider">';
    var slider_max = question.Responses[0];
    var template_middle = '<input type="range" min="0" max="' + question.Responses[0] + '" value="' + slider_max / 2 + '" class="slider" id="pythonSlider">';
    var template_end = '</div></div>';
    return template_start + template_middle + template_end;
}

function MakeCheckboxes(question) {
    var template_start = '<div class="question"><p>' + question.Question + '</p><div class="checkbox">';
    var template_middle = "";
    for (i = 0; i < question.Responses.length; i++) {
        template_middle += '<input type="checkbox"> ' + question.Responses[i] + '<br>';
    }
    var template_end = '</div></div>';
    return template_start + template_middle + template_end;
}

function Create_Section_For_Question(question) {
    if (question.Type === "RADIO") {
        return MakeRadio(question);
    }
    if (question.Type === "SCALE") {
        return MakeScale(question);
    }
    if (question.Type === "CHECKBOX") {
        return MakeCheckboxes(question);
    }
}

module.exports = {
    //In goes a schema, out comes a HTML
    generate(json) {
        var top_page = fs.readFileSync("output_template/output_top.html", "utf8");
        var bot_page = fs.readFileSync("output_template/output_bot.html", "utf8");
        var mid_page ="";

        for (i = 0; i < json.Questions.length; i++) {
            var middle = Create_Section_For_Question(json.Questions[i]);
            mid_page += middle;
        }

        var full_page = top_page + mid_page + bot_page;
        return full_page;
        fs.writeFile("../Server/public/surveys/generated.html", full_page, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    }

}


