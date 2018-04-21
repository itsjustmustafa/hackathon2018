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
    console.log(event);
}