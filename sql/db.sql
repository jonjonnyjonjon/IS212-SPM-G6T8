DROP DATABASE IF EXISTS spmg6t8;
CREATE DATABASE spmg6t8;
USE spmg6t8;

################################################################################################################

DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    course_id VARCHAR(6),
    course_name VARCHAR(50),
    course_summary VARCHAR(500),
    has_prereq BOOLEAN DEFAULT False,
    
    PRIMARY KEY (course_id)
);

INSERT INTO courses VALUES("CG1000", "Intro to Canon G1000", "
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec est blandit, tristique sem at, tempor risus. Proin nec augue odio. Suspendisse ut sapien nec nulla aliquet venenatis. Donec venenatis cursus mauris sit amet ullamcorper. Sed cursus dolor sed nisi accumsan varius. Sed in lorem justo. Etiam tellus arcu, tincidunt nec metus nec, iaculis suscipit diam.
Vivamus vitae felis dictum, pulvinar mauris vitae, volutpat mauris. Ut ligula dui, sollicitudin a diam et, imperdiet posuere tellus. Morbi sit amet eleifend sapien, vitae tincidunt eros. Proin ut metus tortor. Fusce venenatis non ante eu rhoncus. Nulla nisl nisi, imperdiet eu hendrerit non, efficitur et diam. Cras ultricies odio orci, ac sollicitudin mi fringilla at. Morbi diam odio, imperdiet non urna quis, fringilla tincidunt ex. Phasellus sit amet maximus urna. Sed sit amet tellus non lorem ultricies feugiat.
", False);

INSERT INTO courses VALUES("CG2000", "Intro to Canon G2000",  "
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec est blandit, tristique sem at, tempor risus. Proin nec augue odio. Suspendisse ut sapien nec nulla aliquet venenatis. Donec venenatis cursus mauris sit amet ullamcorper. Sed cursus dolor sed nisi accumsan varius. Sed in lorem justo. Etiam tellus arcu, tincidunt nec metus nec, iaculis suscipit diam.
Vivamus vitae felis dictum, pulvinar mauris vitae, volutpat mauris. Ut ligula dui, sollicitudin a diam et, imperdiet posuere tellus. Morbi sit amet eleifend sapien, vitae tincidunt eros. Proin ut metus tortor. Fusce venenatis non ante eu rhoncus. Nulla nisl nisi, imperdiet eu hendrerit non, efficitur et diam. Cras ultricies odio orci, ac sollicitudin mi fringilla at. Morbi diam odio, imperdiet non urna quis, fringilla tincidunt ex. Phasellus sit amet maximus urna. Sed sit amet tellus non lorem ultricies feugiat.
", True);
INSERT INTO courses VALUES("CG3000", "Intro Canon G3000",  "
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec est blandit, tristique sem at, tempor risus. Proin nec augue odio. Suspendisse ut sapien nec nulla aliquet venenatis. Donec venenatis cursus mauris sit amet ullamcorper. Sed cursus dolor sed nisi accumsan varius. Sed in lorem justo. Etiam tellus arcu, tincidunt nec metus nec, iaculis suscipit diam.
Vivamus vitae felis dictum, pulvinar mauris vitae, volutpat mauris. Ut ligula dui, sollicitudin a diam et, imperdiet posuere tellus. Morbi sit amet eleifend sapien, vitae tincidunt eros. Proin ut metus tortor. Fusce venenatis non ante eu rhoncus. Nulla nisl nisi, imperdiet eu hendrerit non, efficitur et diam. Cras ultricies odio orci, ac sollicitudin mi fringilla at. Morbi diam odio, imperdiet non urna quis, fringilla tincidunt ex. Phasellus sit amet maximus urna. Sed sit amet tellus non lorem ultricies feugiat.
", True);
INSERT INTO courses VALUES("XK1000", "Intro to Xerox K1000",  "
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec est blandit, tristique sem at, tempor risus. Proin nec augue odio. Suspendisse ut sapien nec nulla aliquet venenatis. Donec venenatis cursus mauris sit amet ullamcorper. Sed cursus dolor sed nisi accumsan varius. Sed in lorem justo. Etiam tellus arcu, tincidunt nec metus nec, iaculis suscipit diam.
Vivamus vitae felis dictum, pulvinar mauris vitae, volutpat mauris. Ut ligula dui, sollicitudin a diam et, imperdiet posuere tellus. Morbi sit amet eleifend sapien, vitae tincidunt eros. Proin ut metus tortor. Fusce venenatis non ante eu rhoncus. Nulla nisl nisi, imperdiet eu hendrerit non, efficitur et diam. Cras ultricies odio orci, ac sollicitudin mi fringilla at. Morbi diam odio, imperdiet non urna quis, fringilla tincidunt ex. Phasellus sit amet maximus urna. Sed sit amet tellus non lorem ultricies feugiat.
", False);
INSERT INTO courses VALUES ("BG1000", "Intro to Brother G1000",  "
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec est blandit, tristique sem at, tempor risus. Proin nec augue odio. Suspendisse ut sapien nec nulla aliquet venenatis. Donec venenatis cursus mauris sit amet ullamcorper. Sed cursus dolor sed nisi accumsan varius. Sed in lorem justo. Etiam tellus arcu, tincidunt nec metus nec, iaculis suscipit diam.
Vivamus vitae felis dictum, pulvinar mauris vitae, volutpat mauris. Ut ligula dui, sollicitudin a diam et, imperdiet posuere tellus. Morbi sit amet eleifend sapien, vitae tincidunt eros. Proin ut metus tortor. Fusce venenatis non ante eu rhoncus. Nulla nisl nisi, imperdiet eu hendrerit non, efficitur et diam. Cras ultricies odio orci, ac sollicitudin mi fringilla at. Morbi diam odio, imperdiet non urna quis, fringilla tincidunt ex. Phasellus sit amet maximus urna. Sed sit amet tellus non lorem ultricies feugiat.
", False);
INSERT INTO courses VALUES ("BG2000", "Intermediate Brother G1000",  "
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec est blandit, tristique sem at, tempor risus. Proin nec augue odio. Suspendisse ut sapien nec nulla aliquet venenatis. Donec venenatis cursus mauris sit amet ullamcorper. Sed cursus dolor sed nisi accumsan varius. Sed in lorem justo. Etiam tellus arcu, tincidunt nec metus nec, iaculis suscipit diam.
Vivamus vitae felis dictum, pulvinar mauris vitae, volutpat mauris. Ut ligula dui, sollicitudin a diam et, imperdiet posuere tellus. Morbi sit amet eleifend sapien, vitae tincidunt eros. Proin ut metus tortor. Fusce venenatis non ante eu rhoncus. Nulla nisl nisi, imperdiet eu hendrerit non, efficitur et diam. Cras ultricies odio orci, ac sollicitudin mi fringilla at. Morbi diam odio, imperdiet non urna quis, fringilla tincidunt ex. Phasellus sit amet maximus urna. Sed sit amet tellus non lorem ultricies feugiat.
", True);
INSERT INTO courses VALUES ("BG3000", "Advanced Brother G1000",  "
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec est blandit, tristique sem at, tempor risus. Proin nec augue odio. Suspendisse ut sapien nec nulla aliquet venenatis. Donec venenatis cursus mauris sit amet ullamcorper. Sed cursus dolor sed nisi accumsan varius. Sed in lorem justo. Etiam tellus arcu, tincidunt nec metus nec, iaculis suscipit diam.
Vivamus vitae felis dictum, pulvinar mauris vitae, volutpat mauris. Ut ligula dui, sollicitudin a diam et, imperdiet posuere tellus. Morbi sit amet eleifend sapien, vitae tincidunt eros. Proin ut metus tortor. Fusce venenatis non ante eu rhoncus. Nulla nisl nisi, imperdiet eu hendrerit non, efficitur et diam. Cras ultricies odio orci, ac sollicitudin mi fringilla at. Morbi diam odio, imperdiet non urna quis, fringilla tincidunt ex. Phasellus sit amet maximus urna. Sed sit amet tellus non lorem ultricies feugiat.
", True);

################################################################################################################

DROP TABLE IF EXISTS trainers;
CREATE TABLE trainers (
    email varchar(50),
    password varchar(50),
	name varchar(100),
    qualified varchar(255),
    
    PRIMARY KEY (email)
);

INSERT INTO trainers VALUES("johnappleseed@aio.com", "ja", "John Appleseed", "CG1000, CG2000");
INSERT INTO trainers VALUES("jacksparrow@aio.com", "js", "Jack Sparrow", "CG2000, CG3000");
INSERT INTO trainers VALUES("janedoe@aio.com", "jd", "Jane Doe", "CG2000");
INSERT INTO trainers VALUES("dwightschrute@aio.com", "ds", "Dwight Schrute", "CG3000");
INSERT INTO trainers VALUES("barneystinson@aio.com", "bs", "Barney Stinson", "XK1000, BG1000");
INSERT INTO trainers VALUES("robinscherbatsky@aio.com", "rs", "Robin Scherbatsky", "BG1000, BG1002");
INSERT INTO trainers VALUES("marshalleriksen@aio.com", "me", "Marshall Eriksen", "BG1001, BG1002");
INSERT INTO trainers VALUES("lilyaldrin@aio.com", "la", "Lily Aldrin", "BG1001, BG1002");
INSERT INTO trainers VALUES("tedmosby@aio.com", "tm", "Ted Mosby", "BG1002, BG1001");

################################################################################################################

DROP TABLE IF EXISTS engineers;
CREATE TABLE engineers (
    email varchar(50),
    password varchar(50),
	name varchar(100),
    
    PRIMARY KEY (email)
);

INSERT INTO engineers VALUES("keithchiang@aio.com", "kc", "Keith Chiang");
INSERT INTO engineers VALUES("htwong@aio.com", "jw", "Jonathan Wong");
INSERT INTO engineers VALUES("krystenng@aio.com", "kn", "Krysten Ng");
INSERT INTO engineers VALUES("yuenhuiqi@aio.com", "hq", "Yuen Huiqi");
INSERT INTO engineers VALUES("chrisposkitt@aio.com", "cp", "Chris Poskitt");
INSERT INTO engineers VALUES("zhoukankan@aio.com", "kk", "Zhou Kankan");

################################################################################################################

DROP TABLE IF EXISTS classes;
CREATE TABLE classes (
    course_id VARCHAR(6),
    class_id VARCHAR(2),
    trainer_email VARCHAR(50),
    size INT,
    current_enrolled INT,
    enrolment_start VARCHAR(10),
    enrolment_end VARCHAR(10),
    class_start VARCHAR(10),
    class_end VARCHAR(10),
    material_status BOOLEAN DEFAULT False,
    is_published BOOLEAN DEFAULT False,
    
    CONSTRAINT classes_pk PRIMARY KEY (course_id, class_id),
    CONSTRAINT classes_fk1 FOREIGN KEY (trainer_email) REFERENCES trainers(email)
);

INSERT INTO classes VALUES("CG1000", "C1", "johnappleseed@aio.com", 10, 0, "10/09/2021", "20/09/2021", "24/09/2021", "08/10/2021", False, False);
INSERT INTO classes VALUES("CG1000", "C2", "johnappleseed@aio.com", 10, 0, "10/09/2021", "20/09/2021", "24/09/2021", "08/10/2021", True, False);

INSERT INTO classes VALUES("CG2000", "C1", "johnappleseed@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", True, False);
INSERT INTO classes VALUES ("CG2000", "C2", "jacksparrow@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", True, True);
INSERT INTO classes VALUES ("CG2000", "C3", "janedoe@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", False, False);

INSERT INTO classes VALUES ("CG3000", "C1", "dwightschrute@aio.com", 10, 0, "01/09/2021", "15/09/2021", "16/09/2021", "20/10/2021", True, True);
INSERT INTO classes VALUES ("CG3000", "C2", "jacksparrow@aio.com", 10, 0, "01/09/2021", "15/09/2021", "27/11/2021", "3/12/2021", True, True);

INSERT INTO classes VALUES("XK1000", "C1", "barneystinson@aio.com", 10, 0, "12/10/2021", "20/10/2021", "3/11/2021", "27/12/2021", True, True); 
INSERT INTO classes VALUES("XK1000", "C2", "barneystinson@aio.com", 10, 0, "12/10/2021", "20/10/2021", "21/10/2021", "21/11/2021", True, True);

INSERT INTO classes VALUES("BG1000", "C1", "barneystinson@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/11/2021", True, False); 
INSERT INTO classes VALUES("BG1000", "C2", "robinscherbatsky@aio.com", 10, 0, "20/09/2021", "30/09/2021", "01/10/2021", "08/10/2021", True, True);
INSERT INTO classes VALUES ("BG1000", "C3", "robinscherbatsky@aio.com", 10, 0, "01/09/2021", "15/09/2021", "16/09/2021", "20/10/2021", True, True);

INSERT INTO classes VALUES ("BG1001", "C1", "tedmosby@aio.com", 10, 0, "01/09/2021", "15/09/2021", "16/09/2021", "23/11/2021", True, True); 

INSERT INTO classes VALUES ("BG1002", "C1", "lilyaldrin@aio.com", 10, 0, "01/09/2021", "15/09/2021", "16/09/2021", "20/10/2021", False, False);
INSERT INTO classes VALUES ("BG1002", "C2", "marshalleriksen@aio.com", 10, 0, "01/09/2021", "15/09/2021", "23/10/2021", "27/11/2021", True, True); 

################################################################################################################

DROP TABLE IF EXISTS completed_courses;
CREATE TABLE completed_courses (
    engineer_email varchar(50),
    course_id VARCHAR(6),
    class_id VARCHAR(2),
    completed_date VARCHAR(10),
    
    CONSTRAINT completed_courses_pk PRIMARY KEY (engineer_email, course_id, class_id),
    CONSTRAINT completed_courses_fk1 FOREIGN KEY (engineer_email) REFERENCES engineers(email),
    CONSTRAINT completed_courses_fk2 FOREIGN KEY (course_id, class_id) REFERENCES classes(course_id, class_id)
);

INSERT INTO completed_courses VALUES("htwong@aio.com", "CG1000", "C1", "08/10/2021");
INSERT INTO completed_courses VALUES("chrisposkitt@aio.com", "CG1000", "C1", "08/10/2021");
INSERT INTO completed_courses VALUES("keithchiang@aio.com", "CG1000", "C1", "08/10/2021");

INSERT INTO completed_courses VALUES("keithchiang@aio.com", "CG2000", "C2", "08/10/2021");

INSERT INTO completed_courses VALUES("krystenng@aio.com", "CG3000", "C1", "08/10/2021");

INSERT INTO completed_courses VALUES("zhoukankan@aio.com", "XK1000", "C1", "08/10/2021");

INSERT INTO completed_courses VALUES("yuenhuiqi@aio.com", "BG1000", "C1", "08/10/2021");
INSERT INTO completed_courses VALUES("keithchiang@aio.com", "CG1000", "C2", "08/10/2021");

INSERT INTO completed_courses VALUES("krystenng@aio.com", "BG1001", "C1", "08/10/2021");


################################################################################################################

DROP TABLE IF EXISTS course_prereq;
CREATE TABLE course_prereq (
    course_id VARCHAR(6),
    prereq_course_id VARCHAR(6),

    CONSTRAINT prereq_pk PRIMARY KEY (course_id, prereq_course_id),
    CONSTRAINT prereq_pk1 FOREIGN KEY (course_id) REFERENCES courses(course_id),
    CONSTRAINT prereq_pk2 FOREIGN KEY (prereq_course_id) REFERENCES courses(course_id)
);

INSERT INTO course_prereq VALUES("BG1001", "BG1000");
INSERT INTO course_prereq VALUES("BG1002", "BG1001");

################################################################################################################

DROP TABLE IF EXISTS enrolled;
CREATE TABLE enrolled (
    engineer_email VARCHAR(50),
    course_id VARCHAR(6),
    class_id VARCHAR(2),
    
    CONSTRAINT enrolled_pk PRIMARY KEY (engineer_email, course_id, class_id),
    CONSTRAINT enrolled_fk1 FOREIGN KEY (engineer_email) REFERENCES engineers(email),
    CONSTRAINT enrolled_fk2 FOREIGN KEY (course_id, class_id) REFERENCES classes(course_id, class_id)
);

INSERT INTO enrolled VALUES("keithchiang@aio.com", "CG2000", "C2");
INSERT INTO enrolled VALUES("keithchiang@aio.com", "BG1001", "C1");

################################################################################################################

DROP TABLE IF EXISTS enrol_request;
CREATE TABLE enrol_request (
    engineer_email VARCHAR(50),
    course_id VARCHAR(6),
    class_id VARCHAR(2),
    
    CONSTRAINT enrol_request_pk PRIMARY KEY (engineer_email, course_id, class_id),
    CONSTRAINT enrol_request_fk1 FOREIGN KEY (engineer_email) REFERENCES engineers(email),
    CONSTRAINT enrol_request_fk2 FOREIGN KEY (course_id, class_id) REFERENCES classes(course_id, class_id)
);

################################################################################################################

DROP TABLE IF EXISTS teaching_materials;
CREATE TABLE teaching_materials (
    course_id VARCHAR(6),
    class_id VARCHAR(2),
    chapter_id VARCHAR(10),
    content VARCHAR(100),
    
    CONSTRAINT teaching_materials_pk PRIMARY KEY (course_id, class_id, chapter_id),
    CONSTRAINT teaching_materials_fk1 FOREIGN KEY (course_id, class_id) REFERENCES classes(course_id, class_id)
);

################################################################################################################

DROP TABLE IF EXISTS quiz_questions;
CREATE TABLE quiz_questions (
    course_id VARCHAR(6),
    class_id VARCHAR(2),
    chapter_id VARCHAR(10),
    question_id VARCHAR(100),
    question VARCHAR(100),
    type VARCHAR(20),
    duration INT,
    option1 VARCHAR(100),
    option2 VARCHAR(100),
    option3 VARCHAR(100),
    option4 VARCHAR(100),
    answer VARCHAR(100),
    
    CONSTRAINT quiz_questions_pk PRIMARY KEY (course_id, class_id, chapter_id, question_id),
    CONSTRAINT quiz_questions_fk1 FOREIGN KEY (course_id, class_id, chapter_id) REFERENCES teaching_materials(course_id, class_id, chapter_id)
);

################################################################################################################
