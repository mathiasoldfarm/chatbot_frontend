import React, { Component } from 'react';
import UserCreationForm from '../../Forms/UserCreationForm';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <p>User creation</p>
        <div style={{ maxWidth: 500 }}>
          <UserCreationForm />
        </div>
      </div>
    );
  }
}

export default CreateUser;