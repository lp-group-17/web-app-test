//import React from 'react';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Map, Marker, GoogleApiWrapper, LoadScript, GoogleMap } from 'google-maps-react';

const Resources = () => {

  const mapStyles = {
    height: '500px',
    width: '500px'
  };

  return (  
  <div class="wrapper">
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
          <Navbar.Brand className='w-10'>Mood Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
              <Nav.Link href="/">About Us</Nav.Link>
              <Nav.Link href="/resources">Resources</Nav.Link>
          </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    <div class="center spacer-large">
      <img src={logo} width="256"/>
    </div>
    <div class="center">
      <h1 class="gradient">
        MOOD TRACKER
      </h1>
    </div>

    <div class="spacer-large"></div>


    <div class="wrapper">
      <div class="white-background spacer-bottom">
        <div class="center small-space">
          <h3 class="spacer-large">
            FIND HELP NEARBY
          </h3>
        </div>
        
      
        <div class="paragraph">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.9116429705464!2d-81.20224858420012!3d28.602427382429585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e7685d6a0a495f%3A0x5fd59b92b3c79bab!2sUniversity%20of%20Central%20Florida!5e0!3m2!1sen!2sus!4v1638649456538!5m2!1sen!2sus"
            width="100%" height="400" style={{border:0}} allowfullscreen="" loading="lazy">
          </iframe>
        </div>  
      </div>
    </div>

    <div class="spacer-xl"></div>

      <div class="wrapper">
        <div class="white-background">
        <div class="center small-space">
          <h3 class="spacer-large">
            FIND HELP NEARBY
          </h3>
        </div>
        <div class="center paragraph spacer-bottom">
          <ul>
            <li> item 1 </li>
            <li> item 2 </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="spacer-xl"></div>
</div>
  );
}

export default Resources;

//<Map google={this.props.google} /> AIzaSyAnTjBi3Hn-3OgW13zCOe5gRzT9etArFG0