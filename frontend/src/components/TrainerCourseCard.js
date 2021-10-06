import { Card, Button } from "react-bootstrap";
import styled from 'styled-components'

const CardImg = styled(Card.Img) `
    width: 150px;
    height: 150px;
    margin: auto;
`

const CourseCard = styled(Card) `
    width: 250px;
    height: 400px;
    margin: 30px 0px;
`

const Title = styled(Card.Title)`
    font-size: 20px;
    margin-bottom: 20px;
`

const Text = styled(Card.Text)`
    font-size: 15px;
    margin-bottom: 30px;
`
const ButtonDiv = styled.div`
    font-size: 15px;
    margin-bottom: 20px;
    text-align: center;
`

const Btn = styled(Button)`
    width: 60%;
    background-color: #5D5FEF;
`

function TrainerCourseCard(props) {
  return (
    <CourseCard>
      <CardImg src={props.img}></CardImg>
      <Card.Body>
        <Title>{props.title}</Title>
        <Text>{props.text}</Text>
        <ButtonDiv>
            <Btn>Manage</Btn>
        </ButtonDiv>
        <ButtonDiv>
            <Btn>Quiz Score</Btn>
        </ButtonDiv>
      </Card.Body>
    </CourseCard>
  );
}

export default TrainerCourseCard;
