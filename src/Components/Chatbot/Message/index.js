import React from 'react';
import Typing from '../Typing';

const Message = (props) => {
  if (props.type === "bot") {
    return (
      <div style={{
        display: "table",
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 0
      }} className="message">
        {props.typing ? (
          <Typing style={{ color: "black", marginBottom: 0, fontSize: 20 }} text={props.text} />
        ) : (
          <span style={{ color: "black", marginBottom: 0, fontSize: 20 }}>{props.text}</span>
        )}
      </div>
    )
  }
  return (
    <div style={{
      backgroundColor: '#007bff',
      display: "table",
      padding: "5px 10px",
      borderRadius: 10,
      marginBottom: 10,
      marginTop: 25,
      marginLeft: "auto"
    }} className="message">
       <span style={{ color: "white", marginBottom: 0, fontSize: 15 }}>{props.text}</span>
    </div>
  );
}

export default Message;