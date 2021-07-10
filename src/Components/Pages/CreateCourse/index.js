import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'reactstrap';
import PagesContainer from '../PagesContainer';

class CreateCourse extends Component {
  render() {
    return (
      <PagesContainer>
        <Input placeholder="Giv dit kursus et navn..." className="create-course-name" />
        <Row className="mt-5">
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
      </PagesContainer>
    );
  }
}

export default CreateCourse;