import React, { Component } from 'react';
import { Input } from 'reactstrap';
import Math from '../Chatbot/Math';

class LatexTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latex: ''
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      latex: e.target.value
    });
  }

  render() {
    const { latex } = this.state;
    return (
      <div>
        <Input type="textarea" value={latex} onChange={this.changeHandler} className="mb-3" />
        <Math tex={latex} />
      </div>
    );
  }
}

export default LatexTester;