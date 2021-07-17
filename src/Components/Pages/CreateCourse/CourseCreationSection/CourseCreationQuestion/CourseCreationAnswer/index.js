import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const CourseCreationAnswer = (props) => {
  const { checked, setSelectedAnswer, answer, answerChangeHandler, questionIndex, index } = props;
  return (
    <div
      style={{
        backgroundColor: '#007bff',
        borderRadius: 5
      }}
    >
      <div
        className="d-flex"
        style={{
          padding: "9px 16px"
        }}
      >
        <div className="d-flex align-items-center" >
          <FontAwesomeIcon
            icon={checked ? faCheckCircle : faCircle}
            className="pointer-on-hover"
            style={{
              fontSize: 24,
              color: "white"
            }}
            onClick={() => setSelectedAnswer(questionIndex, index)}
          />
        </div>
        <Input
          value={answer}
          onChange={(e) => answerChangeHandler(questionIndex, index, e.target.value)}
          style={{
            background: "none",
            textAlign: "center",
            border: 0,
            color: "white",
            padding: 0,
            margin: 0,
            height: 27
          }}
          className="course-creation-answer"
          placeholder="Giv en svarmulighed her"
        />
      </div>
    </div>
  );
}

export default CourseCreationAnswer;