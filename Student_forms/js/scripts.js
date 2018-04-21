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
    //event.preventDefault();
    //console.log(event);
    //studentID
    console.log(document.getElementById("questions").getElementsByClassName('studentNumber')[0].getElementsByTagName('input')[0].value);
    //Radiobutton
    if(Number(document.getElementById("questions").getElementsByClassName('radioButton')[0].getElementsByTagName("input")[0].checked) == 1){
    console.log(Number(true));
    }
    else{
    console.log(Number(false));
    }
    //slider
    console.log(document.getElementById('questions').getElementsByClassName('question')[1].getElementsByClassName('slider')[0].value);
    //Checkbox
    console.log(Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[0].checked));
    console.log(Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[1].checked));
    console.log(Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[2].checked));
    console.log(Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[3].checked));
    console.log(Number(document.getElementById("questions").getElementsByClassName('checkBox')[0].getElementsByTagName("input")[4].checked));
}