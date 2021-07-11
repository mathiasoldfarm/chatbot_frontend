import React, { Component } from 'react';
import PagesContainer from '../PagesContainer';
import { connect } from 'react-redux';
import CourseMenuItem from './CourseMenuItem';

class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  renderCategories() {
    const { categories } = this.props;
    if ( categories.constructor === Array ) {
      return categories.map(category => (
        <div className="mb-5">
          <h2 style={{ textTransform: 'capitalize' }}>{category.title}</h2>
          <div>
            {category.courses.map(course => <CourseMenuItem course={course.title} status={course.status} color={category.color} />)}
          </div>
        </div>
      ))
    }
  }

  render() {
    return (
      <PagesContainer>
        {this.renderCategories()}
      </PagesContainer>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.pages.data
});
export default connect(mapStateToProps)(Subjects);