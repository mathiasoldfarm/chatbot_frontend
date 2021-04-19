import React from 'react';
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
        <Typing style={{ color: "black", fontSize: '1rem' }} text={data.answer} />
      ) : (
        <span style={{ color: "black", fontSize: '1rem' }}>{data.answer}</span>
      )}
    </div>
  }
}

const Message = (props) => {
  const {
    typing,
    type,
    data,
    courseId,
    user
  } = props;

  if (type === "bot") {
    return (
      <div style={{
        display: "table",
        borderRadius: 10,
        marginBottom: 10,
        padding: "5px 10px",
        backgroundColor: "whitesmoke",
        maxWidth: "90%",
        marginLeft: 0,
        fontSize: 18
      }} className="message">
        {renderTyping(typing, data)}
        {renderContent(data, courseId, user)}
      </div>
    )
  }
  return (
    <div style={{
      backgroundColor: 'rgb(47 50 53)',
      display: "table",
      padding: "5px 10px",
      borderRadius: 10,
      marginBottom: 25,
      maxWidth: "90%",
      marginTop: 25,
      marginLeft: "auto",
      fontSize: 18
    }} className="message">
       <span style={{ color: "white", marginBottom: 0, fontSize: 18 }}>{data}</span>
    </div>
  );
}

export default Message;