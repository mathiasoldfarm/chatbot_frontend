import React, { Component } from 'react';
import PagesContainer from '../PagesContainer';
import { Alert } from 'reactstrap';

class Verification extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <PagesContainer>
        <Alert color="success">Your account was succesfully verified</Alert>
      </PagesContainer>
    );
  }
}

export default Verification;