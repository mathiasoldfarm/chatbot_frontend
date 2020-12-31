import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Chatbot from '../../Chatbot';
import PagesContainer from '../PagesContainer';
import StatusBar from './StatusBar';

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 1,
      selectedCourse: 1,
    }

    this.renderChatbot = this.renderChatbot.bind(this);
    this.renderCourses = this.renderCourses.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
  }

  renderChatbot() {
    const { courseDataByUser } = this.props;
    const { selectedCourse, user } = this.state;

    if (courseDataByUser) {
      return <Chatbot course={selectedCourse} user={user} />
    }
  }

  selectCourse(selectedCourse) {
    this.setState({ selectedCourse });
  }

  renderCourses() {
    const { courseDataByUser } = this.props;
    return courseDataByUser && courseDataByUser.map(courseData => {
      const { status, level, title, id } = courseData;
      return (
        <StatusBar
          key={id}
          level={level}
          status={status}
          title={title}
          onClick={() => this.selectCourse(id)}
        />
      )
    });
  }

  render() {
    return (
      <PagesContainer dependingData={[this.state.user]}>
        <div className="mb-5">
          Velkommen til. Her kan du lære om matematik. Vælg et emne nedenfor.
        </div>
        <Row>
          <Col xs={4}>
            {this.renderCourses()}
          </Col>
          <Col xs={8}>
            {this.renderChatbot()}
          </Col>
        </Row>
      </PagesContainer>
    );
  }
}

const mapStateToProps = state => ({
  courseDataByUser: state.pages.data.courseDataByUser
});

export default connect(mapStateToProps)(Course);