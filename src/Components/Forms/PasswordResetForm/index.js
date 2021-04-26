import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPassword } from '../../../Redux/Actions/Users';
import { withRouter } from "react-router";

class PasswordResetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      password2: '',
      trySubmitted: false
    }

    this.submitHandler = this.submitHandler.bind(this);

    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.password2ChangeHandler = this.password2ChangeHandler.bind(this);

    this.getPasswordStyle = this.getPasswordStyle.bind(this);
    this.getPassword2Style = this.getPassword2Style.bind(this);

    this.renderStatus = this.renderStatus.bind(this);

    this.renderSpinner = this.renderSpinner.bind(this);
  }

  submitHandler(e) {
    const { resetPassword, match } = this.props;
    const { userId, verificationCode } = match.params;
    e.preventDefault();
    this.setState({
      trySubmitted: true
    });
    const { password, password2 } = this.state;
    resetPassword( userId, password, password2, verificationCode );
  }

  passwordChangeHandler(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  password2ChangeHandler(e) {
    const password2 = e.target.value;
    this.setState({ password2 });
  }

  renderStatus() {
    const { trySubmitted } = this.state;
    const { resetPasswordError, resetPasswordSuccess } = this.props;
    if ( trySubmitted ) {
      if ( resetPasswordError ) {
        return <Alert key={1} color="danger">{resetPasswordError}</Alert>;
      } else if (resetPasswordSuccess) {
        return <Alert key={1} color="success">{resetPasswordSuccess}</Alert>;
      }
    }
  }

  getPasswordStyle() {
    const { trySubmitted } = this.state;
    const { resetPasswordError } = this.props;
    if ( trySubmitted ) {
      if (resetPasswordError && resetPasswordError.type === "password" ) {
        return {
          border: '1px solid red'
        }
      } 
    }
  }

  getPassword2Style() {
    const { trySubmitted } = this.state; 
    const { resetPasswordError } = this.props;
    if ( trySubmitted ) {
      if (resetPasswordError && resetPasswordError.type === "password2" ) {
        return {
          border: '1px solid red'
        }
      } 
    }
  }

  renderSpinner() {
    const { resettingPassword } = this.props;
    if ( resettingPassword ) {
      return <Spinner color="primary" className="ml-2" />
    }
  }

  render() {;
    return (
      <React.Fragment>
        <Form onSubmit={this.submitHandler}>
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
  resettingPassword: state.users.resetPassword,
  resetPasswordError: state.users.resetPasswordError,
  resetPasswordSuccess: state.users.resetPasswordSuccess
});

const mapDispatchToProps = dispatch => bindActionCreators({ resetPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordResetForm));