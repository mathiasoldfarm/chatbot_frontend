import React, { Component } from 'react';
import { Card } from 'reactstrap';
import InputLine from './InputLine';
import { updateTitle } from '../../Redux/Actions/Courses';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Courses extends Component {

  renderCourses() {
    const { courseData } = this.props;
    return courseData.map((course, index) => {
      const { title } = course;
      const { updateTitle } = this.props;
      return (
        <Card key={index} className="p-5">
          <div>
            <InputLine name="Title" value={title} onChange={(e) => updateTitle(e.target.value, index)} />
          </div>
        </Card>
      );
    })
  }

  render() {
    return (
      <div>
        <h2>Add, edit or delete course data</h2>
        {this.renderCourses()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  courseData: state.courses.data
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateTitle }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Courses);