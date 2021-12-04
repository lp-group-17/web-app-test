import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar';
import logo from './logo.png';

const NavigationBar = () => {
  
  return (  
  <div class="wrapper">
      <Navbar bg="light" expand="lg" variant="dark">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/resources">Link</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  </div>
  );
}

export default NavigationBar;
