import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chatbot from '../../Chatbot';
import PagesContainer from '../PagesContainer';
import CourseSearch from './CourseSearch';
import SectionMenu from './SectionMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 1,
      selectedCourse: 15, //4
      showMenu: true
    }

    this.renderChatbot = this.renderChatbot.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  renderChatbot() {
    const { coursesData } = this.props;
    const { selectedCourse, user } = this.state;

    if (coursesData) {
      return <Chatbot course={selectedCourse} user={user} />
    }
  }

  renderSectionsRecursively(root, depth) {
    const { children, name, id, done } = root;
    if ( root.children ) {
      return (
        <SectionMenu key={id} title={name} sectionId={id} depth={depth} done={done} >
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

  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  renderContent() {
    const { showMenu } = this.state;
    return (
      <div className="d-flex">
        {showMenu ? (
          <div className="pt-3" style={{ width: '50%', maxWidth: 500, background: '#f8f9fa', minHeight: '93vh', maxHeight: '93vh', overflow: 'scroll' }}>
            <CourseSearch className="mb-4" />
            { this.renderSections()}
          </div>
        ) : null}
        <div className="pl-3 pt-3 flex-grow-1">
          <FontAwesomeIcon onClick={this.toggleMenu} className="pointer-on-hover" style={{ fontSize: 30 }} icon={faBars} /> 
          {this.renderChatbot()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <PagesContainer fullWidth noTop>
        {this.renderContent()}
      </PagesContainer>
    );
  }
}

const mapStateToProps = state => ({
  coursesData: Array.isArray(state.pages.data) ? state.pages.data : null
});

export default connect(mapStateToProps)(Course);