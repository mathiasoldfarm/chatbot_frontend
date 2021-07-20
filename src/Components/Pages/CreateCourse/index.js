import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'reactstrap';
import PagesContainer from '../PagesContainer';
import CourseCreationSection from './CourseCreationSection';
import CourseCreationQuestion from './CourseCreationSection/CourseCreationQuestion';

class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: []
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
  }

  addNewSection() {
    console.log("hej");
    this.setState({
      sections: [...this.state.sections, {
        information: true,
        quiz: false,
        informationText: '',
        questions: [],
        questionIndex: 0
      }]
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
      </PagesContainer>
    );
  }
}

export default CreateCourse;