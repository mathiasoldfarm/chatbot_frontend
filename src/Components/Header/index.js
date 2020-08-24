import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = (props) => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Nav>
          {props.routes.map(route => (
            <NavItem key={route.url}>
              <NavLink href={route.url}>{route.name}</NavLink>
            </NavItem>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;