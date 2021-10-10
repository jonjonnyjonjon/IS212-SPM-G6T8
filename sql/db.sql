DROP DATABASE IF EXISTS spmg6t8;
CREATE DATABASE spmg6t8;
USE spmg6t8;


DROP TABLE IF EXISTS trainers;
CREATE TABLE trainers (
	name varchar(255),
    email varchar(255),
    password varchar(255),
    qualified varchar(255),
    
    PRIMARY KEY (email)
);


INSERT INTO trainers VALUES("John Appleseed", "johnappleseed.2021@aio.com", "password123", "CG1000");
INSERT INTO trainers VALUES("Jack Sparrow", "jacksparrow.2021@aio.com", "password456", "CG2000");
INSERT INTO trainers VALUES("Jane Doe", "janedoe.2021@aio.com", "password789", "CG2000");

DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    courseID VARCHAR(255),
    courseName VARCHAR(255),
    class VARCHAR(255),
    courseSummary VARCHAR(1000),
    size INT,
    trainerEmail VARCHAR(255),
    enrolmentStart VARCHAR(255),
    enrolmentEnd VARCHAR(255),
    startDate VARCHAR(255),
    endDate VARCHAR(255),
    materialStatus BOOLEAN DEFAULT False,
    isPublished BOOLEAN DEFAULT False,
    hasPrereq BOOLEAN DEFAULT False,
    
    PRIMARY KEY (courseID),
	CONSTRAINT trainer_fk FOREIGN KEY (trainerEmail) REFERENCES trainers(email)
);

-- update: populating John Appleseed's courses for demo
INSERT INTO courses VALUES("CG1000C1", "Intro to Canon G1000", "C1", "Course Summary Here", 24, "johnappleseed.2021@aio.com", "10/09/2021", "20/09/2021", "24/09/2021", "08/11/2021", False, False, False);
INSERT INTO courses VALUES("CG1000C2", "Intro to Canon G1000", "C2", "Course Summary Here", 20, "johnappleseed.2021@aio.com", "10/09/2021", "20/09/2021", "28/09/2021", "08/12/2021", False, False, True);
INSERT INTO courses VALUES("CG3000C1", "Intro to Canon G3000", "C1", "Course Summary Here", 25, "johnappleseed.2021@aio.com", "10/09/2021", "20/09/2021", "12/11/2021", "28/12/2021", False, False, True);
INSERT INTO courses VALUES("CG3000C2", "Intro to Canon G3000", "C2", "Course Summary Here", 28, "johnappleseed.2021@aio.com", "10/09/2021", "20/09/2021", "23/07/2021", "10/11/2021", False, False, True);
INSERT INTO courses VALUES('CG4000C1', 'Intro to Canon G4000', 'C1', 'Course Summary Here', '28', 'johnappleseed.2021@aio.com', '10/09/2021', '20/09/2021', '30/12/2021', '06/02/2022', False, False, True);
INSERT INTO courses VALUES('CG4000C2', 'Intro to Canon G4000', 'C2', 'Course Summary Here', '28', 'johnappleseed.2021@aio.com', '10/09/2021', '20/09/2021', '28/09/2021', '15/12/2021', False, False, True);
INSERT INTO courses VALUES('CG4000C3', 'Intro to Canon G4000', 'C3', 'Course Summary Here', '28', 'johnappleseed.2021@aio.com', '10/09/2021', '20/09/2021', '10/11/2021', '27/12/2021', False, False, True);

INSERT INTO courses VALUES("CG2000C1", "Intro to Canon G2000", "C1", "Course Summary Here", 30, "janedoe.2021@aio.com", "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", False, False, False);
INSERT INTO courses VALUES ("CG2000C2", "Intro to Canon G2000", "C2", "Course Summary Here", 30, "jacksparrow.2021@aio.com", "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", DEFAULT, DEFAULT, True);

DROP TABLE IF EXISTS engineers;
CREATE TABLE engineers
(
	name varchar(255),
    email varchar(255),
    password varchar(255),
    
    PRIMARY KEY (email)
);

INSERT INTO engineers VALUES("Keith Chiang", "keithchiang.2019@aio.com", "password123");
INSERT INTO engineers VALUES("Jonathan Wong", "htwong.2019@aio.com", "password456");

DROP TABLE IF EXISTS completed_courses;
CREATE TABLE completed_courses (
    email varchar(255),
    courseID VARCHAR(255),
    completedDate VARCHAR(255),
    
    CONSTRAINT completed_pk PRIMARY KEY (email, courseID),
    CONSTRAINT completed_fk1 FOREIGN KEY (email) REFERENCES engineers(email),
    CONSTRAINT completed_fk2 FOREIGN KEY (courseID) REFERENCES courses(courseID)
);

INSERT INTO completed_courses VALUES("keithchiang.2019@aio.com", "CG1000C1", "08/10/2021");

DROP TABLE IF EXISTS course_prereq;
CREATE TABLE course_prereq (
    courseID VARCHAR(255),
    prereqCourseID VARCHAR(255),

    CONSTRAINT prereq_pk PRIMARY KEY (courseID, prereqCourseID),
    CONSTRAINT prereq_pk1 FOREIGN KEY (courseID) REFERENCES courses(courseID),
    CONSTRAINT prereq_pk2 FOREIGN KEY (prereqCourseID) REFERENCES courses(courseID)
);

INSERT INTO course_prereq VALUES("CG1000C2", "CG1000C1");
INSERT INTO course_prereq VALUES("CG2000C2", "CG2000C1");


# addition 10 oct: for quiz, course_materials and question tables. 


DROP TABLE IF EXISTS quiz;
CREATE TABLE quiz (
	quizID INT,
    courseID VARCHAR(255),
    chapterID INT,
    hasQuestions BOOLEAN DEFAULT False,
    
    CONSTRAINT quiz_pk PRIMARY KEY (QuizID, courseID, chapterID),
	CONSTRAINT quiz_fk1 FOREIGN KEY (courseID) REFERENCES courses(courseID)
);

INSERT INTO quiz VALUES(1, "CG1000C1", 1, False );
INSERT INTO quiz VALUES(2, "CG1000C1", 2, False );
INSERT INTO quiz VALUES(3, "CG1000C1", 3, False );

DROP TABLE IF EXISTS question;
CREATE TABLE question (
	quizID INT,
	questionID INT,
	question VARCHAR(1000),
    type VARCHAR(3), 
    duration INT, 
    option1 VARCHAR(1000), 
    option2 VARCHAR(1000), 
    option3 VARCHAR(1000), 
    option4 VARCHAR(1000), 
    answer INT, 
    hasQuestions BOOLEAN DEFAULT False,
    
    CONSTRAINT question_pk PRIMARY KEY (questionID, quizID),
	CONSTRAINT question_fk1 FOREIGN KEY (quizID) REFERENCES quiz(quizID)
);

INSERT INTO question VALUES(1, 1, "What are the steps to operate a Canon printer?", "MCQ", 60, "On the printer", "Load paper in the printer", "Sleep", "Have a mental breakdown", 4, False );
INSERT INTO question VALUES(1, 2, "Question 2", "MCQ", 60, "sleep", "sleep more", "cry", "Have a mental breakdown", 3, False );


DROP TABLE IF EXISTS course_materials;
CREATE TABLE course_materials (
    courseID VARCHAR(255),
    chapterID INT,
    content BLOB,
    quizID INT,
    
    CONSTRAINT materials_pk PRIMARY KEY (courseID, chapterID),
	CONSTRAINT materials_fk1 FOREIGN KEY (courseID) REFERENCES courses(courseID),
    CONSTRAINT materials_fk2 FOREIGN KEY (quizID) REFERENCES quiz(quizID)
);

INSERT INTO course_materials VALUES("CG1000C1", 1,  "https://www.youtube.com/watch?v=x38SpWKT_Os&ab_channel=DIYwithAK", 1);
INSERT INTO course_materials VALUES("CG1000C1", 2,  "https://www.youtube.com/watch?v=x38SpWKT_Os&ab_channel=DIYwithAK", 2);
