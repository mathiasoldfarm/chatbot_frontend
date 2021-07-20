import React from 'react';
import { Input, Row, Col } from 'reactstrap';
import CourseCreationAnswer from './CourseCreationAnswer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const CourseCreationQuestion = (props) => {
  const { questionIndex, answers, sectionIndex, selected, question, questionChangeHandler, addAnswer, setSelectedAnswer, answerChangeHandler } = props;
  const noMoreAnswers = answers.length >= 4;
  return (
    <div style={{ height: "79%", marginBottom: "2%" }} className="px-5 pt-5">
      <div>
        <div className="mb-3">
          <Input
            type="textarea"
            placeholder="Skriv dit spørgsmål her..."
            style={{
              background: null,
            }}
            className="question-input"
            value={question}
            onChange={(e) => questionChangeHandler(sectionIndex, questionIndex, e.target.value)}
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
                    sectionIndex={sectionIndex}
                  />
                </div>
              ))}
            </Col>
            <Col xs={4}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{ fontSize: 35, color: noMoreAnswers ? "#95A6B4" : "#0C4F88" }}
                className={noMoreAnswers ? "" : "pointer-on-hover"}
                onClick={() => {
                  if ( !noMoreAnswers ) {
                    addAnswer(sectionIndex, questionIndex)
                  }
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default CourseCreationQuestion;