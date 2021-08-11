import React, { Component } from 'react';
import Typing from '../Typing';
import Quiz from '../Quiz';
import Feedback from '../Feedback';
import Description from '../Description';
import { Button } from 'reactstrap';

const renderContent = (data, courseId, user, onFeedbackChange, feedbackValue, index) => {
  if ( data && data.section ) {
    if ( data.section.takeInput ) {
      return <Feedback onFeedbackChange={onFeedbackChange} feedbackValue={feedbackValue} index={index} />
    }
    if (!data.section.usingDescription && !data.section.usingQuiz) {
      if ( data.section.description ) {
        return (
          <Description data={data.section.description} />
        );
      }
      return <Quiz data={data.section.quiz} courseId={courseId} historyId={data.historyId} user={user} contextId={data.contextId} />;
    }
    if ( data.section.usingDescription ) {
      return (
        <Description data={data.section.description} />
      );
    }
    return <Quiz data={data.section.quiz} courseId={courseId} historyId={data.historyId} user={user} contextId={data.contextId} />;
  }
}

const renderTyping = (typing, data) => {
  if ( data.answer ) {
    return <div className={`${data.section ? 'mb-4' : ''}`}>
      <Typing style={{ color: "black", fontSize: '1.3rem' }} text={data.answer} />
      {/* {typing ? (
        <Typing style={{ color: "black", fontSize: '1.3rem' }} text={data.answer} />
      ) : (
        <span style={{ color: "black", fontSize: '1.3rem' }}>{data.answer}</span>
      )} */}
    </div>
  }
}

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      hasTyped: false
    }

    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    const height = document.getElementById('most-new').clientHeight;
    this.setState({ height });
  }

  renderContent() {
    const {
      last,
      type,
      data,
      courseId,
      user,
      onFeedbackChange,
      feedbackValue,
      index
    } = this.props;
    const { hasTyped } = this.state;

    if (type === "bot") {
      return (
        <div className={`message bot-message`} id={last ? "most-new" : ''}>
          <div 
            style={{
              display: "table",
              borderRadius: 10,
              //marginTop: this.state.height,
              maxWidth: "90%",
              width: "90%",
              marginLeft: 0,
              fontSize: '1.3rem',
              //marginBottom: typing ? this.state.height : 0
            }}
          >
            {renderTyping(last && !hasTyped, data)}
            {renderContent(data, courseId, user, onFeedbackChange, feedbackValue, index)}
          </div>
        </div>
      )
    }
    return (
      <div className={`message user-message`} id={last ? "most-new" : ''}>
        <div style={{
          display: "table",
          borderRadius: 10,
          maxWidth: "90%",
          width: "90%",
          fontSize: '1.3rem',
          //marginBottom: typing ? this.state.height : 0
        }} className="message">
          <Button
            size="sm"
            outline
            style={{ fontSize: '1.3rem' }}
            disabled
          >{data}</Button>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
    
}

export default Message;