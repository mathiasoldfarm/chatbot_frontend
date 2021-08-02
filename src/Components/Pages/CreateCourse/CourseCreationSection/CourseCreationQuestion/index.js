import React, { Component } from 'react';
import { Input, Row, Col } from 'reactstrap';
import CourseCreationAnswer from './CourseCreationAnswer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  questionChangeHandler,
  addAnswer,
  deleteQuestion,
  deleteAnswer
} from '../../../../../Redux/Actions/Pages';

class CourseCreationQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredAnswer: -1,
      showQuestionDeleteButton: false
    }
  }

  render() {
    const { answers, selected, question, questionChangeHandler, addAnswer, deleteQuestion, deleteAnswer, questionId, sectionId } = this.props;
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
                onChange={(e) => questionChangeHandler(sectionId, questionId, e.target.value)}
              />
            </div>
            <div>
              <Row>
                <Col xs={8}>
                  {answers.map((answer, index) => {
                    const { answerId } = answer;
                    return (
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
                            answer={answer.answer}
                            key={index}
                            questionid={questionId}
                            sectionId={sectionId}
                            answerId={answerId}
                          />
                        </div>
                        <div className="d-flex align-items-center ml-3">
                          {index === this.state.hoveredAnswer ? (
                            <FontAwesomeIcon
                            icon={faTrash}
                            style={{ fontSize: 20, color: "#d46666" }}
                            className="pointer-on-hover"
                            onClick={() => deleteAnswer(sectionId, questionId, answerId)}
                          />
                          ) : null}
                        </div>
                      </div>
                      </div>
                    )}
                  )}
                </Col>
                <Col xs={4}>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ fontSize: 35, color: noMoreAnswers ? "#95A6B4" : "#0C4F88" }}
                    className={noMoreAnswers ? "" : "pointer-on-hover"}
                    onClick={() => {
                      if ( !noMoreAnswers ) {
                        addAnswer(sectionId, questionId)
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
                onClick={() => deleteQuestion(sectionId, questionId)}
              />
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  questionChangeHandler,
  addAnswer,
  deleteQuestion,
  deleteAnswer
}, dispatch);

export default connect(null, mapDispatchToProps)(CourseCreationQuestion);