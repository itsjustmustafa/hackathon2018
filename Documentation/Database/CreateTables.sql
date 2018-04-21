CREATE TABLE `answers` (
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  `formAnswerID` int(11) NOT NULL,
  `questionID` int(11) NOT NULL,
  PRIMARY KEY (`answerID`),
  KEY `questionID_idx` (`questionID`),
  CONSTRAINT `questionID` FOREIGN KEY (`questionID`) REFERENCES `questions` (`questionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `forms` (
  `formID` int(11) NOT NULL AUTO_INCREMENT,
  `formName` varchar(45) NOT NULL,
  `formPath` varchar(45) NOT NULL,
  `formPass` varchar(45) NOT NULL,
  PRIMARY KEY (`formID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `questions` (
  `questionID` int(11) NOT NULL AUTO_INCREMENT,
  `formQuestionID` int(11) NOT NULL,
  `formID` int(11) NOT NULL,
  PRIMARY KEY (`questionID`),
  KEY `formID_idx` (`formID`),
  CONSTRAINT `formID` FOREIGN KEY (`formID`) REFERENCES `forms` (`formid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `responses` (
  `responseID` int(11) NOT NULL AUTO_INCREMENT,
  `answerID` int(11) NOT NULL,
  `responseType` varchar(45) NOT NULL,
  `responseBool` bit(1) DEFAULT NULL,
  `responseScale` decimal(10,2) DEFAULT NULL,
  `responseMultiBool` longtext,
  PRIMARY KEY (`responseID`),
  KEY `answerID_idx` (`answerID`),
  CONSTRAINT `answerID` FOREIGN KEY (`answerID`) REFERENCES `answers` (`answerid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `students` (
  `stuID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`stuID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
