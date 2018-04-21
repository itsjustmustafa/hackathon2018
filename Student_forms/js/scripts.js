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

    var checkboxComplete = (checkBoxOne + ", " + checkBoxTwo + ", " + checkBoxThree + ", " + checkBoxFour + ", " + checkBoxFive)

    var completeForm = (studID + ", " + radBut + ", " + sliderValue + ", " + checkboxComplete);
    
    console.log(completeForm);
}