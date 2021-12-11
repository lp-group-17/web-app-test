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
      <img class="spacer-logo" src={logo} height="64" />
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
      <h1 class="text heading">
        RESOURCES
      </h1>
    </div>

    <div class="spacer-large"></div>


    <div class="wrapper">
      <div class="white-background spacer-bottom">
        <div class="center">
          <div class="spacer-large subheading">
            FIND HELP NEARBY
          </div>
        </div>
        
      
        <div class="center">
        <MapWindow></MapWindow>
        </div>  
      </div>
    </div>

    <div class="spacer-xl"></div>

      <div class="wrapper">
        <div class="white-background">
        <div class="center ">
          <div class="spacer-large subheading">
            CRISIS HOTLINES AND ONLINE RESOURCES
          </div>
        </div>
        <div class="center paragraph spacer-bottom">
        <table class="table p table-striped">
          <tr>
            <th>Website</th>
            <th>Phone Number</th>
          </tr>
          <tr>
            <td><a href="https://www.samhsa.gov/find-treatment" target="_blank">Substance Abuse and Mental Health Services</a></td>
            <td>1-800-662-HELP (4357)</td>
          </tr>
          <tr>
            <td><a href="https://suicidepreventionlifeline.org" target="_blank">Suicide Prevention Hotline</a></td>
            <td>1-800-273-8255</td>
          </tr>
          <tr>
            <td><a href="https://www.nami.org/help" target="_blank">National Alliance on Mental Health</a></td>
            <td>1-800-950-NAMI (6264)</td>
          </tr>
          <tr>
          <td><a href="https://www.apa.org/topics/crisis-hotlines" target="_blank">American Psychological Association</a></td>
            <td></td>
          </tr>
          <tr>
            <td><a href="https://www.crisistextline.org/" target="_blank">Crisis Text Line</a></td>
            <td>Text HOME to 741741</td>
          </tr>
        </table> 
        </div>
      </div>
    </div>
    <div class="spacer-xl"></div>
</div>
  );
}

export default Resources;

//<Map google={this.props.google} />