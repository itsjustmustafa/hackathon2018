

let session;
window.onload = function () {
  session = null;
  if (location.href.split('?').length > 1) {
    session = location.href.split('?')[1];
  }
}

main = function () {
  document.getElementById('questions').getElementsByTagName('button')[0].addEventListener("submit", submitForm, false);
}
function PostToServer(content) {
  var url = "http://127.0.0.1:8081";
  var method = "POST"
  var request = new XMLHttpRequest();
  request.onload = function () {
    var status = request.status;
    var data = request.responseText;
  }
  request.open(method, url, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send("content");
}

submitForm = function (event) {
  //studentID
  var studID = (document.getElementById("questions").getElementsByClassName('studentNumber')[0].getElementsByTagName('input')[0].value);


  var AllQuestions = document.getElementsByClassName("question");

  response = "";
  for (i = 0; i < AllQuestions.length; i++) {
    answer_node = AllQuestions[i].childNodes[1];
    question_type = AllQuestions[i].childNodes[1].className;
    
    if (question_type === "radioButton") {
      if (Number(answer_node.getElementsByTagName("input")[0].checked) == 1) {
        response += "1"
      } else {
        response += "0"
      }
    }
    else if (question_type === "checkbox") {
      checkboxes = answer_node.getElementsByTagName('input');
      for (j = 0; j < checkboxes.length; j++) {
        
        response += checkboxes[i].checked;
        response += ",";
      }
      response = response.substring(0, response.length - 1)
    }
    else if (question_type === "slider") {
      response += answer_node.getElementsByClassName('slider')[0].value;
    }
    response += ",";
  }
  
  var path = window.location.pathname;
  var page = path.split("/").pop();
  var formname = page.split(".html")[0];

  var completeForm = (formname + "," + studID + "," + response);
  PostToServer(completeForm);

  //this is the final result - turn to a http posts
  console.log(completeForm);
}



//spoof data - 100 random responses
var randomResponses = [];

for (let i = 0; i < 100; i++) {

  randomResponses.push([
    i + 10000000,
    Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 10 + 1),
    Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 2),
  ]);
}