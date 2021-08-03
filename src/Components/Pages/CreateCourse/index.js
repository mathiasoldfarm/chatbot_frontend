import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'reactstrap';
import PagesContainer from '../PagesContainer';
import CourseCreationSection from './CourseCreationSection';
import Chatbot from '../../Chatbot';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSection } from '../../../Redux/Actions/Pages';

class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: -1,
      walkThrough: false
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.goToWalkThrough = this.goToWalkThrough.bind(this);
    this.renderBeginning = this.renderBeginning.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const currentPosition = Math.round(window.pageYOffset / (window.innerHeight - 56) ) - 1;
    if ( this.state.currentPosition !== currentPosition ) {
      this.setState({
        currentPosition: currentPosition
      })
    }
  }

  goToWalkThrough() {
    this.setState({
      walkThrough: true
    });
  }

  renderBeginning() {
    const { addSection } = this.props;
    return (
      <div className="d-flex flex-column py-5" style={{ height: window.innerHeight - 56 /*Header height*/ }}>
        <Input placeholder="Giv dit kursus et navn..." className="create-course-name mb-5" value={this.props.title} />
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
            {this.props.sections.length === 0 ? (
              <Button disabled={this.props.sections.length > 0} onClick={addSection} outline size="lg" color="primary" className="mx-auto d-block">
                Tilføj en ny sektion
              </Button>
            ) : null}
          </div>
        </div>
      </div> 
    )
  }

  render() {
    const { walkThrough, currentPosition } = this.state;
    const { sections } = this.props;
    return (
      <PagesContainer absolute noTop>
        {walkThrough ? (
          <div>
            <Chatbot />
          </div>
        ) : (
          <div>
            {sections ? (
              <Row>
                <Col xs={1}>
                
                </Col>
                <Col xs={9}>
                  <div>
                    {this.renderBeginning()}
                    {sections.map((section, index) => {
                      const { information, quiz, informationText, questions, questionIndex, sectionId, informationTextId } = section;
                      return (
                        <CourseCreationSection
                          height={window.innerHeight - 56 /*Header height*/ }
                          key={index}
                          sections={sections}
                          index={index}
                          sectionId={sectionId}
                          information={information}
                          quiz={quiz}
                          informationText={informationText}
                          informationTextId={informationTextId}
                          questions={questions}
                          questionIndex={questionIndex}
                          addNewQuestion={this.addNewQuestion}
                          goToWalkThrough={this.goToWalkThrough}
                        />
                      );
                    })}
                  </div>
                </Col>
                <Col xs={1}>
                  <div style={{ height: window.innerHeight - 56, position: "fixed" /*Header height*/ }} className="d-flex flex-column justify-content-center">
                    {sections.map((section, index) => {
                      const currentInView = index === currentPosition;
                      return (
                        <span
                          key={index}
                          style={{
                            height: 20,
                            width: 20,
                            background: "black",
                            display: "block",
                            borderRadius: "50%",
                            backgroundColor: currentInView ? "#0C4F88" : "#72B1E6",
                            marginBottom: index + 1 === sections.length ? 0 : 7
                          }}
                          className="pointer-on-hover dark-blue-on-hover"
                          onClick={() => window.scrollTo({
                            top: (window.innerHeight - 56) * (index + 1) - 1,
                            left: 0,
                            behavior: 'smooth'
                          })}
                        >
                        </span>
                      )
                    })}
                  </div>
                </Col>
              </Row>
            ) : null}
          </div>
        )}
      </PagesContainer>
    );
  }
}

const mapStatetToProps = state => ({
  sections: state.pages.data.sections,
  title: state.pages.data.title,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addSection }, dispatch);

export default connect(mapStatetToProps, mapDispatchToProps)(CreateCourse);