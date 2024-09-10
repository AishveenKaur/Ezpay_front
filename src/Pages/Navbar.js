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
              className={({ isActive }) =>
                isActive ? "nav-link text-warning" : "nav-link text-light"
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/payment"
              className={({ isActive }) =>
                isActive ? "nav-link text-warning" : "nav-link text-light"
              }
            >
              Payment
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/payment-history"
              className={({ isActive }) =>
                isActive ? "nav-link text-warning" : "nav-link text-light"
              }
            >
              Payment History
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/check-balance"
              className={({ isActive }) =>
                isActive ? "nav-link text-warning" : "nav-link text-light"
              }
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
