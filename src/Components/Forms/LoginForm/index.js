import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../../Redux/Actions/Users';

class UserCreationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      trySubmitted: false
    }

    this.submitHandler = this.submitHandler.bind(this);

    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);

    this.getEmailStyle = this.getEmailStyle.bind(this);
    this.getPasswordStyle = this.getPasswordStyle.bind(this);

    this.renderStatus = this.renderStatus.bind(this);

    this.renderSpinner = this.renderSpinner.bind(this);
  }

  submitHandler(e) {
    const { login } = this.props;
    e.preventDefault();
    this.setState({
      trySubmitted: true
    });
    const { email, password } = this.state;
    login(email, password);
  }

  emailChangeHandler(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  passwordChangeHandler(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  renderStatus() {
    const { trySubmitted } = this.state;
    const { loginError, loginSuccess } = this.props;
    if ( trySubmitted ) {
      const bars = []
      if ( loginError ) {
        bars.push(<Alert key={1} color="danger">{loginError.message}</Alert>);
      } else if (loginSuccess) {
        bars.push(<Alert key={1} color="success">{loginSuccess}</Alert>);
      }
      return bars.map(bar => bar);
    }
  }

  getEmailStyle() {
    const { trySubmitted } = this.state;
    const { creatingUserError } = this.props;
    if ( trySubmitted ) {
      if ( creatingUserError && creatingUserError.type === "email" ) {
        return {
          border: '1px solid red'
        }
      }
    }
  }

  getPasswordStyle() {
    const { trySubmitted } = this.state;
    const { creatingUserError } = this.props;
    if ( trySubmitted ) {
      if (creatingUserError && creatingUserError.type === "password" ) {
        return {
          border: '1px solid red'
        }
      } 
    }
  }

  renderSpinner() {
    const { loggingin } = this.props;
    if ( loggingin ) {
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
  loggingin: state.users.loggingin,
  loginError: state.users.loginError,
  loginSuccess: state.users.loginSuccess
});

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserCreationForm);