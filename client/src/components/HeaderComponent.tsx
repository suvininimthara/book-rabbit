import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import './header.css';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  return (
    <header>
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand-custom">
            <img
              src="logo 3.png"
              alt="Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            BookRabbit
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link href="/products" className="nav-link-custom">Books</Nav.Link>
              <Nav.Link href="/mega-menu" className="nav-link-custom">About</Nav.Link>
              <Nav.Link href="/contact" className="nav-link-custom">Contact</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-teal">
                <FaSearch />
              </Button>
            </Form>
            <Nav>
              {isLoggedIn ? (
                <FaUserCircle className="profile-icon" />
              ) : (
                <>
                <p> </p>
                <Nav.Link href="/" className="nav-link-custom"><Button variant="light" className="ms-2">Login</Button>
                </Nav.Link> <Nav.Link href="/" className="nav-link-custom"><Button variant="outline-light" className="ms-2">Sign Up</Button>
                </Nav.Link></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
