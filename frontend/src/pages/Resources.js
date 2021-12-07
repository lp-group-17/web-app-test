//import React from 'react';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Map, Marker, GoogleApiWrapper, LoadScript, GoogleMap } from 'google-maps-react';
import MapWindow from './MapWindow';

const Resources = () => {

  var crd = null;

  const mapStyles = {
    height: '500px',
    width: '500px'
  };

  var options = {
    maximumAge: 0
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  function success(pos) {
    crd = pos.coords;
  }

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
        
      
        <div class="right-align-box gray-background">
        <MapWindow></MapWindow>
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