import React, { Component } from 'react';
import Message from './Message';
import ButtonGroup from './ButtonGroup';
import { Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnswer, addUserAnswer } from '../../Redux/Actions/Chatbot';

class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      message: "This span will get typed",
      courseId: 1
    }

    this.InputChangeHandler = this.InputChangeHandler.bind(this);
    this.RenderMessageList = this.RenderMessageList.bind(this);
    this.onSend = this.onSend.bind(this);
    this.RenderError = this.RenderError.bind(this);
    this.RenderSpinner = this.RenderSpinner.bind(this);
  }

  async componentDidMount() {
    await this.props.getAnswer("BEGINNING", this.state.courseId);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  InputChangeHandler(e) {
    this.setState({
      input: e.target.value
    })
  }

  async onSend(choice) {
    const data = { answer: choice }
    this.props.addUserAnswer(data);
    await this.props.getAnswer(choice, this.state.courseId);
  }

  RenderMessageList() {
    const { messageList } = this.props;
    return messageList.map((message, index) => {
      const mostNew = index === messageList.length - 1 && message.nextPossibleAnswers;
      return (
        <div key={index} ref={mostNew ? (el) => { this.latestMessage = el; } : null}>
          <Message
            typing={mostNew}
            type={message.type}
            text={message.answer}
            displayData={message.displayData}
            courseId={this.state.courseId}
          />
          {mostNew ? (
            <ButtonGroup onClick={this.onSend} choices={message.nextPossibleAnswers} />
          ) : null}
        </div>
      );
    });
  }

  RenderError() {
    if ( this.props.fetchingMessageError ) {
      return <div className="my-2">
        <Alert color="danger">{this.props.fetchingMessageError}</Alert>
      </div>
    }
  }

  RenderSpinner() {
    if ( this.props.fetchingMessage ) {
      return <div className="my-2">
        <Spinner color="primary" />
      </div>
    }
  }

  scrollToBottom = () => {
    if ( this.latestMessage ) {
      this.latestMessage.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    return (
      <div
        style={{ maxWidth: 1000, height: 1000, maxHeight: 1000, overflow: "scroll" }}
        className="mx-auto pb-5 border border-primary p-5"
      >
        {this.RenderError()}
        {this.RenderSpinner()}
        {this.RenderMessageList()}
      </div>
    );
  }
}

const mapStatetToProps = state => ({
  messageList: state.chatbot.messageList,
  fetchingMessage: state.chatbot.fetchingMessage,
  fetchingMessageError: state.chatbot.fetchingMessageError
});

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer, addUserAnswer }, dispatch);

export default connect(mapStatetToProps, mapDispatchToProps)(Chatbot);