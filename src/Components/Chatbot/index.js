import React, { Component } from 'react';
import Message from './Message';
import ButtonGroup from './ButtonGroup';
import Description from './Description';
import { Alert } from 'reactstrap';
import Quiz from './Quiz';
import { connect } from 'react-redux';
import { postCourseData } from '../CoursesDashboard/request';

const generateMessageObject = (data, type) => {
  return {
    answer: data.answer,
    nextPossibleAnswers: data.nextPossibleAnswers,
    displayData: data.displayData,
    type
  }
}

class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MessageList: [],
      input: "",
      message: "This span will get typed",
      course_id: 1
    }

    this.InputChangeHandler = this.InputChangeHandler.bind(this);
    this.RenderMessageList = this.RenderMessageList.bind(this);
    this.onSend = this.onSend.bind(this);
    this.RenderError = this.RenderError.bind(this);
  }

  async getAnswer( question, course_id ) {
    const beginData = await postCourseData('/sessions/getanswer', { question, course_id });
    if ( beginData ) {
      this.setState({
        MessageList: [...this.state.MessageList,  generateMessageObject(beginData, "bot")]
      });
    }
}

  async componentDidMount() {
    await this.getAnswer("BEGINNING", this.state.course_id);
  }

  InputChangeHandler(e) {
    this.setState({
      input: e.target.value
    })
  }

  async onSend(choice) {
    const data = { answer: choice }
    this.setState({
      MessageList: [...this.state.MessageList,  generateMessageObject(data, "user")]
    });
    await this.getAnswer(choice, this.state.course_id);
  }

  renderContent(message) {
    const { displayData } = message;
    const keys = Object.keys(displayData);
    if ( keys.length !== 0 ) {
      if ( keys.includes("descriptionId") ) {
        return <Description data={displayData} />;
      }
      return <Quiz data={displayData} />;
    }
  }

  RenderMessageList() {
    const { MessageList } = this.state;
    return MessageList.map((message, index) => {
      if ( index === MessageList.length - 1 && message.nextPossibleAnswers ) {
        return (
          <React.Fragment key={index}>
            <Message typing type={message.type} text={message.answer} />
            {this.renderContent(message)}
            <ButtonGroup onClick={this.onSend} choices={message.nextPossibleAnswers} />
          </React.Fragment>
        )
      }
      return <Message key={index} type={message.type} text={message.answer} />
    });
  }

  RenderError() {
    if ( this.props.error ) {
      return <Alert color="danger">{this.props.error}</Alert>
    }
  }

  render() {
    return (
      <div style={{ maxWidth: 700 }}>
        {this.RenderError()}
        {this.RenderMessageList()}
      </div>
    );
  }
}

const mapStatetToProps = state => ({
  error: state.courses.coursesFetchingError
});

export default connect(mapStatetToProps)(Chatbot);