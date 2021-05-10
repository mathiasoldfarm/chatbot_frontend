import React, { Component } from 'react';
import Typing from '../Typing';
import Quiz from '../Quiz';
import Description from '../Description';

const renderContent = (data, courseId, user) => {
  if ( data && data.section ) {
    if ( data.section.description ) {
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
      {typing ? (
        <Typing style={{ color: "black", fontSize: '1.3rem' }} text={data.answer} />
      ) : (
        <span style={{ color: "black", fontSize: '1.3rem' }}>{data.answer}</span>
      )}
    </div>
  }
}

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    }
  }

  componentDidMount() {
    const height = document.getElementById('most-new').clientHeight;
    this.setState({ height });
  }
  
  render() {
    const {
      typing,
      type,
      data,
      courseId,
      user
    } = this.props;
    if (type === "bot") {
      return (
        <div className={`message bot-message`} id={typing ? "most-new" : ''}>
          <div 
            style={{
              display: "table",
              borderRadius: 10,
              marginBottom: 10,
              //marginTop: this.state.height,
              padding: "10px 25px",
              backgroundColor: "whitesmoke",
              maxWidth: "90%",
              marginLeft: 0,
              fontSize: '1.3rem',
              //marginBottom: typing ? this.state.height : 0
            }}
          >
            {renderTyping(typing, data)}
            {renderContent(data, courseId, user)}
          </div>
        </div>
      )
    }
    return (
      <div className={`message user-message`} id={typing ? "most-new" : ''}>
        <div style={{
          backgroundColor: 'rgb(47 50 53)',
          display: "table",
          padding: "10px 25px",
          borderRadius: 10,
          marginBottom: 10,
          maxWidth: "90%",
          marginTop: 10,
          marginLeft: "auto",
          fontSize: '1.3rem',
          //marginBottom: typing ? this.state.height : 0
        }} className="message">
          <span style={{ color: "white", marginBottom: 0 }}>{data}</span>
        </div>
      </div>
    );
  }
}

export default Message;