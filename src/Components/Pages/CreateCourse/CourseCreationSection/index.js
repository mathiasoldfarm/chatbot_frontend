import React, { Component } from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import CourseCreationQuestion from './CourseCreationQuestion';

class CourseCreationSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      information: true,
      quiz: false,
      informationText: '',
      questions: [],
      questionsIndex: 0
    }

    this.renderContent = this.renderContent.bind(this);
    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  addNewQuestion() {
    this.setState({
      questionsIndex: this.state.questions.length,
      questions: [...this.state.questions, <CourseCreationQuestion />]
    });
  }

  renderQuestions() {
    const { questions, questionsIndex } = this.state;

    if ( questionsIndex + 1 <= questions.length ) {
      return questions[questionsIndex]
    }
  }

  renderNavigationButtons() {
    const { questions, questionsIndex } = this.state;
    return (
      <div className="d-flex justify-content-center mb-3">
        <div className="d-flex">
          {questions.map((question, index) => (
            <span
              style={{
                height: 20,
                width: 20,
                background: "black",
                display: "block",
                borderRadius: "50%",
                backgroundColor: index === questionsIndex ?  "#0C4F88" : "#72B1E6",
                marginRight: index + 1 === questions.length ? 0 : 7
              }}
              className="pointer-on-hover dark-blue-on-hover"
              onClick={() => this.setState({ questionsIndex: index })}
            >
            </span>
          ))}
        </div>
      </div>
    )
  }

  renderContent() {
    const { information, informationText, quiz, questions } = this.state;
    if ( information ) {
      return (
        <div>
          <Input
            style={{ height: 500, backgroundColor: '#f2f2f2', border: '1px solid #c5c5c5' }}
            className="p-5"
            type="textarea"
            placeholder="Skriv din tekst her..."
            name="text"
            onChange={(e) => this.setState({ informationText: e.target.value })} 
            value={informationText}
          />
        </div>
      )
    } else if ( quiz ) {
      const noQuestions = questions.length === 0;
      return (
        <div
          style={{ height: 500, backgroundColor: '#f2f2f2', border: '1px solid #c5c5c5' }}
          className={noQuestions ? "d-flex align-items-center" : ""}
        >
          {this.renderQuestions()}
          {this.renderNavigationButtons()}
          <Button onClick={this.addNewQuestion} outline color="primary" className="mx-auto d-block">
            Tilføj spørgsmål
          </Button>
        </div>
      );
    }
  }

  render() {
    const { information, quiz } = this.state;

    return (
      <div style={{ height: window.innerHeight, paddingTop: 100, paddingBottom: 100}}>
        <div class="mx-auto" style={{ maxWidth: 300 }}>
          <Row>
            <Col>
              <Button onClick={() => this.setState({ information: true, quiz: false })} block size="lg" color={information ? "primary" : "secondary"} className="mx-auto d-block">
                Information
              </Button>
            </Col>
            <Col>
              <Button onClick={() => this.setState({ information: false, quiz: true })} block size="lg" color={quiz ? "primary" : "secondary"} className="mx-auto d-block">
                Quiz
              </Button>
            </Col>
          </Row>
        </div>
       <div className="mx-auto mt-5" style={{ maxWidth:600 }}>
         {this.renderContent()}
      </div>
      </div>  
    )
  }
}

export default CourseCreationSection;