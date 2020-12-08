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
      const data = { answer }
      addUserAnswer(data);
    }
  }

  goToNextQuestion() {
    this.setState({
      questionIndex: this.state.questionIndex + 1,
      displayAnswerMessage: false
    });
  }

  submitAnswers() {
    const contextId = this.props.data.contextId;
    const { courseId, getAnswer } = this.props;

    if ( !this.props.notSendData ) {
      getAnswer(this.state.answers, courseId, contextId, "question"); 
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
        <div>
          <Row>
            <Col xs={8}>
              {isCorrect ? (
                <p style={{ color: "green" }}>{lastAnswersExplanation}</p>
              ): (
                <p style={{ color: "red" }}>{lastAnswersExplanation}</p>
              )}
            </Col>
            <Col xs={4}>
              <Button onClick={() => this.handleClick(last)} color="primary" size="sm">{last ? "Done" : "Next question"}</Button>
            </Col>
          </Row>
        </div>
      );
    }
  }

  renderQuestionSection () {
    const { data } = this.props;
    const { displayAnswerMessage } = this.state;
    const { question } = data;

    const { questionIndex } = this.state;
    const numberOfQuestions = Object.keys(question).length;
    const currentQuestion = Object.keys(question)[questionIndex]
    const currentQuestionData = question[currentQuestion];
    const { possibleAnswers } = currentQuestionData;
    const last = numberOfQuestions === questionIndex + 1;

    return (
      <div>
        <p>{currentQuestion}</p>
        <div className="p-2 mb-2">
          <Row>
            <Col xs={6}>
              {Object.keys(possibleAnswers).map(key => {
                const { possibleAnswer, explanation } = possibleAnswers[key];
                const correct = currentQuestionData.correct === parseInt(key);
                return (
                  <QuizButton
                    disabled={displayAnswerMessage}
                    key={key}
                    onClick={() => this.selectHandler(key, currentQuestionData.questionId, possibleAnswer, explanation, correct)}
                    answer={possibleAnswer}
                  />
                );
              })}
            </Col>
          </Row>
        </div>
        {this.renderFeedback(last)}
        <p>Spørgsmål {questionIndex + 1} ud af {numberOfQuestions}</p>
      </div>
    )
  }

  render() {
    const { className, data } = this.props;
    const { name} = data;
    return (
      <div className={className ? `pt-4 ${className}` : `pt-4`}>
        <h4>{name}</h4>
        {this.renderQuestionSection()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer, addUserAnswer }, dispatch);

export default connect(null, mapDispatchToProps)(Quiz);