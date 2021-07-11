import React, { Component } from 'react';
import { Button, Input, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnswer, addUserAnswer } from '../../../../Redux/Actions/Chatbot';


class CourseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }

    this.searchForSection = this.searchForSection.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async searchForSection() {
    const { courseId, historyId, addUserAnswer, getAnswer, contextId } = this.props;
    const { searchText } = this.state;
    addUserAnswer(`Do you know anything about ${searchText}?`);
    // TODO: Handle user
    await getAnswer(searchText, courseId, historyId, contextId, 3);
  }

  onChange(e) {
    const searchText = e.target.value;
    this.setState({ searchText });
  }

  render() {
    return (
      <div className={this.props.className}>
        <Row>
          <Col xs={9}>
            <Input
              type="text"
              placeholder="Search for content in this course..."
              onChange={this.onChange}
            />
          </Col>
          <Col>
            <Button
              size="sm"
              onClick={this.searchForSection}
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courseId: state.chatbot.currentCourseId,
  historyId: state.chatbot.currentHistoryId,
  contextId: state.chatbot.currentContextId
})

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer, addUserAnswer }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(CourseSearch);