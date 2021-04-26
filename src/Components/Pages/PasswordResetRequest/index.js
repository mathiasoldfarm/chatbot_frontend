import React, { Component } from 'react';
import PasswordResetRequestForm from '../../Forms/PasswordResetRequestForm';

class PasswordResetRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <p>Reset password</p>
        <p>Type in your e-mail and we'll send a mail with a link from where you can reset the password</p>
        <div style={{ maxWidth: 500 }}>
          <PasswordResetRequestForm />
        </div>
      </div>
    );
  }
}

export default PasswordResetRequest;