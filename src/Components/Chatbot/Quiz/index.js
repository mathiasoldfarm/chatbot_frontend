import React, { Component } from 'react';
import { Card, Row, Col } from 'reactstrap';
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
  }

  delay(ms){
    return new Promise(res => setTimeout(res, ms))
  };

  async selectHandler (chosenPossibleAnswerId, questionId, choice, contextId, last, correct) {
    const {
      addUserAnswer,
      getAnswer,
      courseId,
      notSendData
    } = this.props;
    

    this.setState({
      isCorrect: correct,
      displayAnswerMessage: true,
      answers: {
        ...this.state.answers,
        [questionId]: chosenPossibleAnswerId
      }
    });
    if ( !notSendData ) {
      const data = { answer: choice }
      addUserAnswer(data);
    }
    await this.delay(2000);
    this.setState({ displayAnswerMessage: false });

    if (last) {
      if ( !notSendData ) {
        await getAnswer(this.state.answers, courseId, contextId, "question"); 
      }
    } else {
      this.setState({
        questionIndex: this.state.questionIndex + 1
      })
    }
  }

  renderFeedback() {
    const { isCorrect, displayAnswerMessage } = this.state;
    if ( displayAnswerMessage ) {
      if ( isCorrect ) {
        return <p style={{ color: "green" }}>You'r answer was correct</p>
      } else {
        return <p style={{ color: "red" }}>You'r answer was not correct</p>
      }
    }
  }

  renderQuestionSection () {
    const { data } = this.props;
    const { contextId, question } = data;

    const { questionIndex } = this.state;
    const numberOfQuestions = Object.keys(question).length;
    const currentQuestion = Object.keys(question)[questionIndex]
    const currentQuestionData = question[currentQuestion];
    const { possibleAnswers } = currentQuestionData;
    const last = numberOfQuestions === questionIndex + 1;

    return (
      <div>
        <p>{currentQuestion}</p>
        {this.renderFeedback()}
        <div className="p-2 mb-2">
          <Row>
            <Col xs={6}>
              {Object.keys(possibleAnswers).map(key => {
                const value = possibleAnswers[key];
                const correct = currentQuestionData.correct === key;
                return (
                  <QuizButton
                    key={key}
                    onClick={() => this.selectHandler(key, currentQuestionData.questionId, value, contextId, last, correct)}
                    answer={value}
                  />
                );
              })}
            </Col>
          </Row>
        </div>
        <p>Spørgsmål {questionIndex + 1} ud af {numberOfQuestions}</p>
      </div>
    )
  }

  render() {
    const { className, data } = this.props;
    const { name} = data;
    return (
      <Card className={className ? `p-4 ${className}` : `p-4`}>
        <h4>{name}</h4>
        {this.renderQuestionSection()}
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer, addUserAnswer }, dispatch);

export default connect(null, mapDispatchToProps)(Quiz);