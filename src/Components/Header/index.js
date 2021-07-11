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
import { toggleLogInModal } from '../../Redux/Actions/Pages';


class Header extends Component {
  componentDidMount() {
    const { checkIfLoggedIn } = this.props;
    checkIfLoggedIn();
  }

  renderModal() {
    const { loggedIn, modal, toggleLogInModal } = this.props; 

    if ( !loggedIn ) {
      return (
        <Modal isOpen={modal} toggle={toggleLogInModal}>
          <ModalHeader toggle={toggleLogInModal}>Log in</ModalHeader>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      );
    }
  }

  renderUserButton() {
    const { loggedIn, logout, toggleLogInModal } = this.props; 

    if ( loggedIn ) {
      return (
        <div className="ml-auto d-flex">
          <NavItem >
            <NavLink href={"/account/courses"}>Account</NavLink>
          </NavItem>
          <NavItem key={"#"} onClick={() => {
            toggleLogInModal();
            logout();
          }}>
            <NavLink href={"#"}>Logout</NavLink>
          </NavItem>
        </div>
      );
    }
    return (
     <React.Fragment>
        <NavItem key={"create-user"} className="ml-auto">
          <NavLink href={"/create-user"}>Create user</NavLink>
        </NavItem>
        <NavItem key={"#"} onClick={toggleLogInModal}>
          <NavLink href={"#"}>Log in</NavLink>
        </NavItem>
     </React.Fragment>
    );
  }

  render () {
    const { routes } = this.props;
    
    return (
      <React.Fragment>
        <div style={{ height: 56 }}>
          <Navbar color="light" light expand="md">
            <a
              href="/"
            >
              <img
                alt="logo"
                src={require('../../LOGO.png')}
                style={{ maxHeight: 30 }}
                className="mr-5"
              />
            </a>
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
  loggedIn: state.users.loggedIn,
  modal: state.pages.showLogInModal
})

const mapDispatchToProps = dispatch => bindActionCreators({ logout, checkIfLoggedIn, toggleLogInModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);