import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import LoginForm from '../Forms/LoginForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout, checkIfLoggedIn } from '../../Redux/Actions/Users';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const { checkIfLoggedIn } = this.props;
    checkIfLoggedIn();
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  renderModal() {
    const { loggedIn } = this.props; 
    const { modal } = this.state;

    if ( !loggedIn ) {
      return (
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      );
    }
  }

  renderUserButton() {
    const { loggedIn, logout } = this.props; 

    if ( loggedIn ) {
      return (
        <NavItem key={"#"} className="ml-auto" onClick={() => {
          this.toggle();
          logout();
        }}>
          <NavLink href={"#"}>Logout</NavLink>
        </NavItem>
      );
    }
    return (
      <NavItem key={"#"} className="ml-auto" onClick={this.toggle}>
        <NavLink href={"#"}>Login</NavLink>
      </NavItem>
    );
  }

  render () {
    const { routes } = this.props;
    
    return (
      <React.Fragment>
        <div>
          <Navbar color="light" light expand="md">
            <Nav className="w-100">
              {routes.map(route => (
                <NavItem key={route.url}>
                  <NavLink href={route.url}>{route.name}</NavLink>
                </NavItem>
              ))}
              {this.renderUserButton()}
            </Nav>
          </Navbar>
        </div>
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn
})

const mapDispatchToProps = dispatch => bindActionCreators({ logout, checkIfLoggedIn }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);