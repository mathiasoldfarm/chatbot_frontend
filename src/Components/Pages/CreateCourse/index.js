import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'reactstrap';
import PagesContainer from '../PagesContainer';
import CourseCreationSection from './CourseCreationSection';

class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: []
    }

    this.addNewSection = this.addNewSection.bind(this);
  }

  addNewSection() {
    this.setState({
      sections: [...this.state.sections, <CourseCreationSection />]
    });
  }

  renderBeginning() {
    return (
      <div class="d-flex flex-column py-5" style={{ height: window.innerHeight - 56 /*Header height*/ }}>
        <Input placeholder="Giv dit kursus et navn..." className="create-course-name mb-5" />
        <Row className="flex-fill">
          <Col xs={3}>
          </Col>
          <Col>
            <Row>
              <Col>
                <div className="d-flex">
                  <Button outline size="lg" color="primary" className="mx-auto d-block">
                    Vælg en kategori
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="d-flex">
                  <Button outline size="lg" color="primary" className="mx-auto d-block">
                    Vælg en emoji
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
          </Col>
        </Row>
        <div>
          <div className="d-flex">
            <Button disabled={this.state.sections.length > 0} onClick={this.addNewSection} outline size="lg" color="primary" className="mx-auto d-block">
              Tilføj en ny sektion
            </Button>
          </div>
        </div>
      </div>  
    )
  }

  render() {
    console.log(this.state.sections)
    return (
      <PagesContainer noTop>
        <div>
          {this.renderBeginning()}
          {this.state.sections.map(section => section)}
        </div>
      </PagesContainer>
    );
  }
}

export default CreateCourse;