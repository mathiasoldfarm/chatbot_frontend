import React from 'react';
import { Button } from 'reactstrap';

const QuizButton = (props) => {
  const { answer, onClick } = props;
  return (
    <Button
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