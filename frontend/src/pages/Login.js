import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import rashaad from './suzuranisourlight.jpg';
import mobileOne from './mobile1 (1).png';
import mobileTwo from './mobile2 (1).png';
import mobileThree from './mobile3 (1).png';

const Login = () => {
  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})
  const [ message, setMessage ] = useState('');

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })

    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const {username, password} = form
    const newErrors = {}

    if ( !username || username === "" ) newErrors.username = 'cannot be blank'

    if ( !password || password === "" ) newErrors.password = 'cannot be blank'

    return newErrors
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } else {
      var obj = {username:form.username.value, password:form.password.value};
      var js = JSON.stringify(obj);
      try
      {
        const response = await fetch('http://137.184.153.148/', {method:'POST', body:js, header:{'Content-Type':'application/json'}});
        var res = JSON.parse(await response.text());

        if (res.id <= 0)
        {
          setMessage('User/Password combination incorrect');
        }
        else
        {
          var user = {firstName:res.username, lastName:res.lastName, id:res.id}
          localStorage.setItem('user_data', JSON.stringify(user));
          setMessage('');
          window.location.href('/portal');
        }
      }
      catch(e)
      {
        alert(e.toString());
        return;
      }
    }

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
    <div class="center spacer-small">
      <img src={logo} width="256"/>
    </div>
    <div class="center">
      <h2 class="gradient">
        MOOD TRACKER
      </h2>
    </div>
    <div class="even-bigger-center gray-background">
    <div class="bigger-center">
    <Carousel fade variant="dark">
      <Carousel.Item>
        <img
          className="h-auto w-auto"
          src={mobileOne}
          alt="First slide"
        />
        <Carousel.Caption>
          <h2>Mood Tracker companion app</h2>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="h-auto w-auto"
          src={mobileTwo}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Scheduling support</h3>
          <p>Quickly plan counseling and support meetings</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="h-auto w-auto"
          src={mobileThree}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Record mood data</h3>
          <p>Easily list and track mood statistics</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    </div>
    <div class="spacer-small"></div>
    <div class="center small-spacer">
      <h3 class="gradient">
        ABOUT US
      </h3>
    </div>
    <div class="center spacer-small"></div>
    <div class="center wide-box">
      <h3 class="vertical-gradient-boxed rounded change-font">
        We are the members of COP4331C Group 17 and this is our React project, our own Mood Tracker application.
        This web application serves as a portal to introduce the members of our group while additionally
        containing resources for those in need of immediate mental help.
      </h3>
    </div>
    <div class="center spacer-small"></div>
    <div class="fat-center">
    <Card border="secondary" style={{ width: '18rem' }}>
      <Card.Img cariant="top" src={rashaad} />
      <Card.Body>
        <Card.Title>Rashaad Pedron</Card.Title>
        <Card.Text>
          Project Manager and Database
        </Card.Text>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '18rem' }}>
      <Card.Img cariant="top" src={rashaad} />
      <Card.Body>
        <Card.Title>Rashaad Pedron</Card.Title>
        <Card.Text>
          Project Manager and Database
        </Card.Text>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '18rem' }}>
      <Card.Img cariant="top" src={rashaad} />
      <Card.Body>
        <Card.Title>Rashaad Pedron</Card.Title>
        <Card.Text>
          Project Manager and Database
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div class="center spacer-large"></div>
    <div class="spacer-small"></div>
    <div class="fat-center">
    <Card border="secondary" style={{ width: '18rem' }}>
      <Card.Img cariant="top" src={rashaad} />
      <Card.Body>
        <Card.Title>Rashaad Pedron</Card.Title>
        <Card.Text>
          Project Manager and Database
        </Card.Text>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '18rem' }}>
      <Card.Img cariant="top" src={rashaad} />
      <Card.Body>
        <Card.Title>Rashaad Pedron</Card.Title>
        <Card.Text>
          Project Manager and Database
        </Card.Text>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '18rem' }}>
      <Card.Img cariant="top" src={rashaad} />
      <Card.Body>
        <Card.Title>Rashaad Pedron</Card.Title>
        <Card.Text>
          Project Manager and Database
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div class="spacer-large"></div>

























  </div>
  );
}

export default Login;
