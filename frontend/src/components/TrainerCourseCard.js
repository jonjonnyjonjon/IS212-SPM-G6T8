import { Card, Button } from "react-bootstrap";
import { 	Link } from "react-router-dom";
import styled from "styled-components";

const CardImg = styled(Card.Img)`
  width: 150px;
  height: 150px;
  margin: auto;
`;

const CourseCard = styled(Card)`
  width: 250px;
  height: 400px;
  margin: 30px 0px;
`;

const Title = styled(Card.Title)`
  font-size: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const Text = styled(Card.Text)`
  font-size: 15px;
  margin-bottom: 30px;
  font-weight: 600;
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
  return (
    <CourseCard>
      <CardImg src={props.img}></CardImg>
      <Card.Body>
        <Title>{props.title}</Title>
        <Text>Classes: {props.class}</Text>
        <ButtonDiv>
          <Link
            to={{
              pathname: `/${props.id}`,
              data: props.id,
            }}
          >
            <Btn>Manage</Btn>
          </Link>
        </ButtonDiv>
        <ButtonDiv>
          <Btn>Quiz Score</Btn>
        </ButtonDiv>
      </Card.Body>
    </CourseCard>
  );
}

export default TrainerCourseCard;
