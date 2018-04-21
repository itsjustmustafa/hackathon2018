const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('././hackathon.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

function addForm(formData) {

  let splitForm = formData.split(`,`);
  let formName = splitForm[0];
  let formPath = splitForm[1];
  let formPass = splitForm[2];

  let sql = `INSERT INTO forms(formName, formPath, formPass) VALUES(?, ?, ?)`;
  let params = [formName, formPath, formPass];
  db.run(sql, params, function (err) {
    if (err) {
      console.log(err.message);
    }
  });

}

function addQuestion(questionData) {

  let splitQuestion = questionData.split(`,`);
  let formName = splitQuestion[0];
  let questionID = splitQuestion[1];

  let sql = `INSERT INTO questions(formID, questionFormID) VALUES(?, ?)`;
  let formSql = `SELECT formID FROM forms WHERE formName = ?`
  db.get(formSql, [formName], (err, row) => {
    if (err) {
      console.log(err.message);
    }
  });

  db.run(sql, [row], function (err) {
    if (err) {
      console.log(`Failed Insert!`);
    }
  });
}

  function addStudent(studentID) {
    let sql = `INSERT INTO students(studentID) VALUES(?)`;
    db.run(sql, [studentID], function (err) {
      if (err) {
        console.log(`Failed Insert!`);
      }
    });
  }

module.exports  = {
  addStudent(studentID) {
    let sql = `INSERT INTO students(studentID) VALUES(?)`;
    db.run(sql, [studentID], function (err) {
      if (err) {
        console.log(`Failed Insert!`);
      }
    });
  },

  add_Response(responseData) {

    let splitResponse = responseData.split(`,`);
    let formName = splitResponse[0];
    let studentID = splitResponse[1];
    let response = [];
    for(var i = 2; i < splitResponse.length; i++){
      response.push(splitResponse[i]);
    }
    let resLoc = 0;

    let stuCheck = `SELECT studentID FROM students WHERE studentID = ?`;
    db.get(stuCheck, [studentID], (err, stuRow) => {
      if (err) {
        console.log(err.message);
      }
      if (stuRow != studentID) {
        this.addStudent(studentID);
      }
    });

    let formSql = `SELECT formID FROM forms WHERE formName = ?`;
    var formRow;
    db.get(formSql, [formName], (err, formRow) => {
      if (err) {
        console.log(err.message);
      }
    });

    let questionSql = `SELECT questionID questionid, questionType questiontype, questionMaxVal FROM questions WHERE formID = ?`;
    db.each(questionSql, [formRow], (err, questionRow) => {
      if (err) {
        console.log(err.message);
      }
      else if (questionRow.questiontype == `SCALE`) {
        let resSql = `INSERT INTO response(questionID, studentID, responseScale) VALUES(?, ?, ?)`;
        db.run(resSql, [questionRow.questionid, studentID, response[resLoc]], function (err) {
          if (err) {
            console.log(`Failed Insert!`);
          }
        });
        resLoc += 1;
      } else if (questionRow.questiontype == `BOOL`) {
        let resSql = `INSERT INTO response(questionID, studentID, responseBool) VALUES(?, ?, ?)`;
        db.run(resSql, [questionRow.questionid, studentID, response[resLoc]], function (err) {
          if (err) {
            console.log(`Failed Insert!`);
          }
        });
        resLoc += 1;
      } else {
        let resSql = `INSERT INTO response(questionID, studentID, responseMultiBool) VALUES(?, ?, ?)`;
        let multiResponse = [];
        for(var i = resLoc; i < resLoc + questionRow.questionMaxVal; i++){
          multiResponse.push(response[i])
        }
        db.run(resSql, [questionRow.questionid, studentID, multiResponse], function (err) {
          if (err) {
            console.log(`Failed Insert!`);
          }
        });
        resLoc += questionRow.questionMaxVal;
      }
    });
  },

  getResponseData(formName) {

    var tempRes = [];
    var questionArray = [];
    var responses = [];
    var lastStudentID = -1;
    var offset = 0;

    let questionSql = `SELECT questionFormID, questionBal, questionMaxVal, questionType
                        FROM questions
                        JOIN forms ON questions.formID = forms.formID
                        WHERE formName = ?`

    db.each(questionSql, [formName], (err, questionRows) => {
      if (err) {
        console.log(`Failed getting questions!`);
      } else {
        if(questionRows.questionType != `MULTIBOOL`){
          let arrayIn = [questionRows.questionFormID + offset, questionRows.questionBal, questionRows.questionMaxVal];
          questionArray.push(arrayIn);
        }else{
          for(var i = 0; i < questionRows.questionMaxVal; i++){
            let arrayIn = [questionRows.questionFormID + offset + i, questionRows.questionBal, 1];
            questionArray.push(arrayIn);
          }
          offset += questionRows.questionMaxVal;
        }
      }
    });

    let formSql = `SELECT studentID, questionType, responseScale, responseBool, responseMultiBool
                    FROM responses
                    JOIN questions ON responses.questionID = questions.questionID
                    JOIN forms ON questions.formID = forms.formID
                    WHERE forms.formName = ?
                    ORDER BY studentID
                    AND questions.questionFormID`;

    db.each(formSql, [formName], (err, resRows) => {
      if (err) {
        console.log(`Failed to extract response information!`);
      } else {
        if (lastStudentID == -1) {
          lastStudentID = resRows.studentID;
        }
        if (lastStudentID != resRows.studentID) {
          lastStudentID = resRows.studentID;
          responses.push(tempRes);
          tempRes = [];
          tempRes.push(resRows.studentID);
        }
        if (resRows.questionType == 'SCALE') {
          tempRes.push(resRows.responseScale);
        } else if (resRows.questionType == `BOOL`) {
          tempRes.push(resRows.responseBool);
        } else if (resRows.questionType == `MULTIBOOL`) {
          let responseVal = resRows.split(`,`);
          for(var i = 0; i < responseVal.length; i++){
            tempRes.push(responseVal[i]);
          }
        }
      }
    });
    responses.push(questionArray);
    return responses;
  }
}
