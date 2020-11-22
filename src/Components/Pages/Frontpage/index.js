import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPageData } from '../../../Redux/Actions/Pages';
import { Spinner, Alert, Row, Col } from 'reactstrap';
import Category from './Category';
import Subcategory from './Subcategory';

class Frontpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: ''
    }

    props.fetchPageData();
    this.renderCategories = this.renderCategories.bind(this);
    this.renderSubCategories = this.renderSubCategories.bind(this);
  }

  renderCategories() {
    const { categories } = this.props;
    if ( categories ) {
      return (
        <Row>
          {Object.keys(categories).map((category) => {
            const { colorClass } = categories[category];
            return (
            <Col key={category}>
              <Category
                onClick={() => {
                  if (this.state.selectedCategory === category) {
                    this.setState({ selectedCategory: '' });
                  } else {
                    this.setState({ selectedCategory: category });
                  }
                }}
                colorClass={colorClass}
                category={category}
              />
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
    const { fetching, fetchingError } = this.props;
    if ( fetching ) {
      return <Spinner />
    }
    if ( fetchingError ) {
      return <Alert color="danger">{fetchingError}</Alert>
    }
    return (
     <div>
       <Row className="mb-5">
         <Col xs={2}></Col>
         <Col xs={8}>{this.renderCategories()}</Col>
         <Col xs={2}></Col>
       </Row>
       <div>
         {this.renderSubCategories()}
       </div>
     </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.pages.fetching,
  fetchingError: state.pages.fetchingError,
  categories: state.pages.data.categories
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);