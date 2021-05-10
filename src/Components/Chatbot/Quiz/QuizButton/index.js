import React from 'react';
import { Button } from 'reactstrap';

const QuizButton = (props) => {
  const { answer, onClick, disabled } = props;
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      size="sm"
      outline
      block
      className="quiz-button"
      style={{ fontSize: '1.3rem' }}
    >
      {answer}
    </Button>
  );
}

export default QuizButton;