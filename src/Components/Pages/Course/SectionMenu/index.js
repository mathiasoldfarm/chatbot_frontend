import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Menu from '../../../Elements/Menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnswer, addUserAnswer } from '../../../../Redux/Actions/Chatbot';
import currentSectionName from '../../../../Utils/CurrentSectionName';

class SectionMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    }

    this.open = this.open.bind(this);
    this.fetchSection = this.fetchSection.bind(this);
    this.setOpenedBasedOnCurrentBotSection = this.setOpenedBasedOnCurrentBotSection.bind(this);
  }

  open() {
    if ( this.props.children.length ) {
      this.setState({
        opened: !this.state.opened
      });
    }
  }

  componentDidMount() {
    this.setOpenedBasedOnCurrentBotSection();
  }

  componentDidUpdate(prevProps) {
    if ( this.props.currentSectionName !== prevProps.currentSectionName ) {
      this.setOpenedBasedOnCurrentBotSection();
    }
  }

  async fetchSection() {
    const { title, sectionId, courseId, historyId, addUserAnswer, getAnswer, contextId } = this.props;
    addUserAnswer(`Can I see the section ${title}?`);
    // TODO: Handle user
    await getAnswer(sectionId, courseId, 1, historyId, contextId, 2);
  }

  setOpenedBasedOnCurrentBotSection() {
    const { currentSectionName, children } = this.props;

    // Check if any children contains current section name
    const queue = [...children];
    let opened = false;
    while (queue.length !== 0) {
      const current = queue.pop();

      if (current.props.title === currentSectionName) {
        opened = true;
        break;
      }

      if (current.props.children.length > 0) {
        current.props.children.forEach(child => queue.push(child));
      }
    }
    this.setState({ opened });
  }

  render() {
    const { title, depth, children, done } = this.props;
    const { opened } = this.state;

    return (
      <React.Fragment>
        <Row className="align-items-center">
          {/* <Col xs={3}>
            <Button
              size="sm"
              style={{ fontSize: 10 }}
              color="primary"
              onClick={this.fetchSection}
            >
              Se sektion
            </Button>
          </Col> */}
          <Col
            onClick={this.open}
          >
            <Menu done={done} children={children} title={title} opened={opened} depth={depth} />
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
  contextId: state.chatbot.currentContextId,
  currentSectionName: currentSectionName(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer, addUserAnswer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SectionMenu);