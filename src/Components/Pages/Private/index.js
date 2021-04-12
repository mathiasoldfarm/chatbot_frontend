import React, { Component } from 'react';
import PagesContainer from '../PagesContainer';
import { connect } from 'react-redux';

class Private extends Component {
  render() {
    return (
      <PagesContainer>
        <p>{this.props.message}</p>
      </PagesContainer>
    )
  }
}

const mapStateToProps = state => ({
  message: state.pages.data
});
export default connect(mapStateToProps)(Private);