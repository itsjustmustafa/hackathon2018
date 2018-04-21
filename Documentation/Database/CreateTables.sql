CREATE TABLE forms (
    formID   INTEGER NOT NULL
                     PRIMARY KEY AUTOINCREMENT,
    formName TEXT    NOT NULL
                     UNIQUE,
    formPath TEXT    NOT NULL,
    formPass         NOT NULL
);

CREATE TABLE questions (
    questionID     INTEGER PRIMARY KEY AUTOINCREMENT
                           NOT NULL,
    formID                 NOT NULL
                           REFERENCES forms (formID) ON DELETE RESTRICT
                                                     ON UPDATE CASCADE,
    questionFormID INTEGER NOT NULL
);

CREATE TABLE students (
    studentID INTEGER PRIMARY KEY
                    NOT NULL
                    UNIQUE
);

CREATE TABLE answers (
    answerID     INTEGER PRIMARY KEY AUTOINCREMENT
                         NOT NULL,
    questionID   INTEGER NOT NULL
                         REFERENCES questions (questionID) ON DELETE RESTRICT
                                                           ON UPDATE CASCADE,
    formAnswerID INTEGER NOT NULL
);

CREATE TABLE responses (
    responseID        INTEGER         PRIMARY KEY AUTOINCREMENT
                                      NOT NULL,
    answerID          INTEGER         REFERENCES answers (answerID) ON DELETE RESTRICT
                                                                    ON UPDATE CASCADE
                                      NOT NULL,
    studentID         INTEGER         REFERENCES students (studentID) ON DELETE RESTRICT
                                                                      ON UPDATE CASCADE
                                      NOT NULL,
    responseType      VARCHAR (45)    NOT NULL,
    responseBool      BOOLEAN,
    responseScale     DECIMAL (10, 2),
    responseMultiBool TEXT
);
