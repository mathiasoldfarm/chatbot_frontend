import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Subcategory from './Subcategory';
import PagesContainer from '../PagesContainer';
import Emoji from '../../../Utils/Emoji';

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
         <Col xs={8}>
           <div className="text-center">
            Hej! <Emoji symbol="😀" /><br />
            Velkommen til XYZ. <br />
            <br />
            XYZ vil hjælpe dig med matematik. <br />
            Ikke blot give dig svarene, men hjælpe dig med at forstå matematik.<br />
            Hjælpe dig med at have det sjovt mens du lærer matematik.<br />
            <br />
            XYZ prøver at tilpasse sig dig, så du ikke behøves at ændre dig for at forstå.<br />
            <br />
            Har du feedback, spørgsmål eller andet du vil snakke om, så giv et skriv på hej@xyz.com
           </div>
         </Col>
         <Col xs={2}></Col>
       </Row>
     </PagesContainer>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.pages.data
});
export default connect(mapStateToProps)(Frontpage);