import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPageData } from '../../../Redux/Actions/Pages';
import { Spinner, Alert } from 'reactstrap';
import { Component } from 'react';


class PagesContainer extends Component {
  constructor(props) {
    super(props);
    props.fetchPageData(props.dependingData);
  }

  render() {
    const { fetching, fetchingError, children } = this.props;
    if ( fetching ) {
      return <Spinner />
    }
    if ( fetchingError ) {
      return <Alert color="danger">{fetchingError}</Alert>
    }
    return <div>
      {children}
    </div>
  }
}

const mapStateToProps = state => ({
  fetching: state.pages.fetching,
  fetchingError: state.pages.fetchingError,
  data: state.pages.data
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PagesContainer);