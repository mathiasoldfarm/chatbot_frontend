import React, { Component } from 'react';
import PasswordResetForm from '../../Forms/PasswordResetForm';
import PagesContainer from '../PagesContainer';

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <PagesContainer>
        <div>
          <p>Reset password</p>
          <p>Type in your new password twice</p>
          <div style={{ maxWidth: 500 }}>
            <PasswordResetForm />
          </div>
        </div>
      </PagesContainer>
    );
  }
}

export default PasswordReset;