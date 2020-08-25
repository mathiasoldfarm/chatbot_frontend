import React, { Component } from 'react';
import { InputGroup, Input, Label } from 'reactstrap';

class InputLine extends Component {
  render() {
    const { value, name, onChange, textarea } = this.props;
    
    return (
      <div className="mb-3">
        <InputGroup>
          <Label className="mr-4">{name} </Label>
          <Input type={textarea ? "textarea" : "text"} value={value} onChange={onChange} />
        </InputGroup>
      </div>
    )
  }
}

export default InputLine;