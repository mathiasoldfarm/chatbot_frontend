import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnswer, addUserAnswer } from '../../../../Redux/Actions/Chatbot';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    }

    this.open = this.open.bind(this);
    this.fetchSection = this.fetchSection.bind(this);
  }

  open() {
    if ( this.props.children.length ) {
      this.setState({
        opened: !this.state.opened
      });
    }
  }

  async fetchSection() {
    const { title, sectionId, courseId, historyId, addUserAnswer, getAnswer, contextId } = this.props;
    addUserAnswer(`Can I see the section ${title}?`);
    // TODO: Handle user
    await getAnswer(sectionId, courseId, 1, historyId, contextId, 2);
  }

  render() {
    const { title, depth, children } = this.props;
    const { opened } = this.state;

    return (
      <React.Fragment>
        <Row className="align-items-center">
          <Col xs={3}>
            <Button
              size="sm"
              style={{ fontSize: 10 }}
              color="primary"
              onClick={this.fetchSection}
            >
              Se sektion
            </Button>
          </Col>
          <Col
            style={{ borderTop: '1px solid rgb(227,227,227)' }}
            className={`py-3 d-flex ${children.length ? 'pointer-on-hover': ''} ${children.length ? 'red-on-hover': ''} ${opened ? 'red-text' : ''}`}
            onClick={this.open}
          >
            <p
              className={`mb-0`}
              style={{ paddingLeft: depth*20, fontSize: 12}}
            >
              {title}
            </p>
            {children.length ? <FontAwesomeIcon className="ml-auto" icon={opened ? faAngleDown : faAngleRight} /> : null}
          </Col>
        </Row>
        {opened ? children : null}
      </React.Fragment>
    )
  }
} 

const mapStateToProps = state => ({
  courseId: state.chatbot.currentCourseId,
  historyId: state.chatbot.currentHistoryId,
  contextId: state.chatbot.currentContextId
})

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer, addUserAnswer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);