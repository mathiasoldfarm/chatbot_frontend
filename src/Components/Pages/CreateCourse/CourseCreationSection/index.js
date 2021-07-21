import React, { Component } from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import CourseCreationQuestion from './CourseCreationQuestion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class CourseCreationSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSectionDeleteButton: false
    }

    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderNavigationButtons = this.renderNavigationButtons.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderQuestions() {
    const { questionIndex, index, questions, addAnswer, setSelectedAnswer, answerChangeHandler, questionChangeHandler, deleteQuestion, deleteAnswer } = this.props;
    if ( questionIndex + 1 <= questions.length ) {
      const { question, answers, selected } = questions[questionIndex];
      return (
        <CourseCreationQuestion
          question={question}
          answers={answers}
          selected={selected}
          questionChangeHandler={questionChangeHandler}
          addAnswer={addAnswer}
          setSelectedAnswer={setSelectedAnswer}
          answerChangeHandler={answerChangeHandler}
          questionIndex={questionIndex}
          sectionIndex={index}
          deleteQuestion={deleteQuestion}
          deleteAnswer={deleteAnswer}
        />
      );
    }
  }
  
  renderNavigationButtons() {
    const { questions, questionIndex, setQuestionIndex, index } = this.props
    return (
      <div className="d-flex justify-content-center mb-3">
        <div className="d-flex">
          {questions.map((question, i) => (
            <span
              key={i}
              style={{
                height: 20,
                width: 20,
                background: "black",
                display: "block",
                borderRadius: "50%",
                backgroundColor: i === questionIndex ?  "#0C4F88" : "#72B1E6",
                marginRight: i + 1 === questions.length ? 0 : 7
              }}
              className="pointer-on-hover dark-blue-on-hover"
              onClick={() => setQuestionIndex(index, i)}
            >
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  renderContent() {
    const { information, informationText, quiz, questions, index, informationTextChangeHandler, addNewQuestion } = this.props;
    if ( information ) {
      return (
        <div>
          <Input
            style={{ height: 500, backgroundColor: '#f2f2f2', border: '1px solid #c5c5c5' }}
            className="p-5 information-input"
            type="textarea"
            placeholder="Skriv din tekst her..."
            name="text"
            onChange={(e) =>  informationTextChangeHandler(index, e.target.value)} 
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
          <Button onClick={() => addNewQuestion(index)} outline color="primary" className="mx-auto d-block">
            Tilføj spørgsmål
          </Button>
        </div>
      );
    }
  }

  render() {
    const {
      height,
      addNewSection,
      sections,
      index,
      information,
      quiz,
      setSectionTypeInformation,
      setSectionTypeQuiz,
      deleteSection
    } = this.props;
  
    return (
      <div className="d-flex flex-column py-5" style={{ height: height }}>
        <div
          className="flex-fill"
          onMouseOver={() => {
            this.setState({
              showSectionDeleteButton: true
            });
          }}
          onMouseLeave={() => {
            this.setState({
              showSectionDeleteButton: false
            });
          }}
        >
          <div style={{ maxWidth: 600 }} className="mx-auto">
            <Row>
              <Col xs={2}>
              
              </Col>
              <Col xs={8}>
                <div className="mx-auto">
                  <Row>
                    <Col>
                      <Button onClick={() => setSectionTypeInformation(index)} block size="lg" color={information ? "primary" : "secondary"} className="mx-auto d-block">
                        Information
                      </Button>
                    </Col>
                    <Col>
                      <Button onClick={() => setSectionTypeQuiz(index)} block size="lg" color={quiz ? "primary" : "secondary"} className="mx-auto d-block">
                        Quiz
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col
                xs={2}
                className="d-flex align-items-center justify-content-end"
              >
                {this.state.showSectionDeleteButton ? (
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ fontSize: 20, color: "#d46666" }}
                    className="pointer-on-hover"
                    onClick={() => deleteSection(index)}
                  />
                ) : null}
              </Col>
            </Row>
          </div>
          <div className="mx-auto mt-5" style={{ maxWidth:600 }}>
            {this.renderContent()}
          </div>
        </div>
        <div>
          <div className="d-flex">
            {index + 1 === sections.length ? (
              <Button onClick={addNewSection} outline size="lg" color="primary" className="mx-auto d-block">
                Tilføj en ny sektion
              </Button>
            ) : null}
          </div>
        </div>
      </div>  
    );
  }
}

export default CourseCreationSection;