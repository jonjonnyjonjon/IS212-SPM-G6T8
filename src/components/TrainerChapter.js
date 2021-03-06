import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from 'axios';
import TrainerModalForm from "../components/TrainerModalForm";
import { BASE_API_URL } from "../utils/constants"

const UploadIcon = styled(FaUpload)`
  color: white;
  margin-bottom: 3px;
`;

const Title = styled.h3`
  margin: 25px 0px;
  font-weight: 600;
`;
const ButtonDiv = styled.div`
  font-size: 15px;
  height: 100%;
  margin-bottom: 40px;
`;

const Btn1 = styled(Button)`
  font-size: 20px;
  font-weight: 600;
  width: 50%;
  height: 30%;
  background-color: #5d5fef;
`;

const Btn2 = styled(Button)`
  font-size: 15px;
  font-weight: 600;
  width: 50%;
  height: 30%;
  background-color: #5d5fef;
`;

function TrainerChapter(props) {
  const { url } = useRouteMatch()
  const [show, setShow] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [quizUploaded, setQuizUploaded] = useState(false);
  const handleShow = () => {
    setShow(true);
    setUploaded(true);
  };

  useEffect(() => {
    axios.get(`${BASE_API_URL}/chapters/getChapterContent?course_id=${props.course_id}&class_id=${props.class_id}&chapter_id=${props.count}`)
        .then(res => {
          let content = res.data[0]['content']
          if (!!content) {
            setUploaded(true)
          }
        })
} , [props.course_id, props.class_id, props.count])

  useEffect(() => {
    axios.get(`${BASE_API_URL}/chapters/getQuizQuestions?course_id=${props.course_id}&class_id=${props.class_id}&chapter_id=${props.count}`)
        .then(res => {
          if (!!res.data.length) {
            setQuizUploaded(true)
          }
        })
  } , [props.course_id, props.class_id, props.count])

  return (
    <Container>
      <Row>
        <Col>
          <Title>Chapter {props.count}:</Title>
          <ButtonDiv>

            {!uploaded ? (
              <Btn1 onClick={handleShow} disabled={uploaded}>
                <UploadIcon />
                &nbsp;&nbsp; Upload
              </Btn1>
            ) : (
              <Btn2 disabled={uploaded}>
                <UploadIcon />
                &nbsp;&nbsp; Content already uploaded!
              </Btn2>
            )}

            {show ? (
              <TrainerModalForm
                isOpen={show}
                class_id={props.class_id}
                course_id={props.course_id}
                chapter_id={props.count}
              />
            ) : null}
  

          </ButtonDiv>
        </Col>

        <Col>
          <Title>Quiz for Chapter {props.count}:</Title>
          <ButtonDiv>
            {!quizUploaded ? (
                <Link to={`${url}/chapter${props.count}/quiz`}>
                <Btn1>Set Quiz</Btn1>
                </Link>
              ) : (
                <Btn2 disabled={quizUploaded}>
                  Quiz already set!
                </Btn2>
              )}
          </ButtonDiv>
        </Col>
      </Row>
    </Container>
  );
}

export default TrainerChapter;
