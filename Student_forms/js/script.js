var questions = new Vue({
    el: '#questions',
    data: {
      studentID: '',
      yesOrNo: '',
      checkedResponses: []
    }
  })

let session;
  window.onload = function(){
    session = null;
    if(location.href.split('?').length>1){
      session = location.href.split('?')[1];
    }
  }

  main = function(){
    document.getElementById('questions').getElementsByTagName('button')[0].addEventListener("button", submitForm, false);
    console.log("test");
  }

submitForm = function(event){
  // event.preventDefault();
  console.log("hi");
}