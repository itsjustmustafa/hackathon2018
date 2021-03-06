const sqlite3 = require('sqlite3').verbose();
var sorter = require('./algorithm/sort_alrogirithm');
var Formatter = require('./algorithm/groups_to_html');


let db = new sqlite3.Database('hackathon.db', sqlite3.OPEN_READWRITE, (err) => {
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

module.exports = {
  addStudent(studentID) {
    let sql = `INSERT INTO students(studentID) VALUES(?)`;
    db.run(sql, [studentID], function (err) {
      if (err) {
        console.log(err.message);
      }
    });
  },

  add_Response(responseData) {

    let splitResponse = responseData.split(`,`);
    let formName = splitResponse[0];
    let studentID = splitResponse[1];
    let response = [];
    for (var i = 2; i < splitResponse.length; i++) {
      response.push(splitResponse[i]);
    }
    let resLoc = 0;

    let stuCheck = `SELECT studentID FROM students WHERE studentID = ?`;
    db.get(stuCheck, [studentID], (err, stuRow) => {
      if (err) {
        console.log(err.message);
      }
      else if (stuRow != studentID) {
        this.addStudent(studentID);
      }
    });

    let questionSql = `SELECT questionID questionid, questionType questiontype, questionMaxVal
                         FROM questions
                         JOIN forms ON questions.formID = forms.formID
                         WHERE formName = ?`;
    db.each(questionSql, [formName], (err, questionRow) => {
      if (err) {
        console.log(err.message);
      }
      else if (questionRow.questiontype == `SCALE`) {
        let resSql = `INSERT INTO responses(questionID, studentID, responseScale) VALUES(?, ?, ?)`;
        db.run(resSql, [questionRow.questionid, studentID, response[resLoc]], function (err) {
          if (err) {
            console.log(err.message);
          }
        });
        resLoc += 1;
      } else if (questionRow.questiontype == `BOOL`) {
        let resSql = `INSERT INTO responses(questionID, studentID, responseBool) VALUES(?, ?, ?)`;
        db.run(resSql, [questionRow.questionid, studentID, response[resLoc]], function (err) {
          if (err) {
            console.log(err.message);
          }
        });
        resLoc += 1;
      } else {
        let resSql = `INSERT INTO responses(questionID, studentID, responseMultiBool) VALUES(?, ?, ?)`;
        let fullResponse = ``;
        for (var i = resLoc; i < resLoc + questionRow.questionMaxVal; i++) {
          if (i != resLoc + questionRow.questionMaxVal - 1) {
            fullResponse += response[i].toString() + `,`;
          } else {
            fullResponse += response[i].toString();
          }
        }

        db.run(resSql, [questionRow.questionid, studentID, fullResponse], function (err) {
          if (err) {
            console.log(err.message);
          }
        });
        resLoc += questionRow.questionMaxVal;
      }
    });
  },

  getResponseData(formName) {
    return new Promise(function (resolve, reject) {
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
          reject(err)
          console.log(`Failed getting questions!`);
        } else {
          if (questionRows.questionType != `MULTIBOOL`) {
            let arrayIn = [questionRows.questionFormID + offset, questionRows.questionBal, questionRows.questionMaxVal];
            questionArray.push(arrayIn);
          } else {
            for (var i = 0; i < questionRows.questionMaxVal; i++) {
              let arrayIn = [questionRows.questionFormID + offset + i, questionRows.questionBal, 1];
              questionArray.push(arrayIn);
            }
            offset += questionRows.questionMaxVal;
          }
        }
      });
      responses.push(questionArray);
      let formSql = `SELECT studentID, questionType, responseScale, responseBool, responseMultiBool
                      FROM responses
                      JOIN questions ON responses.questionID = questions.questionID
                      JOIN forms ON questions.formID = forms.formID
                      WHERE forms.formName = ?
                      ORDER BY studentID
                      AND questions.questionFormID`;
      var count = 0;
      var newcount = 0;
      db.each(formSql, [formName], (err, resRows) => {
        count += 1;
      });

      db.each(formSql, [formName], (err, resRows) => {
        if (err) {
          reject(err);
          console.log(`Failed to extract response information!`);
        } else {
          newcount += 1;

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
            let responseVal = resRows.responseMultiBool.split(`,`);
            for (var i = 0; i < responseVal.length; i++) {
              if (responseVal[i] == `false`) {
                tempRes.push(0);
              } else {
                tempRes.push(1);
              }
            }
          }
        }
        if (newcount === count) {
          console.log(formSql);
         




          var data = responses;
          //ANOTHER SECTION 
          var break_at = -1;
          var break_set = false;
          var num_to_kill = 2;
          for (var i = 2; i < data.length; i++) {
            if (i == break_at) {
              break;
            }
            for (var j = i + 1; j < data.length; j++) {
              if (data[i][0] === data[j][0]) {
                if (break_set === false) {
                  break_at = j;
                  break_set = true;
                }
                data[j].shift();
                data[i].push.apply(data[i], data[j]);
              }
            }


            num_to_kill += 1;
          }
          data = data.slice(0, num_to_kill - 1);
          console.log("DATA");
          var returner = {
            metadata: data[0],
            responses: data.slice(2, data.length)
          }

          var cleanedGroup = new Array();
          for (i = 0; i < returner.responses.length; i++)
          {
            var item = {
              'id': returner.responses[i][0],
              'responses': returner.responses[i].slice(0, returner.responses[i].length)
            }
            cleanedGroup.push(item);

          }

          var out = sorter.SortGroup(cleanedGroup, 3, returner.metadata);
          resolve(Formatter.generate_html(out));
          //Run Mazza's Function


        }
      });


    })
  }
}
