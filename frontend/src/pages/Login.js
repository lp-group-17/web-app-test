import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import Rashaad from './suzuranisourlight.jpg';
import Che from './CartoonNetwork.jpg';
import Ryan from './MaceWindont.jpg';
import Jared from './DokutahOnZeroSanity.jpg';
import Nick from './nickdidntsendanimage.jpg';
import Kristin from './anotherdayintheoffice.jpg';
import phone from './phone.png';
import phone2 from './phone2.png';
import phone3 from './phone3.png';

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

    <div class="spacer-large"></div>

    <div class="center paragraph">
      <div class="paragraph heading spacer-large">
        <img src={phone} height="512px"/>
        <div class="text-right text">
          Try out our Mood Tracker 
          app today!
          <div class="text-right">
          <a href="https://github.com/lp-group-17/mobile-app/releases/download/beta/app-arm64-v8a-release.apk" class="btn btn-primary rounded-pill">DOWNLOAD APP</a>

      </div>
        </div>
    </div>
      <div class="spacer-large"></div>
    </div>

    <div class="center paragraph">
      <div class="paragraph heading spacer-large">
        <div class="text-left text">
          Easily list and track mood statistics
        </div>
        <img src={phone2} height="512px"/>
    </div>
      <div class="spacer-large"></div>
    </div>

    <div class="center paragraph">
      <div class="paragraph heading spacer-large">
        <img src={phone3} height="512px"/>
        <div class="text-right text">
          Quickly plan support and counseling sessions
        </div>
    </div>
      <div class="spacer-large"></div>
    </div>

    <div class="center spacer-xl"></div>

    <div class="wrapper">
      <div class="white-background spacer-bottom">
        <div class="center">
          <div class="spacer-large subheading">
            ABOUT US
          </div>
        </div>
        <div class="text-center p paragraph">
          We are the members of COP4331C Group 17 and this is our React project, our own Mood Tracker application.
          This web application serves as a portal to introduce the members of our group while additionally
          containing resources for those in need of immediate mental help.
        </div>
      </div>
    </div>
<div class="text text-center subheading center spacer-large">
      TEAM MEMBERS
    </div>
    <div class="fat-center spacer-small">
    <Card border="secondary" style={{ width: '15rem', height:"21rem" }}>
      <Card.Img cariant="top" src={Rashaad} />
      <Card.Body>
        <Card.Title class="center"><b>Rashaad Pedron</b></Card.Title>
        <Card.Text class="center text-center">
          Project Manager and Database
        </Card.Text>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '15rem', height:"21rem" }}>
      <Card.Img cariant="top" src={Kristin} />
      <Card.Body>
        <Card.Title class="center"><b>Kristin Crist</b></Card.Title>
        <Card.Text class="center text-center">
          API and Database
        </Card.Text>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '15rem', height:"21rem" }}>
      <Card.Img cariant="top" src={Jared} />
      <Card.Body>
        <Card.Title class="center"><b>Jared Miller</b></Card.Title>
        <Card.Text class="center text-center">
          Web Application
        </Card.Text>
      </Card.Body>
    </Card>
    
    </div>
    <div class="spacer-small"></div>
    <div class="fat-center">
    <Card border="secondary" style={{ width: '15rem', height:"21rem" }}>
      <Card.Img cariant="top" src={Che} />
      <Card.Body>
        <Card.Title class="center"><b>Che' Baptiste</b></Card.Title>
        <Card.Text class="center text-center">
        Mobile App and API
        </Card.Text>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '15rem', height:"21rem" }}>
      <Card.Img cariant="top" src={Ryan} />
      <Card.Body>
        <Card.Title class="center"><b>Ryan Bugge</b></Card.Title>
        <Card.Text class="center text-center">
          Mobile App, API, and Database
        </Card.Text>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '15rem', height:"21rem" }}>
      <Card.Img cariant="top" src={Nick} />
      <Card.Body>
        <Card.Title class="center"><b>Nick Zdravkovic</b></Card.Title>
        <Card.Text class="center text-center">
          Web Application
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div class="spacer-large"></div>

  </div>
  );
}

export default Login;
