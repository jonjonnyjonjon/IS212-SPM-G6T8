select * from courses;
select * from trainers;
drop table courses;

CREATE TABLE courses (
	courseID varchar(255),
	courseName varchar(255),
    class varchar(255),
    size int,
    trainer varchar(255),
    startDate varchar(255),
    endDate varchar(255)
);

INSERT INTO courses VALUES("CG1000C1", "Intro to Canon G1000", "C1", 24, "24/09/2021", "08/10/2021");
INSERT INTO courses VALUES("CG1000C2", "Intro to Canon G1000", "C2", 20, "24/09/2021", "08/10/2021");
INSERT INTO courses VALUES("CG2000C1", "Intro to Canon G2000", "C1", 30, "01/10/2021", "08/10/2021");

CREATE TABLE trainers (
	name varchar(255),
    email varchar(255),
    password varchar(255),
    qualified varchar(255)
);

INSERT INTO trainers VALUES("Larry Haverkamp", "lh.2021@aio.com", "lh", "CG1000");
INSERT INTO trainers VALUES("Jack Sparrow", "js.2021@aio.com", "js", "CG2000");
INSERT INTO trainers VALUES("Marry Littlelamb", "ml.2021@aio.com", "ml", "CG2000");