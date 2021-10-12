import { Card, Button } from "react-bootstrap";
import { Link, useRouteMatch } from 'react-router-dom'
import styled from "styled-components";

const CardImg = styled(Card.Img)`
  width: 150px;
  height: 150px;
  margin: auto;
`;

const CourseCard = styled(Card)`
  width: 250px;
  height: 450px;
  margin: 30px 0px;
`;

const Title = styled(Card.Title)`
  font-size: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const Class = styled(Card.Text)`
  font-size: 15px;
  margin-bottom: 20px;
  font-weight: 600;
  margin-left: 10px;
`;
const StartDate = styled(Card.Text)`
  font-size: 15px;
  margin-left: 10px;
`;
const EndDate = styled(Card.Text)`
  font-size: 15px;
  margin-bottom: 30px;
  margin-left: 10px;
`;
const ButtonDiv = styled.div`
  font-size: 15px;
  margin-bottom: 20px;
  text-align: center;
`;

const Btn = styled(Button)`
  width: 80%;
  background-color: #5d5fef;
`;

function TrainerCourseCard(props) {
  const { url } = useRouteMatch()
  return (
    <CourseCard>
      <CardImg src={props.img}></CardImg>
      <Card.Body>
        <Title>{props.title}</Title>
        <Class>Class: {props.class}</Class>
        <StartDate>Start Date: {props.startDate}</StartDate>
        <EndDate>End Date: {props.endDate}</EndDate>
        <ButtonDiv>
          <Link to={`${url}/${props.id}`}>
            <Btn>Manage</Btn>
          </Link>
        </ButtonDiv>
        <ButtonDiv>
          <Link to={`${url}/${props.id}/results`}>
            <Btn>Quiz Results</Btn>
          </Link>
        </ButtonDiv>
      </Card.Body>
    </CourseCard>
  );
}

export default TrainerCourseCard;
