import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class CourseCreationAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: ""
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      answer: e.target.value
    });
  }

  render() {
    const { answer } = this.state;
    const { checked, onClick } = this.props;
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
              onClick={onClick}
            />
          </div>
          <Input
            value={answer}
            onChange={this.changeHandler}
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
}

export default CourseCreationAnswer;