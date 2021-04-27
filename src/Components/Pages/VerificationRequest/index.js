import React, { Component } from 'react';
import VerificationRequestForm from '../../Forms/VerificationRequestForm';

class VerificationRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <p>Verify your account</p>
        <p>Type in your e-mail and we'll send a mail with a link from where you verify your account</p>
        <div style={{ maxWidth: 500 }}>
          <VerificationRequestForm />
        </div>
      </div>
    );
  }
}

export default VerificationRequest;