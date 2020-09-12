import React from 'react';
import { Button } from 'reactstrap';

const DeleteButton = (props) => {
  const { onDelete, text } = props;
  return (
    <div className="ml-auto">
      <Button
        size="sm"
        color="danger"
        className="mr-2"
        onClick={onDelete}
      >
        {text || "Slet"}
      </Button>
    </div>
  );
}

export default DeleteButton;