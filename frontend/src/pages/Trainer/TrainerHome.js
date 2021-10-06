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
        CourseMap.set(courses[i]["courseName"], [courses[i]["class"]]);
      } else {
        CourseMap.get(courses[i]["courseName"]).push(courses[i]["class"]);
      }
    }
    return CourseMap;
  }
  const CourseMap = getCourseMap();

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
                img={printer}
                title={key}
                class={CourseMap.get(key).join(", ")}
              ></TrainerCourseCard>
            ))}
          </CourseContainer>
        </Tab>

        <Tab eventKey="incomplete" title="Incomplete"> 
        {/* will need to filter & display incomplete courses accordingly */}
          <CourseContainer>
            {Array.from(CourseMap.keys()).map((key) => (
              <TrainerCourseCard
                img={printer}
                title={key}
                class={CourseMap.get(key).join(", ")}
              ></TrainerCourseCard>
            ))}
          </CourseContainer>
        </Tab>
      </CourseTabs>
    </div>
  );
}

export default TrainerHome;
