import React from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import CourseCreationQuestion from './CourseCreationQuestion';

const CourseCreationSection = (props) => {
  const {
    height,
    addNewSection,
    sections,
    index,
    information,
    quiz,
    setSectionTypeInformation,
    setSectionTypeQuiz
  } = props;

  return (
    <div className="d-flex flex-column py-5" style={{ height: height }}>
      <div className="flex-fill">
        <div className="mx-auto" style={{ maxWidth: 300 }}>
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
        <div className="mx-auto mt-5" style={{ maxWidth:600 }}>
          {renderContent(props)}
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

const renderQuestions = (props) => {
  const { questionIndex, index, questions, addAnswer, setSelectedAnswer, answerChangeHandler, questionChangeHandler } = props;
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
      />
    );
  }
}

const renderNavigationButtons = (props) => {
  const { questions, questionIndex, setQuestionIndex, index } = props
  return (
    <div className="d-flex justify-content-center mb-3">
      <div className="d-flex">
        {questions.map((question, i) => (
          <span
            key={index}
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

const renderContent = (props) => {
  const { information, informationText, quiz, questions, index, informationTextChangeHandler, addNewQuestion } = props;
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
        {renderQuestions(props)}
        {renderNavigationButtons(props)}
        <Button onClick={() => addNewQuestion(index)} outline color="primary" className="mx-auto d-block">
          Tilføj spørgsmål
        </Button>
      </div>
    );
  }
}

export default CourseCreationSection;