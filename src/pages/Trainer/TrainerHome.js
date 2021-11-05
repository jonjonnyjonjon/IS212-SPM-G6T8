import TrainerCourseCard from "../../components/TrainerCourseCard";
import printer from "../../img/printer.png";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants"

const Header = styled.h2`
  margin: 40px 0px 10px 0px;
  font-weight: 800;
`;

const CourseContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 80px;
`;

const CourseTabs = styled(Tabs)`
  margin: 20px 0px;
`;

function TrainerHome() {
  const [key, setKey] = useState("ongoing");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/trainers/getTrainerCourses`)
      .then((res) => {
        setCourses(res.data);
      });
  }, []);

  function sortCourses() {
    const CourseMap = new Map();
    CourseMap.set("ongoing", []);
    CourseMap.set("incomplete", []);
    var today = new Date();
    for (let i = 0; i < courses.length; i++) {
      let start = courses[i]["class_start"].split("/");
      var startDate = new Date(start[2], start[1] - 1, start[0]);
      let end = courses[i]["class_end"].split("/");
      var endDate = new Date(end[2], end[1] - 1, end[0]);
      if ((today > startDate) & (today < endDate)) {
        CourseMap.get("ongoing").push(courses[i]);
      }
      if (today < startDate) {
        CourseMap.get("incomplete").push(courses[i]);
      }
    }
    return CourseMap;
  }

  var ongoingCourses = Array.from(sortCourses())[0][1];
  var incompleteCourses = Array.from(sortCourses())[1][1];

  return (
    <Container>
      <Header>Course Manager</Header>
      <CourseTabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="ongoing" title="Ongoing">
          <CourseContainer>
            {ongoingCourses.length === 0
              ? null
              : ongoingCourses.map((course) => (
                  <TrainerCourseCard
                    id={course.course_id}
                    img={printer}
                    title={course.course_name}
                    class={course.class_id}
                    startDate={course.class_start}
                    endDate={course.class_end}
                  ></TrainerCourseCard>
                ))}
          </CourseContainer>
        </Tab>

        <Tab eventKey="incomplete" title="Incomplete">
          <CourseContainer>
            {incompleteCourses.length === 0
              ? null
              : incompleteCourses.map((course) => (
                  <TrainerCourseCard
                    id={course.course_id}
                    img={printer}
                    title={course.course_name}
                    class={course.class_id}
                    startDate={course.class_start}
                    endDate={course.class_end}
                  ></TrainerCourseCard>
                ))}
          </CourseContainer>
        </Tab>
      </CourseTabs>
    </Container>
  );
}

export default TrainerHome;
