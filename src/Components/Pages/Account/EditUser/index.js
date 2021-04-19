import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner, Alert, Row, Col } from 'reactstrap';
import EditInput from './EditInput';
import Account from '../';

class AccountFrontpage extends Component {
  constructor(props) {
    super(props);

    this.renderStatus = this.renderStatus.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  renderStatus() {
    const { updatingError, updatingSuccess } = this.props;
    if ( updatingError ) {
      return <Alert color="danger">{updatingError}</Alert>
    }
    if ( updatingSuccess ) {
      return <Alert color="success">Alt din data er gemt.</Alert>
    }
  }

  renderSpinner() {
    const { updating } = this.props;
    if ( updating) {
      return <Spinner color="primary" />
    }
  }

  render() {
    return (
      <Account>
        <Row style={{ minHeight: 66 }}>
          <Col xs={3}>
            {this.renderSpinner()}
          </Col>
          <Col>
            {this.renderStatus()}
          </Col>
        </Row>
        <h3>Se dine brugeroplysninger nedenfor og rediger dem</h3>
        <EditInput type="text" name="firstname" id="firstname" placeholder="Fornavn" />
        <EditInput type="text" name="lastname" id="lastname" placeholder="Efternavn"/>
      </Account>
    )
  }
}

const mapStateToProps = state => ({
  updating: state.pages.updating,
  updatingError: state.pages.updatingError,
  updatingSuccess: state.pages.updatingSuccess
});
export default connect(mapStateToProps)(AccountFrontpage);