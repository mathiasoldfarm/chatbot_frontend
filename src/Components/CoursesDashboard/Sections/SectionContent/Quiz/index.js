import React from 'react';
import QuizLevels from './QuizLevels';

const Quiz = (props) => {
  const { id } = props;
  return (
    <div>
      <p>Type: Quiz</p>
      <QuizLevels quizId={id} />
    </div>
  );
}

export default Quiz;