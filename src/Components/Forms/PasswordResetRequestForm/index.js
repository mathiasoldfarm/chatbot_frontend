import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestNewPasswordLink } from '../../../Redux/Actions/Users';

class PasswordResetRequestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      trySubmitted: false
    }

    this.submitHandler = this.submitHandler.bind(this);

    this.emailChangeHandler = this.emailChangeHandler.bind(this);

    this.getEmailStyle = this.getEmailStyle.bind(this);

    this.renderStatus = this.renderStatus.bind(this);

    this.renderSpinner = this.renderSpinner.bind(this);
  }

  submitHandler(e) {
    const { requestNewPasswordLink } = this.props;
    e.preventDefault();
    this.setState({
      trySubmitted: true
    });
    const { email } = this.state;
    requestNewPasswordLink( email );
  }

  emailChangeHandler(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  renderStatus() {
    const { trySubmitted } = this.state;
    const { requestingNewPasswordError, requestingNewPasswordSuccess } = this.props;
    if ( trySubmitted ) {
      if ( requestingNewPasswordError ) {
        return <Alert key={1} color="danger">{requestingNewPasswordError}</Alert>;
      } else if (requestingNewPasswordSuccess) {
        return <Alert key={1} color="success">{requestingNewPasswordSuccess}</Alert>;
      }
    }
  }

  getEmailStyle() {
    const { trySubmitted } = this.state;
    const { requestingNewPasswordError } = this.props;
    if ( trySubmitted ) {
      if ( requestingNewPasswordError ) {
        return {
          border: '1px solid red'
        }
      }
    }
  }

  renderSpinner() {
    const { requestingNewPassword } = this.props;
    if ( requestingNewPassword ) {
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
  requestingNewPassword: state.users.requestingNewPassword,
  requestingNewPasswordError: state.users.requestingNewPasswordError,
  requestingNewPasswordSuccess: state.users.requestingNewPasswordSuccess
});

const mapDispatchToProps = dispatch => bindActionCreators({ requestNewPasswordLink }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetRequestForm);