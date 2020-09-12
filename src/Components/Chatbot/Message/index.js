import React from 'react';

const Message = (props) => {
  if (props.type === "bot") {
    return (
      <div style={{
        display: "table",
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 0
      }} className="message">
        <p style={{ color: "black", marginBottom: 0, fontSize: 20 }} >{props.text}</p>
      </div>
    )
  }
  return (
    <div style={{
      backgroundColor: props.color,
      display: "table",
      padding: "5px 10px",
      borderRadius: 10,
      marginBottom: 10,
      marginLeft: "auto"
    }} className="message">
      <p style={{ color: "white", marginBottom: 0 }} >{props.text}</p>
    </div>
  );
}

export default Message;