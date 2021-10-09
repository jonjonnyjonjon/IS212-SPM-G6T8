DROP DATABASE IF EXISTS spmg6t8;
CREATE DATABASE spmg6t8;
USE spmg6t8;


DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    courseID VARCHAR(255),
    courseName VARCHAR(255),
    courseSummary VARCHAR(1000),
    class VARCHAR(255),
    size INT,
    trainer VARCHAR(255),
    enrolmentStart VARCHAR(255),
    enrolmentEnd VARCHAR(255),
    startDate VARCHAR(255),
    endDate VARCHAR(255),
    materialStatus BOOLEAN DEFAULT False,
    isPublished BOOLEAN DEFAULT False,
    hasPrereq BOOLEAN DEFAULT False,
    
    PRIMARY KEY (courseID)
);

INSERT INTO courses VALUES("CG1000C1", "Intro to Canon G1000", "C1", "Course Summary Here", 24, "John Appleseed", "10/09/2021", "20/09/2021", "24/09/2021", "08/10/2021", False, False, False);
INSERT INTO courses VALUES("CG1000C2", "Intro to Canon G1000", "C2", "Course Summary Here", 20, "John Appleseed", "10/09/2021", "20/09/2021", "24/09/2021", "08/10/2021", False, False, True);
INSERT INTO courses VALUES("CG2000C1", "Intro to Canon G2000", "C1", "Course Summary Here", 30, "Jane Doe", "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", False, False, False);
INSERT INTO courses VALUES ("CG2000C2", "Intro to Canon G2000", "C2", "Course Summary Here", 30, "Jack Sparrow", "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", DEFAULT, DEFAULT, True);


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
