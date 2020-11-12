import React, { Component } from 'react';
import { Card, Row, Col } from 'reactstrap';
import QuizButton from './QuizButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnswer, addUserAnswer } from '../../../Redux/Actions/Chatbot';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.selectHandler = this.selectHandler.bind(this);
  }

  async selectHandler(key, choice, contextId) {
    const data = { answer: choice }
    this.props.addUserAnswer(data);
    await this.props.getAnswer(key, this.props.courseId, contextId);
  }

  render() {
    const { className } = this.props;
    const { name, question, possibleAnswers, contextId } = this.props.data;
    return (
      <Card className={className ? `p-4 ${className}` : `p-4`}>
        <h4>{name}</h4>
        <p>{question}</p>
        <div className="p-2">
          <Row>
            <Col xs={6}>
              {Object.keys(possibleAnswers).map(key => {
                const value = possibleAnswers[key];
                return <QuizButton onClick={() => this.selectHandler(key, value, contextId)} answer={value} />;
              })}
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer, addUserAnswer }, dispatch);

export default connect(null, mapDispatchToProps)(Quiz);