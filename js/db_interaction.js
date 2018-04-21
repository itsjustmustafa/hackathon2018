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

  function addStudent(studentNum){
    let sql = 'INSERT INTO students(studentID) VALUES(?)';
    db.run(sql, [studentNum], function(err){
      if(err){
        console.log("Failed Insert!");
      }
    });
  }

  function addResponse(formName, questionID, studentID, response){

  }
}
