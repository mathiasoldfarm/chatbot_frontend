import React from 'react';
import { Input } from 'reactstrap';

const Feedback = (props) => {
  const { feedbackValue, index, onFeedbackChange } = props;
  return (
    <div>
      <Input
        value={feedbackValue}
        onChange={(e) => onFeedbackChange(e, index)}
        type="textarea"
        className="p-4"
        placeholder="Prøv at beskriv hvad det er du ikke forstår"
        style={{
          background: "rgb(248, 249, 250)",
          height: 200,
          fontSize: "1.3rem"
        }}
      />
    </div>
  );
}

export default Feedback;