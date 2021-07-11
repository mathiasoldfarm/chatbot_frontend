import React, { Component } from 'react';
import Message from './Message';
import ButtonGroup from './ButtonGroup';
import { Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnswer, addUserAnswer, resetMessageList, handleMessageListUpdated } from '../../Redux/Actions/Chatbot';

class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      message: "This span will get typed",
    }

    this.InputChangeHandler = this.InputChangeHandler.bind(this);
    this.RenderMessageList = this.RenderMessageList.bind(this);
    this.onSend = this.onSend.bind(this);
    this.RenderError = this.RenderError.bind(this);
    this.RenderSpinner = this.RenderSpinner.bind(this);
    this.begin = this.begin.bind(this);
    //this.calculateMargin = this.calculateMargin.bind(this);
    this.bottomAnchor = React.createRef();
    this.botWrapper = React.createRef();
  }

  async begin() {
    const { getAnswer, resetMessageList, course } = this.props;
    resetMessageList();
    await getAnswer("BEGINNING", course);
  }

  async componentDidMount() {
    await this.begin();
  }

  componentDidUpdate() {
    if ( this.props.messageListUpdated ) {
      handleMessageListUpdated(this.bottomAnchor);
    }
  }

  InputChangeHandler(e) {
    this.setState({
      input: e.target.value
    })
  }

  async onSend(choice, historyId, contextId) {
    this.props.addUserAnswer(choice);
    await this.props.getAnswer(choice, this.props.course, historyId, contextId, 0); 
  }


  RenderMessageList() {
    const { messageList } = this.props;
    if (messageList) {
      //Formatting messages into sections for styling
      const MessageSectionObjects = []
      let currentSection = [];
      messageList.forEach((message, index) => {
        if (message.type === 'user') {
          currentSection.push(message);
        } else {
          if ( index !== 0 ) {
            MessageSectionObjects.push(currentSection);
          }
          currentSection = [ message ];
        }
      });
      MessageSectionObjects.push(currentSection);
      return MessageSectionObjects.map((MessageSection, sectionIndex) => (
          <div
            className="message-section d-flex flex-column justify-content-center"
            style={{ minHeight: 637 }}
          >
            {MessageSection.map((message, messageIndex) => (
              <Message
                key={`${sectionIndex}${messageIndex}`}
                typing={sectionIndex === MessageSectionObjects.length - 1 && messageIndex === MessageSection.length - 1}
                type={message.type}
                data = {message.data}
                courseId={this.props.course}
                user={this.props.user}
              />
            ))}
          </div>
        )
      );
    }
  }

  RenderError() {
    if ( this.props.fetchingMessageError ) {
      console.log(this.props.fetchingMessageError);
      return <div className="my-2">
        <Alert color="danger">{this.props.fetchingMessageError.toString()}</Alert>
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

  renderButtons = () => {
    if ( this.props.messageList.length > 0 ) {
      const { nextPossibleAnswers, historyId, contextId } = this.props.messageList[this.props.messageList.length - 1].data;
      if ( nextPossibleAnswers ) {
        return <ButtonGroup onClick={this.onSend} choices={nextPossibleAnswers} historyId={historyId} contextId={contextId} />
      }
    }
  }

  render() {
    return (
      <div
        style={{ maxWidth: 1000, height: 700, maxHeight: 700 }}
        className="mx-auto"
      >
        <div className="d-flex flex-column flex-grow" style={{ height: 700 }} >
          <div style={{ overflow: "scroll", height: 637  }} className="flex-fill" id="bot-wrapper" ref={this.botWrapper}>
            <div className="m-0">
              {this.RenderError()}
              {this.RenderMessageList()}
            </div>
            <div ref={this.bottomAnchor}></div>
          </div>
          <div className="py-3 justify-content-center d-flex">
            {this.RenderSpinner()}
            {this.renderButtons()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetToProps = state => ({
  messageList: state.chatbot.messageList,
  fetchingMessage: state.chatbot.fetchingMessage,
  fetchingMessageError: state.chatbot.fetchingMessageError,
  messageListUpdated: state.chatbot.messageListUpdated
});

const mapDispatchToProps = dispatch => bindActionCreators({ getAnswer, addUserAnswer, resetMessageList }, dispatch);

export default connect(mapStatetToProps, mapDispatchToProps)(Chatbot);