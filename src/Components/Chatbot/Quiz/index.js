import React, { Component } from 'react';
import { Card, Row, Col } from 'reactstrap';
import QuizButton from './QuizButton';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    }

    this.renderFeedback = this.renderFeedback.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
  }

  renderFeedback() {
    const { selected } = this.state;
    const { correct } = this.props.data;
    if ( selected != null ) {
      if ( selected == correct) {
        return <p className="text-success">Congratulations! You selected the right answer.</p>
      } else {
        return <p className="text-danger">You didn't select the right answer. But don't worry, we'll figure it out.</p>
      }
    }
  }

  selectHandler(key) {
    this.setState({
      selected: key
    })
  }

  render() {
    const { className } = this.props;
    const { name, question, possibleAnswers, correct } = this.props.data;
    return (
      <Card className={className ? `p-4 ${className}` : `p-4`}>
        <h4>{name}</h4>
        <p>{question}</p>
        {this.renderFeedback()}
        <div className="p-2">
          <Row>
            <Col xs={6}>
              {Object.keys(possibleAnswers).map(key => {
                const value = possibleAnswers[key];
                return <QuizButton onClick={() => this.selectHandler(key)} answer={value} />;
              })}
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

export default Quiz;