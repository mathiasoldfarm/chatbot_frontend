import React, { Component } from 'react';
import { Input, Row, Col } from 'reactstrap';
import CourseCreationAnswer from './CourseCreationAnswer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

class CourseCreationQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredAnswer: -1,
      showQuestionDeleteButton: false
    }
  }

  render() {
    const { questionIndex, answers, sectionIndex, selected, question, questionChangeHandler, addAnswer, setSelectedAnswer, answerChangeHandler, deleteQuestion, deleteAnswer } = this.props;
    const noMoreAnswers = answers.length >= 4;
    return (
      <div
        style={{ height: "79%", marginBottom: "2%" }}
        className="px-5 pt-5"
        onMouseOver={() => {
          this.setState({
            showQuestionDeleteButton: true
          });
        }}
        onMouseLeave={() => {
          this.setState({
            showQuestionDeleteButton: false
          });
        }}
      >
        <Row>
          <Col>
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
                    <div
                      key={index}
                      className={index + 1 === answers.length ? "" : "mb-3"}
                      onMouseOver={() => {
                        this.setState({
                          hoveredAnswer: index
                        });
                      }}
                      onMouseLeave={() => {
                        this.setState({
                          hoveredAnswer: -1
                        });
                      }}
                    >
                    <div className="d-flex">
                      <div style={{ width: "87%" }}>
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
                      <div className="d-flex align-items-center ml-3">
                        {index === this.state.hoveredAnswer ? (
                          <FontAwesomeIcon
                          icon={faTrash}
                          style={{ fontSize: 20, color: "#d46666" }}
                          className="pointer-on-hover"
                          onClick={() => deleteAnswer(sectionIndex, questionIndex, index)}
                        />
                        ) : null}
                      </div>
                    </div>
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
          </Col>
          <Col xs={1}>
            {this.state.showQuestionDeleteButton ? (
              <FontAwesomeIcon
                icon={faTrash}
                style={{ fontSize: 20, color: "#d46666" }}
                className="pointer-on-hover"
                onClick={() => deleteQuestion(sectionIndex, questionIndex)}
              />
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default CourseCreationQuestion;