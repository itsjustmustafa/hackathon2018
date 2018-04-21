var mysql = require('db_connect.js')

function addForm(formName, formPath, formPass){

  let sql = 'INSERT INTO forms(formName, formPath, formPass) VALUES(?), (?), (?)';
  let params = [formName, formPath, formPass];
  db.run(sql, params, function(err){
    if(err){
      console.log('Failed insert!');
    }
  });

}

function addQuestion(formName, questionID){
  let sql = 'INSERT INTO questions(formID, questionFormID) VALUES(?), (?)';
  let formSql = 'SELECT formID FROM forms WHERE formName = ?'
  db.get(formSql, [formName], (err, row) =>{
    if(err){
      console.log(err.message);
    }
  });

  db.run(sql, [row], function(err){
    if(err){
      console.log('Failed Insert!');
    }
  });

  function addStudent(studentID){
    let sql = 'INSERT INTO students(studentID) VALUES(?)';
    db.run(sql, [studentID], function(err){
      if(err){
        console.log('Failed Insert!');
      }
    });
  }

  function addResponse(formName, questionID, studentID, response){

    let stuCheck = 'SELECT studentID FROM students WHERE studentID = ?';
    db.get(stuCheck, [studentID], (err, stuRow) =>{
      if(err){
        console.log(err.message);
      }
      if(stuRow != studentID){
        addStudent(studentID);
      }
    });

    let formSql = 'SELECT formID FROM forms WHERE formName = ?';
    db.get(formSql, [formName], (err, formRow) =>{
      if(err){
        console.log(err.message);
      }
    });

    let questionSql = 'SELECT questionID questionid, questionType questiontype FROM questions WHERE formQuestionID = ? AND formID = ?';
    db.get(questionSql, [questionID, formRow], (err, questionRow) =>{
      if(err){
        console.log(err.message);
      }
    });

    if(questionRow.questiontype == 'SCALE'){
      let resSql = 'INSERT INTO response(questionID, studentID, responseScale) VALUES(?), (?), (?)';
      db.run(resSql, [questionRow.questionid, studentID, response] function(err){
        if(err){
          console.log('Failed Insert!');
        }
      });
    }else if(questionRow.questiontype == 'BOOL'){
      let resSql = 'INSERT INTO response(questionID, studentID, responseBool) VALUES(?), (?), (?)';
      db.run(resSql, [questionRow.questionid, studentID, response] function(err){
        if(err){
          console.log('Failed Insert!');
        }
      });
    }else{
      let resSql = 'INSERT INTO response(questionID, studentID, responseMultiBool) VALUES(?), (?), (?)';
      db.run(resSql, [questionRow.questionid, studentID, response] function(err){
        if(err){
          console.log('Failed Insert!');
        }
      });
    }
  }

  function getResponseData(formName){
    let formSql =   'SELECT studentID, '
  }
}
