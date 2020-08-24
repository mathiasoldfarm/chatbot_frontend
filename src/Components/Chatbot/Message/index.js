import React from 'react';

const Message = (props) => {
  return (
    <div style={{
      backgroundColor: props.color,
      display: "table",
      padding: "5px 10px",
      borderRadius: 10,
      marginBottom: 10,
      marginLeft: props.type == "bot" ? 0 : "auto"
    }} className="message">
      <p style={{ color: "white", marginBottom: 0 }} >{props.text}</p>
    </div>
  );
}

export default Message;