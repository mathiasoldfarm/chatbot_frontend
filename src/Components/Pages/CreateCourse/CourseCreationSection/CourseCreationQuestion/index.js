import React from 'react';
import { Input, Row, Col } from 'reactstrap';
import CourseCreationAnswer from './CourseCreationAnswer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const CourseCreationQuestion = (props) => {
  const { questionIndex, answers, selected, question, questionChangeHandler, addAnswer, setSelectedAnswer, answerChangeHandler } = props;
  return (
    <div style={{ height: "79%", marginBottom: "2%" }}>
      <div>
        <div className="mb-5">
          <Input
            type="textarea"
            placeholder="Skriv dit spørgsmål her..."
            style={{
              background: null,
            }}
            value={question}
            onChange={(e) => questionChangeHandler(questionIndex, e.target.value)}
          />
        </div>
        <div>
          <Row>
            <Col xs={8}>
              {answers.map((answer, index) => (
                <div className={index + 1 === answers.length ? "" : "mb-3"}>
                  <CourseCreationAnswer
                    checked={index === selected}
                    setSelectedAnswer={setSelectedAnswer}
                    answerChangeHandler={answerChangeHandler}
                    answer={answer}
                    questionIndex={questionIndex}
                    index={index}
                    key={index}
                  />
                </div>
              ))}
            </Col>
            <Col xs={4}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{ fontSize: 35, color: "#0C4F88" }}
                className="pointer-on-hover"
                onClick={() => addAnswer(questionIndex)}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default CourseCreationQuestion;