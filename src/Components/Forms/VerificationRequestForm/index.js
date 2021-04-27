import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestVerification } from '../../../Redux/Actions/Users';

class VerificationRequestForm extends Component {
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
    const { requestVerification } = this.props;
    e.preventDefault();
    this.setState({
      trySubmitted: true
    });
    const { email } = this.state;
    requestVerification( email );
  }

  emailChangeHandler(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  renderStatus() {
    const { trySubmitted } = this.state;
    const { requestingVerificationError, requestingVerificationSuccess } = this.props;
    if ( trySubmitted ) {
      if ( requestingVerificationError ) {
        return <Alert key={1} color="danger">{requestingVerificationError}</Alert>;
      } else if (requestingVerificationSuccess) {
        return <Alert key={1} color="success">{requestingVerificationSuccess}</Alert>;
      }
    }
  }

  getEmailStyle() {
    const { trySubmitted } = this.state;
    const { requestingVerificationError } = this.props;
    if ( trySubmitted ) {
      if ( requestingVerificationError ) {
        return {
          border: '1px solid red'
        }
      }
    }
  }

  renderSpinner() {
    const { requestingVerification } = this.props;
    if ( requestingVerification ) {
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
  requestingVerification: state.users.requestingVerification,
  requestingVerificationError: state.users.requestingVerificationError,
  requestingVerificationSuccess: state.users.requestingVerificationSuccess
});

const mapDispatchToProps = dispatch => bindActionCreators({ requestVerification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VerificationRequestForm);