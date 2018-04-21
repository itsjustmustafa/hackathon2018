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