import React, { Component } from 'react';

class Math extends Component {
  componentDidUpdate() {
    this.typeset();
  }

  componentDidMount() {
    this.typeset();
  }

  typeset = () => {
    const mathJax = window.MathJax;
    // If MathJax script hasn't been loaded yet, then do nothing.
    if (!mathJax) {
      return null;
    }
    console.log(mathJax);
    mathJax.startup.promise = mathJax.startup.promise
      .then(() => mathJax.typesetPromise())
      .catch((err) => console.error(`Typeset failed: ${err.message}`));
    return mathJax.startup.promise;
  };

  render() {
    return (
      <span>{this.props.rawLatex}</span>
    );
  }
}

export default Math;