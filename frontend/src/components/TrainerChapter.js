import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";

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

const Btn = styled(Button)`
  font-size: 20px;
  font-weight: 600;
  width: 50%;
  height: 30%;
  background-color: #5d5fef;
`;

function TrainerChapter(props) {
  const { url } = useRouteMatch();
  return (
    <Container>
      <Row>
        <Col>
          <Title>Chapter {props.count}:</Title>
          <ButtonDiv>
            {/* <Link to={`${url}/${props.id}`}> */}
            <Btn>
              <UploadIcon />
              &nbsp;&nbsp; Upload
            </Btn>
            {/* </Link> */}
          </ButtonDiv>
        </Col>
        <Col>
          <Title>Quiz for Chapter {props.count}:</Title>
          <ButtonDiv>
            {/* <Link to={`${url}/${props.id}`}> */}
            <Btn>
              Set Quiz
            </Btn>
            {/* </Link> */}
          </ButtonDiv>
        </Col>
      </Row>
    </Container>
  );
}

export default TrainerChapter;
