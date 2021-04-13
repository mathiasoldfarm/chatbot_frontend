import React, { Component } from 'react';
import PagesContainer from '../../PagesContainer';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Account from '../';

class AccountFrontpage extends Component {
  render() {
    return (
      <Account>
        <p>hello</p>
      </Account>
    )
  }
}

const mapStateToProps = state => ({
  message: state.pages.data
});
export default connect(mapStateToProps)(AccountFrontpage);