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
    this.bottomAnchor = React.createRef();
  }

  async begin() {
    const { getAnswer, resetMessageList, course, user } = this.props;
    resetMessageList();
    await getAnswer("BEGINNING", course, user);
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
    await this.props.getAnswer(choice, this.props.course, this.props.user, historyId, contextId);
    
  }

  RenderMessageList() {
    const { messageList } = this.props;
    return messageList.map((message, index) => {
      //const mostNew = index === messageList.length - 1 && message.nextPossibleAnswers;
      const mostNew = index === messageList.length - 1;
      return (
        <div key={index}>
          <Message
            typing={mostNew}
            type={message.type}
            data = {message.data}
            courseId={this.props.course}
            user={this.props.user}
          />
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
        className="mx-auto border border-primary"
      >
        <div className="d-flex flex-column h-100 flex-grow" >
          <div style={{ overflow: "scroll"  }} className="flex-fill">
            <div className="m-5">
              {this.RenderError()}
              {this.RenderMessageList()}
            </div>
            <div ref={this.bottomAnchor}></div>
          </div>
          <div className="border-top border-primary py-3 justify-content-center d-flex">
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