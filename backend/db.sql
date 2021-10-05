CREATE DATABASE IF NOT EXISTS spmg6t8;
USE spmg6t8;

DROP TABLE IF EXISTS quiz;

CREATE TABLE quiz (
    quizType varchar(255),
    time int,
    question varchar(255),
    answer varchar(255),
    options varchar(255)
);

INSERT INTO quiz VALUES("graded", 30, "What do you need to do before you turn on a printer?", "2", "true");

CREATE TABLE trainers (
	name varchar(255),
    email varchar(255),
    password varchar(255),
    qualified varchar(255)
);

INSERT INTO trainers VALUES("Larry Haverkamp", "lh.2021@aio.com", "lh", "CG1000");
INSERT INTO trainers VALUES("Jack Sparrow", "js.2021@aio.com", "js", "CG2000");
INSERT INTO trainers VALUES("Marry Littlelamb", "ml.2021@aio.com", "ml", "CG2000");