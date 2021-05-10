import React, { Component } from 'react';
import { connect } from 'react-redux';
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