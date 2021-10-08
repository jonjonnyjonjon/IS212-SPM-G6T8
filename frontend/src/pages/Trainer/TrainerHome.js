import TrainerCourseCard from "../../components/TrainerCourseCard";
import printer from "../../img/printer.png";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Header = styled.h2`
  margin: 40px 0px 10px 50px;
  font-weight: 800;
`;

const CourseContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  order: 4;
`;

const CourseTabs = styled(Tabs)`
  margin: 20px 50px;
`;

function TrainerHome() {
  const [key, setKey] = useState("ongoing");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/courses").then((res) => {
      setCourses(res.data);
    });
  }, []);

  function getCourseMap() {
    const CourseMap = new Map();
    for (let i = 0; i < courses.length; i++) {
      if (!CourseMap.has(courses[i]["courseName"])) {
        CourseMap.set(courses[i]["courseName"], [courses[i]['courseID']] );
      } else {
        CourseMap.get(courses[i]["courseName"]).push(courses[i]['courseID']);
      }
    }
    return CourseMap;
  }
  const CourseMap = getCourseMap();

  console.log(CourseMap)
  // console.log(courses[0]['class'], courses[0]['courseID'])

  return (
    <div>
      <Header>Course Manager</Header>
      <CourseTabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="ongoing" title="Ongoing">
        {/* will need to filter & display ongoing courses accordingly */}
        <CourseContainer>
            {Array.from(CourseMap.keys()).map((key) => (
              <TrainerCourseCard
                // course id will be the last 5 ch of course name (can rename to course code if conflict w/ id)
                id={key.slice(-5)}
                img={printer}
                title={key}
                class={(CourseMap.get(key)).map((course) => course.slice(-2) ).join(", ")}
              ></TrainerCourseCard>
            ))}
          </CourseContainer>
        </Tab>

        <Tab eventKey="incomplete" title="Incomplete"> 
        {/* will need to filter & display incomplete courses accordingly */}
        <CourseContainer>
            {Array.from(CourseMap.keys()).map((key) => (
              <TrainerCourseCard
                // course id will be the last 5 ch of course name (can rename to course code if conflict w/ id)
                id={key.slice(-5)}
                img={printer}
                title={key}
                class={(CourseMap.get(key)).map((course) => course.slice(-2) ).join(", ")}
              ></TrainerCourseCard>
            ))}
          </CourseContainer>
        </Tab>
      </CourseTabs>
    </div>
  );
}

export default TrainerHome;
