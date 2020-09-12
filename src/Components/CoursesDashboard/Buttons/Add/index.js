import React from 'react';
import { Button } from 'reactstrap';

const AddButton = (props) => {
  const { onAdd, className, text, color } = props;
  return (
    <Button
      size="sm"
      color={color || "success"}
      className={`mr-2 ${className}`}
      onClick={onAdd}
    >
      {text || "Tilføj"}
    </Button>
  );
}

export default AddButton;