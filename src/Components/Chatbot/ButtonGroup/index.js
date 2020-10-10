import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.renderChoices = this.renderChoices.bind(this);
  }

  renderChoices() {
    const { choices, onClick } = this.props;
    return choices.map(choice => (
      <Button onClick={() => onClick(choice)} size="sm" className="mr-3" color="primary">{choice}</Button>
    ))
  }

  render() {
    return (
      <div className="mt-4">
        {this.renderChoices()}
      </div>
    );
  }
}

export default ButtonGroup;