import React from 'react';
import Typing from '../Typing';
import Quiz from '../Quiz';
import Description from '../Description';

const renderContent = (displayData, courseId) => {
  if ( displayData ) {
    const keys = Object.keys(displayData);
    if ( keys.length !== 0 ) {
      if ( keys.includes("descriptionId") ) {
        return (
          <Description data={displayData} />
        );
      }
      return <Quiz data={displayData} courseId={courseId} />;
    }
  }
}

const Message = (props) => {
  const {
    text,
    courseId,
    displayData,
    typing,
    type
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
        {typing ? (
          <Typing style={{ color: "black", marginBottom: 0, fontSize: 20 }} text={text} />
        ) : (
          <span style={{ color: "black", marginBottom: 0, fontSize: 20 }}>{text}</span>
        )}
        {renderContent(displayData, courseId)}
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
       <span style={{ color: "white", marginBottom: 0, fontSize: 15 }}>{text}</span>
    </div>
  );
}

export default Message;