import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'reactstrap';
import PagesContainer from '../PagesContainer';
import CourseCreationSection from './CourseCreationSection';
import CourseCreationQuestion from './CourseCreationSection/CourseCreationQuestion';

class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [],
      currentPosition: -1
    }

    this.addNewSection = this.addNewSection.bind(this);
    this.questionChangeHandler = this.questionChangeHandler.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.setSelectedAnswer = this.setSelectedAnswer.bind(this);
    this.answerChangeHandler = this.answerChangeHandler.bind(this);
    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.setSectionTypeInformation = this.setSectionTypeInformation.bind(this);
    this.setSectionTypeQuiz = this.setSectionTypeQuiz.bind(this);
    this.setQuestionIndex = this.setQuestionIndex.bind(this);
    this.informationTextChangeHandler = this.informationTextChangeHandler.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const currentPosition = Math.round(window.pageYOffset / (window.innerHeight - 56) ) - 1;
    if ( this.state.currentPosition !== currentPosition ) {
      this.setState({
        currentPosition: currentPosition
      })
    }
  }

  addNewSection() {
    this.setState({
      sections: [...this.state.sections, {
        information: true,
        quiz: false,
        informationText: '',
        questions: [],
        questionIndex: 0
      }]
    }, () => {
      window.scrollTo({
        top: (window.innerHeight - 56) * this.state.sections.length - 1,
        left: 0,
        behavior: 'smooth'
      });
    });
  }

  addNewQuestion(sectionIndex) {
    this.setState({
      sections: this.state.sections.map((section, index) => {
        if ( sectionIndex === index ) {
          return {
            ...section,
            questionIndex: section.questions.length,
            questions: [...section.questions, { question: "", answers: [""], selected: 0 }]
          }
        }
        return section;
      })
    });
  }

  questionChangeHandler(sectionIndex, questionIndex, newQuestion) {
    this.setState({
      sections: this.state.sections.map((section, index) => {
        if ( sectionIndex === index ) {
          return {
            ...section,
            questions: section.questions.map((question, index) => {
              if (questionIndex === index) {
                return {
                  ...question,
                  question: newQuestion
                }
              }
              return question;
            })
          }
        }
        return section;
      })
    });
  }

  addAnswer(sectionIndex, questionIndex) {
    this.setState({
      sections: this.state.sections.map((section, index) => {
        if ( sectionIndex === index ) {
          return {
            ...section,
            questions: section.questions.map((question, index) => {
              if (questionIndex === index) {
                return {
                  ...question,
                  answers: [...question.answers, ""]
                }
              }
              return question;
            })
          }
        }
        return section;
      })
    });
  }

  setSelectedAnswer(sectionIndex, questionIndex, answerIndex) {
    this.setState({
      sections: this.state.sections.map((section, index) => {
        if ( sectionIndex === index ) {
          return {
            ...section,
            questions: section.questions.map((question, index) => {
              if (questionIndex === index) {
                return {
                  ...question,
                  selected: answerIndex
                }
              }
              return question;
            })
          }
        }
        return section;
      })
    });
  }

  answerChangeHandler(sectionIndex, questionIndex, answerIndex, newAnswer) {
    this.setState({
      sections: this.state.sections.map((section, index) => {
        if ( sectionIndex === index ) {
          return {
            ...section,
            questions: section.questions.map((question, index) => {
              if (questionIndex === index) {
                return {
                  ...question,
                  answers: question.answers.map((answer, index2) => {
                    if (answerIndex === index2) {
                      return newAnswer
                    }
                    return answer;
                  })
                }
              }
              return question;
            })
          }
        }
        return section;
      })
    });
  }

  setSectionTypeInformation(sectionIndex) {
    this.setState({
      sections: this.state.sections.map((section, index) => {
        if ( sectionIndex === index ) {
          return {
            ...section,
            information: true,
            quiz: false
          }
        }
        return section;
      })
    });
  }

  setSectionTypeQuiz(sectionIndex) {
    this.setState({
      sections: this.state.sections.map((section, index) => {
        if ( sectionIndex === index ) {
          return {
            ...section,
            information: false,
            quiz: true
          }
        }
        return section;
      })
    });
  }

  setQuestionIndex(sectionIndex, questionIndex) {
    this.setState({
      sections: this.state.sections.map((section, index) => {
        if ( sectionIndex === index ) {
          return {
            ...section,
            questionIndex
          }
        }
        return section;
      })
    });
  }

  informationTextChangeHandler(sectionIndex, newText) {
    this.setState({
      sections: this.state.sections.map((section, index) => {
        if ( sectionIndex === index ) {
          return {
            ...section,
            informationText: newText
          }
        }
        return section;
      })
    });
  }

  renderBeginning() {
    return (
      <div className="d-flex flex-column py-5" style={{ height: window.innerHeight - 56 /*Header height*/ }}>
        <Input placeholder="Giv dit kursus et navn..." className="create-course-name mb-5" />
        <Row className="flex-fill">
          <Col xs={3}>
          </Col>
          <Col>
            <Row>
              <Col>
                <div className="d-flex">
                  <Button outline size="lg" color="primary" className="mx-auto d-block">
                    Vælg en kategori
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="d-flex">
                  <Button outline size="lg" color="primary" className="mx-auto d-block">
                    Vælg en emoji
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
          </Col>
        </Row>
        <div>
          <div className="d-flex">
            {this.state.sections.length === 0 ? (
              <Button disabled={this.state.sections.length > 0} onClick={this.addNewSection} outline size="lg" color="primary" className="mx-auto d-block">
                Tilføj en ny sektion
              </Button>
            ) : null}
          </div>
        </div>
      </div> 
    )
  }

  render() {
    return (
      <PagesContainer noTop>
        <Row>
          <Col xs={1}>
          
          </Col>
          <Col xs={9}>
            <div>
              {this.renderBeginning()}
              {this.state.sections.map((section, index) => {
                const { information, quiz, informationText, questions, questionIndex } = section;
                return (
                  <CourseCreationSection
                    height={window.innerHeight - 56 /*Header height*/ }
                    key={index}
                    addNewSection={this.addNewSection}
                    sections={this.state.sections}
                    index={index}
                    information={information}
                    quiz={quiz}
                    informationText={informationText}
                    questions={questions}
                    questionIndex={questionIndex}
                    addNewQuestion={this.addNewQuestion}
                    questionChangeHandler={this.questionChangeHandler}
                    addAnswer={this.addAnswer}
                    setSelectedAnswer={this.setSelectedAnswer}
                    answerChangeHandler={this.answerChangeHandler}
                    setSectionTypeInformation={this.setSectionTypeInformation}
                    setSectionTypeQuiz={this.setSectionTypeQuiz}
                    setQuestionIndex={this.setQuestionIndex}
                    informationTextChangeHandler={this.informationTextChangeHandler}
                  />
                );
              })}
            </div>
          </Col>
          <Col xs={1}>
            <div style={{ height: window.innerHeight - 56, position: "fixed" /*Header height*/ }} className="d-flex flex-column justify-content-center">
              {this.state.sections.map((section, index) => {
                const currentInView = index === this.state.currentPosition;
                return (
                  <span
                    key={index}
                    style={{
                      height: 20,
                      width: 20,
                      background: "black",
                      display: "block",
                      borderRadius: "50%",
                      backgroundColor: currentInView ? "#0C4F88" : "#72B1E6",
                      marginBottom: index + 1 === this.state.sections.length ? 0 : 7
                    }}
                    className="pointer-on-hover dark-blue-on-hover"
                    onClick={() => window.scrollTo({
                      top: (window.innerHeight - 56) * (index + 1) - 1,
                      left: 0,
                      behavior: 'smooth'
                    })}
                  >
                  </span>
                )
              })}
            </div>
          </Col>
        </Row>
      </PagesContainer>
    );
  }
}

export default CreateCourse;