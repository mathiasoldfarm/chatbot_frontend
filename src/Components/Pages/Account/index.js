import React, { Component } from 'react';
import PagesContainer from '../PagesContainer';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Menu from '../../Elements/Menu';

class Account extends Component {
  render() {
    return (
      <Row>
        <Col xs={3}>
          <div style={{ borderRight: '1px solid rgb(227,227,227)' }}>
            <div className="mb-5">
              <h3>Kurser</h3>
              <Menu title="Igangværende kurser" url="/account/courses" />
              <Menu title="Fremskridt" url="/account/progress" borderBottom />
            </div>
            <div>
              <h3>Bruger</h3>
              <Menu title="Rediger brugeroplysninger" url="/account/edit/user" />
              <Menu title="Rediger betalingsoplysninger" url="/account/edit/payment" borderBottom />
            </div>
          </div>
        </Col>
        <Col>
         <PagesContainer>
            {this.props.children}
          </PagesContainer>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  message: state.pages.data
});
export default connect(mapStateToProps)(Account);