

let session;
  window.onload = function(){
    session = null;
    if(location.href.split('?').length>1){
      session = location.href.split('?')[1];
    }
  }

  main = function(){
    document.getElementById('questions').getElementsByTagName('button')[0].addEventListener("submit", submitForm, false);
}
function PostToServer (content)
{
  var url = "http://127.0.0.1:8081";
  var method = "POST"
  var request = new XMLHttpRequest(); 
  request.onload = function () {
    var status = request.status;
    var data = request.responseText; 
 }
 request.open(method,url,true);
 request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 request.send("value=" + content);
}

submitForm = function(event){
    //studentID
    var studID = (document.getElementById("questions").getElementsByClassName('studentNumber')[0].getElementsByTagName('input')[0].value);
    //Radiobutton
    if(Number(document.getElementById("questions").getElementsByClassName('radioButton')[0].getElementsByTagName("input")[0].checked) == 1){
    var radBut = (Number(true));
    }
    else{
    var radBut = (Number(false));
    }
    //slider
    var sliderValue = (document.getElementById('questions').getElementsByClassName('question')[1].getElementsByClassName('slider')[0].value);
    //Checkbox
    var checkBoxOne = (Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[0].checked));
    var checkBoxTwo = (Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[1].checked));
    var checkBoxThree = (Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[2].checked));
    var checkBoxFour = (Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[3].checked));
    var checkBoxFive = (Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[4].checked));

    var checkboxComplete = (checkBoxOne + "," + checkBoxTwo + "," + checkBoxThree + "," + checkBoxFour + "," + checkBoxFive)

    var completeForm = (studID + "," + radBut + "," + sliderValue + "," + checkboxComplete);
    var completeForm_Object = {
      studID,radBut,sliderValue,checkboxComplete
    }
    
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var formname = page.split(".html")[0];
    console.log( page );
    var completeForm = (formname + "," + studID + "," + radBut + "," + sliderValue + "," + checkboxComplete);
    PostToServer(completeForm);

   
    //this is the final result - turn to a http posts
    console.log(completeForm);
}



//spoof data - 100 random responses
var randomResponses = [];

for(let i = 0 ; i < 100; i++){
    
    randomResponses.push([
        i + 10000000,
        Math.floor(Math.random()* 2),
        Math.floor(Math.random()* 10 + 1),
        Math.floor(Math.random()* 2),
        Math.floor(Math.random()* 2),
        Math.floor(Math.random()* 2),
        Math.floor(Math.random()* 2),
        Math.floor(Math.random()* 2),   
    ]);
}