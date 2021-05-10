import React, { Component } from 'react';
import { connect } from 'react-redux';
import Account from '../';
import CourseMenuItem from '../../Subjects/CourseMenuItem';

class CurrentCourses extends Component {
  renderCategories() {
    const { categories } = this.props;
    return Object.keys(categories).map(category => (
      <div className="mb-5">
        <h2 style={{ textTransform: 'capitalize' }}>{category}</h2>
        <div>
          {categories[category].courses?.map(course => <CourseMenuItem course={course.title} status={course.status} color={categories[category].color} />)}
        </div>
      </div>
    ))
  }

  render() {
    return (
      <Account>
        <p>Du er i gang med følgende kurser: </p>
        {this.renderCategories()}
      </Account>
    )
  }
}

const mapStateToProps = state => ({
  message: state.pages.data,
  categories: state.pages.data
});
export default connect(mapStateToProps)(CurrentCourses);