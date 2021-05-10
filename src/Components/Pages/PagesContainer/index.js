import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPageData } from '../../../Redux/Actions/Pages';
import { Spinner, Alert } from 'reactstrap';
import { Component } from 'react';


class PagesContainer extends Component {
  componentDidMount() {
    this.props.fetchPageData(this.props.dependingData);
  }

  render() {
    const { fetching, fetchingError, children, fullWidth, noTop } = this.props;
    if ( fetching ) {
      return <Spinner />
    }
    if ( fetchingError ) {
      return <Alert color="danger">{fetchingError}</Alert>
    }
    return <div style={{ maxWidth: fullWidth ? '100%' : 1200, marginLeft: "auto", marginRight: "auto", textAlign: "left", paddingTop: noTop ? 0 : 50 }}>
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