DROP DATABASE IF EXISTS spmg6t8;
CREATE DATABASE spmg6t8;
USE spmg6t8;

################################################################################################################

DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    course_id VARCHAR(255),
    course_name VARCHAR(255),
    course_summary VARCHAR(1000),
    has_prereq BOOLEAN DEFAULT False,
    
    PRIMARY KEY (course_id)
);

INSERT INTO courses VALUES("CG1000", "Intro to Canon G1000", "Lorem Ipsum", False);
INSERT INTO courses VALUES("CG2000", "Intro to Canon G2000", "Lorem Ipsum", True);
INSERT INTO courses VALUES("CG3000", "Intro Canon G3000", "Lorem Ipsum", True);
INSERT INTO courses VALUES("XK1000", "Intro to Xerox K1000", "Lorem Ipsum", False);
INSERT INTO courses VALUES ("BG1000", "Intro to Brother G1000", "Lorem Ipsum", False);
INSERT INTO courses VALUES ("BG2000", "Intermediate Brother G1000", "Lorem Ipsum", True);
INSERT INTO courses VALUES ("BG3000", "Advanced Brother G1000", "Lorem Ipsum", True);

################################################################################################################

DROP TABLE IF EXISTS trainers;
CREATE TABLE trainers (
    email varchar(255),
	name varchar(255),
	password varchar(255),
    qualified varchar(255),
    
    PRIMARY KEY (email)
);

INSERT INTO trainers VALUES("johnappleseed.2021@aio.com", "John Appleseed", "ja", "CG1000");
INSERT INTO trainers VALUES("jacksparrow.2021@aio.com", "Jack Sparrow", "js", "CG2000");
INSERT INTO trainers VALUES("janedoe.2021@aio.com", "Jane Doe", "jd", "CG2000");

################################################################################################################

DROP TABLE IF EXISTS engineers;
CREATE TABLE engineers (
    email varchar(255),
    password varchar(255),
	name varchar(255),
    
    PRIMARY KEY (email)
);

INSERT INTO engineers VALUES("keithchiang.2019@aio.com", "Keith Chiang", "kc");
INSERT INTO engineers VALUES("htwong.2019@aio.com", "Jonathan Wong", "jw");
INSERT INTO engineers VALUES("krystenng.2019@aio.com", "Krysten Ng", "kn");
INSERT INTO engineers VALUES("hqyuen.2019@aio.com", "Yuen Huiqi", "hq");

################################################################################################################

DROP TABLE IF EXISTS classes;
CREATE TABLE classes (
    course_id VARCHAR(255),
    class_id VARCHAR(255),
    trainer_email VARCHAR(255),
    size INT,
    current_enrolled INT,
    enrolment_start VARCHAR(255),
    enrolment_end VARCHAR(255),
    course_start VARCHAR(255),
    course_end VARCHAR(255),
    material_status BOOLEAN DEFAULT False,
    is_published BOOLEAN DEFAULT False,
    
    CONSTRAINT classes_pk PRIMARY KEY (course_id, class_id),
    CONSTRAINT classes_fk1 FOREIGN KEY (trainer_email) REFERENCES trainers(email)
);

# populating data for johnappleseed.2021@aio.com
INSERT INTO classes VALUES("CG1000", "C1", "johnappleseed.2021@aio.com", 10, 0, "10/09/2021", "20/09/2021", "24/09/2021", "30/11/2021", False, False);
INSERT INTO classes VALUES("CG1000", "C2", "johnappleseed.2021@aio.com", 10, 0, "10/09/2021", "20/09/2021", "28/09/2021", "13/11/2021", True, False);
INSERT INTO classes VALUES("BG1000", "C1", "johnappleseed.2021@aio.com", 10, 0, "10/09/2021", "20/09/2021", "02/10/2021", "23/12/2021", False, False);
INSERT INTO classes VALUES("BG1000", "C2", "johnappleseed.2021@aio.com", 10, 0, "10/09/2021", "20/09/2021", "08/11/2021", "28/12/2021", False, False);
INSERT INTO classes VALUES("XK1000", "C1", "johnappleseed.2021@aio.com", 10, 0, "10/09/2021", "20/09/2021", "17/10/2021", "29/12/2021", False, False);
INSERT INTO classes VALUES("XK1000", "C2", "johnappleseed.2021@aio.com", 10, 0, "10/09/2021", "20/09/2021", "13/11/2021", "27/11/2021", False, False);
INSERT INTO classes VALUES("XK1000", "C3", "johnappleseed.2021@aio.com", 10, 0, "10/09/2021", "20/09/2021", "14/09/2021", "25/12/2021", False, False);

INSERT INTO classes VALUES("CG1000", "C3", "jacksparrow.2021@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", True, True);
INSERT INTO classes VALUES ("CG1000", "C4", "jacksparrow.2021@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", True, True);

INSERT INTO classes VALUES("CG2000", "C1", "jacksparrow.2021@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", True, False);
INSERT INTO classes VALUES ("CG2000", "C2", "jacksparrow.2021@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", True, True);

# keith-newTestCases
INSERT INTO classes VALUES("BG1000", "C3", "janedoe.2021@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", True, True); # keith-completed
INSERT INTO classes VALUES ("BG2000", "C1", "janedoe.2021@aio.com", 10, 0, "01/09/2021", "15/09/2021", "16/09/2021", "20/10/2021", True, True); # keith-ongoing
INSERT INTO classes VALUES ("BG3000", "C1", "janedoe.2021@aio.com", 10, 0, "01/09/2021", "15/09/2021", "16/09/2021", "20/10/2021", True, True); # keith-ineligibleToTake
INSERT INTO classes VALUES ("CG3000", "C1", "janedoe.2021@aio.com", 10, 0, "01/09/2021", "15/09/2021", "16/09/2021", "20/10/2021", True, True); # keith-ongoing
INSERT INTO classes VALUES("XK1000", "C4", "janedoe.2021@aio.com", 10, 0, "12/10/2021", "20/10/2021", "21/10/2021", "21/11/2021", True, True); # keith-toEnroll

################################################################################################################

DROP TABLE IF EXISTS completed_courses;
CREATE TABLE completed_courses (
    engineer_email varchar(255),
    course_id VARCHAR(255),
    class_id VARCHAR(255),
    completed_date VARCHAR(255),
    
    CONSTRAINT completed_courses_pk PRIMARY KEY (engineer_email, course_id, class_id),
    CONSTRAINT completed_courses_fk1 FOREIGN KEY (engineer_email) REFERENCES engineers(email),
    CONSTRAINT completed_courses_fk2 FOREIGN KEY (course_id, class_id) REFERENCES classes(course_id, class_id)
);

INSERT INTO completed_courses VALUES("htwong.2019@aio.com", "CG1000", "C1", "08/10/2021");

INSERT INTO completed_courses VALUES("keithchiang.2019@aio.com", "CG1000", "C1", "08/10/2021");
INSERT INTO completed_courses VALUES("keithchiang.2019@aio.com", "CG2000", "C2", "08/10/2021");
INSERT INTO completed_courses VALUES("keithchiang.2019@aio.com", "BG1000", "C3", "08/10/2021");

################################################################################################################

DROP TABLE IF EXISTS course_prereq;
CREATE TABLE course_prereq (
    course_id VARCHAR(255),
    prereq_course_id VARCHAR(255),

    CONSTRAINT prereq_pk PRIMARY KEY (course_id, prereq_course_id),
    CONSTRAINT prereq_pk1 FOREIGN KEY (course_id) REFERENCES courses(course_id),
    CONSTRAINT prereq_pk2 FOREIGN KEY (prereq_course_id) REFERENCES courses(course_id)
);

INSERT INTO course_prereq VALUES("CG2000", "CG1000");

INSERT INTO course_prereq VALUES("CG3000", "CG1000");
INSERT INTO course_prereq VALUES("CG3000", "CG2000");

INSERT INTO course_prereq VALUES("BG2000", "BG1000");
INSERT INTO course_prereq VALUES("BG3000", "BG2000");

################################################################################################################

DROP TABLE IF EXISTS enrolled;
CREATE TABLE enrolled (
    engineer_email VARCHAR(255),
    course_id VARCHAR(255),
    class_id VARCHAR(255),
    
    CONSTRAINT enrolled_pk PRIMARY KEY (engineer_email, course_id, class_id),
    CONSTRAINT enrolled_fk1 FOREIGN KEY (engineer_email) REFERENCES engineers(email),
    CONSTRAINT enrolled_fk2 FOREIGN KEY (course_id, class_id) REFERENCES classes(course_id, class_id)
);

INSERT INTO enrolled VALUES("keithchiang.2019@aio.com", "BG2000", "C1");

################################################################################################################

DROP TABLE IF EXISTS enrol_request;
CREATE TABLE enrol_request (
    engineer_email VARCHAR(255),
    course_id VARCHAR(255),
    class_id VARCHAR(255),
    
    CONSTRAINT enrol_request_pk PRIMARY KEY (engineer_email, course_id, class_id),
    CONSTRAINT enrol_request_fk1 FOREIGN KEY (engineer_email) REFERENCES engineers(email),
    CONSTRAINT enrol_request_fk2 FOREIGN KEY (course_id, class_id) REFERENCES classes(course_id, class_id)
);

################################################################################################################

DROP TABLE IF EXISTS course_materials;
CREATE TABLE course_materials (
    course_id VARCHAR(255),
    class_id VARCHAR(255),
    chapter_id VARCHAR(255),
    content VARCHAR(255),
    quiz_id VARCHAR(255),
    
    CONSTRAINT course_materials_pk PRIMARY KEY (course_id, class_id, chapter_id),
    CONSTRAINT course_materials_fk1 FOREIGN KEY (course_id, class_id) REFERENCES classes(course_id, class_id)
    # CONSTRAINT course_materials_fk2 FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);

INSERT INTO course_materials VALUES("CG1000", "C1", "123", "Dummy Content", "1");

################################################################################################################

DROP TABLE IF EXISTS quizzes;
CREATE TABLE quizzes (
    quiz_id VARCHAR(64),
    course_id VARCHAR(64),
    class_id VARCHAR(64),
    chapter_id VARCHAR(64),
    has_questions BOOLEAN,
    
    CONSTRAINT quizzes_pk PRIMARY KEY (quiz_id, course_id, class_id, chapter_id),
    CONSTRAINT quizzes_fk1 FOREIGN KEY (course_id, class_id) REFERENCES classes(course_id, class_id)
    # CONSTRAINT quizzes_fk2 FOREIGN KEY (chapter_id) REFERENCES course_materials(chapter_id)
);

################################################################################################################

DROP TABLE IF EXISTS quiz_questions;
CREATE TABLE quiz_questions (
    quiz_id VARCHAR(255),
    question_id VARCHAR(255),
    question VARCHAR(255),
    type VARCHAR(255),
    duration INT,
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    option4 VARCHAR(255),
    answer VARCHAR(255),
    
    CONSTRAINT quiz_questions_pk PRIMARY KEY (quiz_id, question_id),
    CONSTRAINT quiz_questions_fk1 FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);

################################################################################################################