import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import QuizButton from './QuizButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnswer } from '../../../Redux/Actions/Chatbot';
import ReactHtmlParser from 'react-html-parser';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      answers: {},
      isCorrect: false,
      disableNextButton: false
    }

    this.selectHandler = this.selectHandler.bind(this);
    this.renderQuestionSection = this.renderQuestionSection.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
    this.lastQuestion = React.createRef();
  }

  async selectHandler (questionId, possibleAnswer, correct, last) {
    const { explanation, id } = possibleAnswer;
    this.setState({
      isCorrect: correct,
      lastAnswersExplanation: explanation,
      answers: {
        ...this.state.answers,
        [questionId]: id
      }
    }, () => {
      if ( last ) {
        this.submitAnswers();
      } else {
        this.goToNextQuestion();
      }
    });
  }

  goToNextQuestion() {
    this.setState({
      questionIndex: this.state.questionIndex + 1,
    }, () => {
      this.lastQuestion.current.scrollIntoView({ behavior: "smooth" });
    });
  }

  submitAnswers() {
    const { courseId, getAnswer, historyId, contextId } = this.props;

    if ( !this.props.notSendData ) {
      getAnswer(this.state.answers, courseId, historyId, contextId, "question"); 
    }
  }

  renderFeedback(answered) {
    if ( answered ) {
      const { isCorrect, lastAnswersExplanation } = this.state;
      return (
        <div className="mt-3">
          <div>
            {isCorrect ? (
                <p style={{ color: "green" }}>{lastAnswersExplanation}</p>
              ): (
                <p style={{ color: "red" }}>{lastAnswersExplanation}</p>
            )}
          </div>
        </div>
      );
    }
  }

  renderQuestionSection () {
    const { data } = this.props;
    let { questions } = data.levels[0];

    const { questionIndex, answers } = this.state;
    questions = questions.slice(0, questionIndex + 1);

    return questions.map((question, index) => {
      const { possibleAnswers } = question;
      const lastOfAll = index + 1 === data.levels[0].questions.length;
      const lastOfDisplayed = index + 1 === questions.length;
      const answered = Object.keys(answers).includes(question.id.toString());

      return (
        <div
          key={index}
        >
          <div>{ReactHtmlParser(question.question)}</div>
          <div className="p-2">
            <Row>
              <Col>
                {possibleAnswers.map((possibleAnswer, answerIndex) => {
                  const lastAnswer = answerIndex === possibleAnswers.length;
                  const { answer, id } = possibleAnswer;
                  const correct = question.correct.id === parseInt(id);
                  const chosen = answered && answers[question.id.toString()] === id;
                  return (
                    <QuizButton
                      disabled={answered}
                      correct={correct}
                      chosen={chosen}
                      key={id}
                      onClick={() => {
                        this.selectHandler(question.id, possibleAnswer, correct, lastOfAll);
                      }}
                      ref={lastOfDisplayed && lastAnswer ? this.lastQuestion : null}
                      answer={answer}
                    />
                  );
                })}
              </Col>
            </Row>
          </div>
          <div className="mb-2">
            {this.renderFeedback(answered)}
          </div>
        </div>
      )
    });
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className ? className : null}>
        {this.renderQuestionSection()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer }, dispatch);

export default connect(null, mapDispatchToProps)(Quiz);