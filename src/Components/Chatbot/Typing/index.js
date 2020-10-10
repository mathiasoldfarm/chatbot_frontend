import React from "react";
import Typed from 'typed.js';

class Typing extends React.Component {

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.typed.destroy();
    this.update();
  }

  update() {
    const options = {
      strings: [this.props.text],
      typeSpeed: 30,
      backSpeed: 50,
      loop: false,
      cursorChar: "|",
    };
    this.typed = new Typed(this.el, options);
  }

  componentDidUnmount() {
    this.typed.destroy();
  }
  
  render() {
    return (
      <span style={this.props.style} ref={(el) => {this.el = el;}} />
    );
  }
}
export default Typing;