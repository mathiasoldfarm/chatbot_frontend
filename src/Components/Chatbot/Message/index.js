import React from 'react';
import Typing from '../Typing';
import Quiz from '../Quiz';
import Description from '../Description';

const renderContent = (displayData, courseId, sessionGroup, user) => {
  if ( displayData ) {
    const keys = Object.keys(displayData);
    if ( keys.length !== 0 ) {
      if ( keys.includes("descriptionId") ) {
        return (
          <Description data={displayData} />
        );
      }
      return <Quiz data={displayData} courseId={courseId} sessionGroup={sessionGroup} user={user} />;
    }
  }
}

const renderTyping = (typing, text) => {
  if ( text ) {
    return <div className="mb-4">
      {typing ? (
        <Typing style={{ color: "black", fontSize: '1rem' }} text={text} />
      ) : (
        <span style={{ color: "black", fontSize: '1rem' }}>{text}</span>
      )}
    </div>
  }
}

const Message = (props) => {
  const {
    text,
    courseId,
    displayData,
    typing,
    type,
    user,
    sessionGroup
  } = props;

  if (type === "bot") {
    return (
      <div style={{
        display: "table",
        borderRadius: 10,
        marginBottom: 10,
        padding: "5px 10px",
        backgroundColor: "whitesmoke",
        maxWidth: "75%",
        marginLeft: 0
      }} className="message">
        {renderTyping(typing, text)}
        {renderContent(displayData, courseId, sessionGroup, user)}
      </div>
    )
  }
  return (
    <div style={{
      backgroundColor: 'rgb(47 50 53)',
      display: "table",
      padding: "5px 10px",
      borderRadius: 10,
      marginBottom: 10,
      maxWidth: "75%",
      marginTop: 25,
      marginLeft: "auto"
    }} className="message">
       <span style={{ color: "white", marginBottom: 0, fontSize: '1rem' }}>{text}</span>
    </div>
  );
}

export default Message;