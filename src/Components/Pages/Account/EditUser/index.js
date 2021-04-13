import React, { Component } from 'react';
import PagesContainer from '../../PagesContainer';
import { connect } from 'react-redux';
import { Row, Col, Spinner, Alert } from 'reactstrap';
import EditInput from './EditInput';
import Account from '../';

class AccountFrontpage extends Component {
  constructor(props) {
    super(props);

    this.renderStatus = this.renderStatus.bind(this);
  }

  renderStatus() {
    const { updating, updatingError, updatingSuccess } = this.props;
    if ( updating) {
      return <Spinner color="primary" />
    }
    if ( updatingError ) {
      return <Alert color="danger">{updatingError}</Alert>
    }
    if ( updatingSuccess ) {
      return <Alert color="success">Alt din data er gemt.</Alert>
    }
  }
  render() {
    return (
      <Account>
        <h3>Se dine brugeroplysninger nedenfor og rediger dem</h3>
        {this.renderStatus()}
        <EditInput type="text" name="firstname" id="firstname" placeholder="Fornavn" />
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