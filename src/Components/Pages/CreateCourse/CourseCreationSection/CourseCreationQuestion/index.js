import React, { Component } from 'react';
import { Input, Row, Col } from 'reactstrap';
import CourseCreationAnswer from './CourseCreationAnswer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Course from '../../../Course';

class CourseCreationQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: 1,
      selected: 0
    }

    this.addAnswer = this.addAnswer.bind(this);
  }

  addAnswer() {
    this.setState({
      answers: this.state.answers + 1
    })
  }

  render() {
    const { answers, selected } = this.state;
    return (
      <div style={{ height: "79%", marginBottom: "2%" }}>
        <div>
          <div className="mb-5">
            <Input
              type="textarea"
              placeholder="Skriv dit spørgsmål her..."
              style={{
                background: null,
              }}
            />
          </div>
          <div>
            <Row>
              <Col xs={8}>
                {Array(answers).fill(0).map((_, index) => (
                  <div
                    className={index + 1 === answers.length ? "" : "mb-3"}
                  >
                    <CourseCreationAnswer
                      checked={index === selected}
                      onClick={() => this.setState({ selected: index })}
                    />
                  </div>
                ))}
              </Col>
              <Col xs={4}>
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  style={{ fontSize: 35, color: "#0C4F88" }}
                  className="pointer-on-hover"
                  onClick={this.addAnswer}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseCreationQuestion;