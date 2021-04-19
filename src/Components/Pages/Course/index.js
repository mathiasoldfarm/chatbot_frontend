import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Chatbot from '../../Chatbot';
import PagesContainer from '../PagesContainer';
import CourseSearch from './CourseSearch';
import SectionMenu from './SectionMenu';

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 1,
      selectedCourse: 1,
    }

    this.renderChatbot = this.renderChatbot.bind(this);
  }

  renderChatbot() {
    const { coursesData } = this.props;
    const { selectedCourse, user } = this.state;

    if (coursesData) {
      return <Chatbot course={selectedCourse} user={user} />
    }
  }

  renderSectionsRecursively(root, depth) {
    const { children, name, id } = root;
    if ( root.children ) {
      return (
        <SectionMenu key={id} title={name} sectionId={id} depth={depth} >
          {children.map(child => this.renderSectionsRecursively(child, depth + 1))}
        </SectionMenu>
      );
    }
    return <SectionMenu title={name} sectionId={id} />;
  }

  renderSections() {
    const { coursesData } = this.props;
    if ( coursesData ) {
      return coursesData.map(root => this.renderSectionsRecursively(root, 1));
    }
  }

  render() {
    return (
      <PagesContainer>
        <div className="mb-5">
          Velkommen til. Her kan du lære om matematik. Vælg et emne nedenfor.
        </div>
        <Row>
          <Col xs={5}>
            <CourseSearch className="mb-4" />
            { this.renderSections()}
          </Col>
          <Col xs={7}>
            {this.renderChatbot()}
          </Col>
        </Row>
      </PagesContainer>
    );
  }
}

const mapStateToProps = state => ({
  coursesData: Array.isArray(state.pages.data) ? state.pages.data : null
});

export default connect(mapStateToProps)(Course);