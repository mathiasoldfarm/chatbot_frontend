import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Subcategory from './Subcategory';
import PagesContainer from '../PagesContainer';

const formatUrl = (category) => {
  return category.toLowerCase().replace(' ', '-');
}

class Frontpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: ''
    }

    this.renderCategories = this.renderCategories.bind(this);
    this.renderSubCategories = this.renderSubCategories.bind(this);
  }

  renderCategories() {
    const { categories, history } = this.props;
    if ( categories ) {
      return (
        <Row>
          {Object.keys(categories).map((category) => {
            const { color, courses } = categories[category];
            return (
            <Col key={category}>
              <h2>{category}</h2>
              {courses.map(course => (
                <div
                  onClick={() => history.push(`/learn/${formatUrl(course)}`)}
                  className={`bg-${color} pointer-on-hover mb-2 p-3 text-white`}
                >
                  {course}
                </div>
                // <CourseBlock
                //   onClick={() => {
                //     // if (this.state.selectedCategory === category) {
                //     //   this.setState({ selectedCategory: '' });
                //     // } else {
                //     //   this.setState({ selectedCategory: category });
                //     // }
                //     history.push(`/learn/${formatUrl(course)}`)
                //   }}
                //   color={color}
                //   course={course}
                // />
              ))}
            </Col>
            );
          })}
        </Row>
      );
    }
  }

  renderSubCategories() {
    const { selectedCategory } = this.state;
    const { categories } = this.props;
    if ( selectedCategory ) {
      const { subcategories } = categories[selectedCategory];
      return (
        <div className="bg-light p-5 border border-dark">
          {subcategories.map(subcategory => (
            <Subcategory subcategory={subcategory} />
          ))}
        </div>
      )
    }
  }

  render() {
    return (
     <PagesContainer>
       <Row className="mb-5">
         <Col xs={2}></Col>
         <Col xs={8}>{this.renderCategories()}</Col>
         <Col xs={2}></Col>
       </Row>
       <div>
         {this.renderSubCategories()}
       </div>
     </PagesContainer>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.pages.data
});
export default connect(mapStateToProps)(Frontpage);