import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.renderChoises = this.renderChoises.bind(this);
  }

  renderChoises() {
    const { choises } = this.props;
    return choises.map(choise => (
      <Button size="sm" color="primary">{choise}</Button>
    ))
  }

  render() {
    return (
      <div className="mt-4">
        {this.renderChoises()}
      </div>
    );
  }
}

export default ButtonGroup;