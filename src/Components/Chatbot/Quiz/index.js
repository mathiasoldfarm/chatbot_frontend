import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import QuizButton from './QuizButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnswer, addUserAnswer } from '../../../Redux/Actions/Chatbot';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      answers: {},
      displayAnswerMessage: false,
      isCorrect: false
    }

    this.selectHandler = this.selectHandler.bind(this);
    this.renderQuestionSection = this.renderQuestionSection.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
  }

  async selectHandler (chosenPossibleAnswerId, questionId, answer, explanation, correct) {
    const {
      addUserAnswer,
      notSendData
    } = this.props;

    this.setState({
      isCorrect: correct,
      displayAnswerMessage: true,
      lastAnswersExplanation: explanation,
      answers: {
        ...this.state.answers,
        [questionId]: chosenPossibleAnswerId
      }
    });
    if ( !notSendData ) {
      addUserAnswer(answer);
    }
  }

  goToNextQuestion() {
    this.setState({
      questionIndex: this.state.questionIndex + 1,
      displayAnswerMessage: false
    });
  }

  submitAnswers() {
    const { courseId, getAnswer, historyId, contextId } = this.props;

    if ( !this.props.notSendData ) {
      getAnswer(this.state.answers, courseId, this.props.user, historyId, contextId, "question"); 
    }
  }

  handleClick(last) {
    if ( last ) {
      this.submitAnswers();
    } else {
      this.goToNextQuestion();
    }
  }

  renderFeedback(last) {
    const { isCorrect, displayAnswerMessage, lastAnswersExplanation } = this.state;
    if ( displayAnswerMessage ) {
      return (
        <div className="mt-3">
          <div>
            {isCorrect ? (
                <p style={{ color: "green" }}>{lastAnswersExplanation}</p>
              ): (
                <p style={{ color: "red" }}>{lastAnswersExplanation}</p>
            )}
          </div>
          <div>
            <Button
              onClick={() => this.handleClick(last)}
              color="primary"
              size="sm"
            >
              {last ? "Done" : "Next question"}
            </Button>
          </div>
        </div>
      );
    }
  }

  renderQuestionSection () {
    const { data } = this.props;
    const { displayAnswerMessage } = this.state;
    const { questions } = data.levels[0];

    const { questionIndex } = this.state;
    const numberOfQuestions = questions.length;
    const currentQuestion = questions[questionIndex]
    const { possibleAnswers } = currentQuestion;
    const last = numberOfQuestions === questionIndex + 1;

    return (
      <div>
        <p>{currentQuestion.question}</p>
        <div className="p-2">
          <Row>
            <Col xs={6}>
              {possibleAnswers.map(possibleAnswer => {
                const { answer, explanation, id } = possibleAnswer;
                const correct = currentQuestion.correct.id === parseInt(id);
                return (
                  <QuizButton
                    disabled={displayAnswerMessage}
                    key={id}
                    onClick={() => this.selectHandler(id, currentQuestion.id, answer, explanation, correct)}
                    answer={answer}
                  />
                );
              })}
            </Col>
          </Row>
        </div>
        <div className="mb-5">
          {this.renderFeedback(last)}
        </div>
        <p>Spørgsmål {questionIndex + 1} ud af {numberOfQuestions}</p>
      </div>
    )
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

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer, addUserAnswer }, dispatch);

export default connect(null, mapDispatchToProps)(Quiz);