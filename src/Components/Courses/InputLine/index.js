import React, { Component } from 'react';
import { InputGroup, Input, Label } from 'reactstrap';

class InputLine extends Component {
  render() {
    const { value, name, onChange } = this.props;
    
    return (
      <InputGroup>
        <Label className="mr-4">{name} </Label>
        <Input value={value} onChange={onChange} />
      </InputGroup>
    )
  }
}

export default InputLine;