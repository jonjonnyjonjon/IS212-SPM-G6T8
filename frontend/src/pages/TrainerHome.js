import TrainerCourseCard from "../components/TrainerCourseCard";
import printer from "../img/printer.png";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import styled from "styled-components";

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
          <CourseContainer>
            <TrainerCourseCard
              img={printer}
              title="PRNT100 - Introduction to Printing"
              text="Sections: G1, G2, G3"
            ></TrainerCourseCard>
            <TrainerCourseCard
              img={printer}
              title="PRNT200 - Printing at Workplaces"
              text="Sections: G1, G2, G3"
            ></TrainerCourseCard>
            <TrainerCourseCard
              img={printer}
              title="PRNT200 - Printing at Workplaces"
              text="Sections: G1, G2, G3"
            ></TrainerCourseCard>
            <TrainerCourseCard
              img={printer}
              title="PRNT200 - Printing at Workplaces"
              text="Sections: G1, G2, G3"
            ></TrainerCourseCard>
          </CourseContainer>
        </Tab>

        <Tab eventKey="incomplete" title="Incomplete">
          <CourseContainer>
            <TrainerCourseCard
              img={printer}
              title="PRNT100 - Introduction to Printing"
              text="Sections: G1, G2, G3"
            ></TrainerCourseCard>
            <TrainerCourseCard
              img={printer}
              title="PRNT200 - Printing at Workplaces"
              text="Sections: G1, G2, G3"
            ></TrainerCourseCard>
          </CourseContainer>
        </Tab>
      </CourseTabs>
    </div>
  );
}

export default TrainerHome;
