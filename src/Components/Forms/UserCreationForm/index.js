import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser } from '../../../Redux/Actions/Users';

class UserCreationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password2: '',
      trySubmitted: false
    }

    this.submitHandler = this.submitHandler.bind(this);

    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.password2ChangeHandler = this.password2ChangeHandler.bind(this);

    this.getEmailStyle = this.getEmailStyle.bind(this);
    this.getPasswordStyle = this.getPasswordStyle.bind(this);
    this.getPassword2Style = this.getPassword2Style.bind(this);

    this.acceptEmail = this.acceptEmail.bind(this);
    this.acceptPassword = this.acceptPassword.bind(this);
    this.acceptPassword2 = this.acceptPassword2.bind(this);

    this.renderStatus = this.renderStatus.bind(this);

    this.renderSpinner = this.renderSpinner.bind(this);
  }

  submitHandler(e) {
    const { createUser } = this.props;
    e.preventDefault();
    this.setState({
      trySubmitted: true
    });
    if ( this.acceptEmail() && this.acceptPassword() && this.acceptPassword2() ) {
      const { email, password } = this.state;
      createUser(email, password);
    }
  }

  emailChangeHandler(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  passwordChangeHandler(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  password2ChangeHandler(e) {
    const password2 = e.target.value;
    this.setState({ password2 });
  }

  getEmailStyle() {
    const { trySubmitted } = this.state;
    if ( trySubmitted ) {
      if (this.acceptEmail()) {
        return {
          border: '1px solid green'
        }
      } else {
        return {
          border: '1px solid red'
        }
      }
    }
  }

  getPasswordStyle() {
    const { trySubmitted } = this.state;
    if ( trySubmitted ) {
      if (this.acceptPassword()) {
        return {
          border: '1px solid green'
        }
      } else {
        return {
          border: '1px solid red'
        }
      }
    }
  }

  getPassword2Style() {
    const { trySubmitted } = this.state; 
    if ( trySubmitted ) {
      if (this.acceptPassword2()) {
        return {
          border: '1px solid green'
        }
      } else {
        return {
          border: '1px solid red'
        }
      }
    }
  }

  acceptEmail() {
    const { email } = this.state;
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    return regex.test(email);
  }

  acceptPassword() {
    const { password } = this.state;
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+!@#\$%\^&\*])(?=.{8,})/);
    return regex.test(password);
  }

  acceptPassword2() {
    const { password, password2 } = this.state;
    return this.acceptPassword(password) && password === password2;
  }

  renderStatus() {
    const { trySubmitted } = this.state;
    const { creatingUserError, creatingUserSucces } = this.props;
    if ( trySubmitted ) {
      const bars = []
      if ( creatingUserError ) {
        bars.push(<Alert key={1} color="danger">{creatingUserError}</Alert>);
      } else if (creatingUserSucces) {
        bars.push(<Alert key={1} color="success">{creatingUserSucces}</Alert>);
      } else {
        if ( !this.acceptEmail() ) {
          bars.push(<Alert key={1} color="danger">Email is not correct.</Alert>);
        }
        if ( !this.acceptPassword() ) {
          bars.push(<Alert key={2} color="danger">Password is not correct. It must be at least 8 characters long and contain at least one of the following: 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, 1 special character</Alert>);
        }
        if ( !this.acceptPassword2() ) {
          bars.push(<Alert key={3} color="danger">Passwords don't match</Alert>);
        }
      }
      if ( bars.length === 0 ) {
        bars.push(<Alert key={3} color="success">All looks good</Alert>);
      }
      return bars.map(bar => bar);
    }
  }

  renderSpinner() {
    const { creatingUser } = this.props;
    if ( creatingUser ) {
      return <Spinner color="primary" className="ml-2" />
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.submitHandler}>
          <FormGroup >
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              onChange={this.emailChangeHandler}
              style={this.getEmailStyle()}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Passowrd"
              onChange={this.passwordChangeHandler}
              style={this.getPasswordStyle()}
            />
        </FormGroup>
        <FormGroup>
          <Label for="password2">Repeat Password</Label>
          <Input
            type="password"
            name="password2"
            id="password2"
            placeholder="Repeat password" 
            onChange={this.password2ChangeHandler}
            style={this.getPassword2Style()} 
          />
        </FormGroup>
        <div>
          <Button>Submit</Button>
          {this.renderSpinner()}
        </div>
        </Form>
        <div className="mt-4">
          {this.renderStatus()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  creatingUser: state.users.creatingUser,
  creatingUserError: state.users.creatingUserError,
  creatingUserSucces: state.users.creatingUserSucces
});

const mapDispatchToProps = dispatch => bindActionCreators({ createUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserCreationForm);