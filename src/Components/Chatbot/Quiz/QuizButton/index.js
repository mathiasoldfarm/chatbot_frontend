import React from 'react';
import { Button } from 'reactstrap';

const QuizButton = (props) => {
  const { answer, onClick, disabled, chosen, correct } = props;
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      size="sm"
      outline
      block
      className={chosen ? (correct ? "quiz-button-correct" : "quiz-button-wrong" ) : "quiz-button"}
      style={{ fontSize: '1.3rem' }}
    >
      {answer}
    </Button>
  );
}

export default QuizButton;