import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setSelectedAnswer,
  answerChangeHandler
} from '../../../../../../Redux/Actions/Pages';

const CourseCreationAnswer = (props) => {
  const { checked, setSelectedAnswer, answer, answerChangeHandler, sectionId, questionId, answerId  } = props;
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
            onClick={() => setSelectedAnswer(sectionId, questionId, answerId)}
          />
        </div>
        <Input
          value={answer}
          onChange={(e) => answerChangeHandler(sectionId, questionId, answerId, e.target.value)}
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

const mapDispatchToProps = dispatch => bindActionCreators({
  setSelectedAnswer,
  answerChangeHandler
}, dispatch);

export default connect(null, mapDispatchToProps)(CourseCreationAnswer);