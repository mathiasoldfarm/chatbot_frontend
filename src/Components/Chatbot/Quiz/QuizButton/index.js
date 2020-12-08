import React from 'react';
import { Button } from 'reactstrap';

const QuizButton = (props) => {
  const { answer, onClick, disabled } = props;
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      size="sm"
      color="primary"
      outline
      block
    >
      {answer}
    </Button>
  );
}

export default QuizButton;