import React, { Component } from 'react';
import PagesContainer from '../PagesContainer';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Menu from '../../Elements/Menu';

class Account extends Component {
  render() {
    return (
      <div style={{ maxWidth: 1200 }} className="mx-auto">
        <Row>
          <Col xs={4}>
            <div style={{ borderRight: '1px solid rgb(227,227,227)', height: '94vh' }} className="pt-4">
              <div className="mb-5">
                <h3>Kurser</h3>
                <Menu title="Igangværende kurser" url="/account/courses" />
              </div>
              <div>
                <h3>Bruger</h3>
                <Menu title="Rediger brugeroplysninger" url="/account/edit/user" />
              </div>
            </div>
          </Col>
          <Col>
          <PagesContainer>
              {this.props.children}
            </PagesContainer>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.pages.data
});
export default connect(mapStateToProps)(Account);