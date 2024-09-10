import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="text-warning">
          EZPay
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className="nav-link text-light"
              activeClassName="text-warning"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/payment"
              className="nav-link text-light"
              activeClassName="text-warning"
            >
              Payment
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/payment-history"
              className="nav-link text-light"
              activeClassName="text-warning"
            >
              Payment History
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/check-balance"
              className="nav-link text-light"
              activeClassName="text-warning"
            >
              Check Balance
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
