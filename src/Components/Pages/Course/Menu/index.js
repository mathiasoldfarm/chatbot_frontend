import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    }

    this.open = this.open.bind(this);
  }

  open() {
    if ( this.props.children.length ) {
      this.setState({
        opened: !this.state.opened
      });
    }
  }

  render() {
    const { title, depth, children } = this.props;
    const { opened } = this.state;

    return (
      <React.Fragment>
        <div
          style={{ borderTop: '1px solid rgb(227,227,227)' }}
          className={`py-3 d-flex ${children.length ? 'pointer-on-hover': ''} ${children.length ? 'red-on-hover': ''} ${opened ? 'red-text' : ''}`}
          onClick={this.open}
        >
          <p
            className={`mb-0`}
            style={{ paddingLeft: depth*20}}
          >
            {title}
          </p>
          {children.length ? <FontAwesomeIcon className="ml-auto" icon={opened ? faAngleDown : faAngleRight} /> : null}
        </div>
        {opened ? children : null}
      </React.Fragment>
    )
  }
} 

export default Menu;