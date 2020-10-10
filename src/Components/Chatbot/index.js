import React, { Component } from 'react';
import Message from './Message';
import ButtonGroup from './ButtonGroup';
import axios from 'axios';
import { postCourseData } from '../CoursesDashboard/request';

const generateMessageObject = (data, type) => {
  return {
    answer: data.answer,
    nextPossibleAnswers: data.nextPossibleAnswers,
    type
  }
}

class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MessageList: [],
      input: "",
      message: "This span will get typed"
    }

    this.InputChangeHandler = this.InputChangeHandler.bind(this);
    this.RenderMessageList = this.RenderMessageList.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  async getAnswer( question ) {
    const beginData = await postCourseData('/sessions/getanswer', { question });
    console.log(beginData);
    this.setState({
      MessageList: [...this.state.MessageList,  generateMessageObject(beginData, "bot")]
    });
  }

  async componentDidMount() {
    await this.getAnswer("BEGINNING");
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
    await this.getAnswer(choice);
  }

  RenderMessageList() {
    const { MessageList } = this.state;
    return MessageList.map((message, index) => {
      if ( index === MessageList.length - 1 && message.nextPossibleAnswers ) {
        return (
          <React.Fragment>
            <Message typing type={message.type} text={message.answer} />
            <ButtonGroup onClick={this.onSend} choices={message.nextPossibleAnswers} />
          </React.Fragment>
        )
      }
      return <Message type={message.type} text={message.answer} />
    });
  }

  render() {
    const { message } = this.state;

    return (
      <div style={{ maxWidth: 700 }}>
        {this.RenderMessageList()}
      </div>
    );
  }
}

export default Chatbot;