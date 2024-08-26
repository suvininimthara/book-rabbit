import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch} from 'react-icons/fa';
import './header.css';
import { User } from '../../models/userModel';
import HeaderLoggedInView from './HeaderLoggedInView';
import HeaderLoggedOutView from './HeaderLoggedOutView';
import logo from './logo 3.png';

interface HeaderProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const Header= ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: HeaderProps) => {
 
  return (
    <header>
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand-custom">
            <img
              src={logo}
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
            <Nav className="ms-auto">
                        {loggedInUser
                            ? <HeaderLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                            : <HeaderLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
