import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.renderChoices = this.renderChoices.bind(this);
  }

  renderChoices() {
    const { choices, onClick, historyId, contextId } = this.props;
    return choices.map((choice, index) => (
      <Button
        key={choice}
        onClick={() => onClick(choice, historyId, contextId)}
        size="sm"
        className={`${index === choices.length - 1 ? '' : 'mr-3'} quiz-button`}
      >
        {choice}
      </Button>
    ))
  }

  render() {
    return (
      <div>
        {this.renderChoices()}
      </div>
    );
  }
}

export default ButtonGroup;