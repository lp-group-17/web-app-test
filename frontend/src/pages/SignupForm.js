import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.png';

const SignupForm = () => {
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
    const {firstName, lastName, username, email, password, confirmPassword} = form
    const newErrors = {}

    if ( !firstName || firstName === "" ) newErrors.firstName = 'cannot be blank'

    if ( !lastName || lastName === "" ) newErrors.lastName = 'cannot be blank'

    if ( !username || username === "" ) newErrors.username = 'cannot be blank'

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ( !email || email === "" ) newErrors.email = 'cannot be blank'
    else if ( !emailRegex.test(String(email)) ) newErrors.email = 'must be a valid email'

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if ( !password || password === "" ) newErrors.password = 'please enter a password'
    else if ( password.length < 8) newErrors.password = 'password must be at least 8 characters long'
    else if ( !passwordRegex.test(String(password)) ) newErrors.password = ' password must contain at least 1 lowercase letter, capital letter, number and special character'

    if ( !password || password === "" ) newErrors.confirmPassword = 'please confirm your password'
    else if ( password !== confirmPassword ) newErrors.confirmPassword = 'passwords must match'

    return newErrors
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } else {
      var obj = {firstName:form.firstName.value, lastName:form.lastName.value, username:form.username.value, email:form.email.value, password:form.password.value};
      var js = JSON.stringify(obj);
      try
      {
        const response = await fetch('http://137.184.153.148/', {method:'POST', body:js, header:{'Content-Type':'application/json'}});
        var res = JSON.parse(await response.text());
        setMessage('');
        window.location.href('/login');
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
    <div class="center spacer-large">
      <img src={logo} width="256"/>
    </div>
    <div class="center">
      <h2 class="gradient">
        MOOD TRACKER
      </h2>
    </div>
    <Form noValidate onSubmit={handleSubmit}>
      <div class="wrapper center">
        <div class="text-name-first">
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label class="text">First Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter First Name" onChange={ e => setField('firstName', e.target.value) } isInvalid={ !!errors.firstName }/>
            {/* <FormControl.Feedback type="invalid">
              Please do not leave blank
            </FormControl.Feedback> */}
          </Form.Group>
        </div>

        <div class="text-name-last spacer-left">
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label class="text">Last Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter Last Name" onChange={ e => setField('lastName', e.target.value) } isInvalid={ !!errors.lastName }/>
            {/* <FormControl.Feedback type="invalid">
              Please do not leave blank
            </FormControl.Feedback> */}
          </Form.Group>
        </div>
      </div>
      
      <div class="textBox">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label class="text">Username</Form.Label>
          <Form.Control required type="text" placeholder="Enter Username" onChange={ e => setField('username', e.target.value) } isInvalid={ !!errors.username }/>
          {/* <FormControl.Feedback type="invalid">
            Please do not leave blank
          </FormControl.Feedback> */}
        </Form.Group>
      </div>

      <div class="textBox">
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label class="text">Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" onChange={ e => setField('email', e.target.value) } isInvalid={ !!errors.email }/>
          {/* <FormControl.Feedback type="invalid">
            Please provide a valid email
          </FormControl.Feedback> */}
        </Form.Group>
      </div>

      <div class="textBox">
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label class="text">Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" onChange={ e => setField('password', e.target.value) } isInvalid={ !!errors.password }/>
          {/* <FormControl.Feedback type="invalid">
            Password must be at least 8 characters and contain at least one lowercase, capital, number and symbol
          </FormControl.Feedback> */}
        </Form.Group>
      </div>

      <div class="textBox">
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label class="text">Confirm Password</Form.Label>
          <Form.Control required type="password" placeholder="Confirm Password" onChange={ e => setField('confirmPassword', e.target.value) } isInvalid={ !!errors.confirmPassword }/>
          {/* <FormControl.Feedback type="invalid">
            Passwords must match
          </FormControl.Feedback> */}
        </Form.Group>
      </div>

      <div class="center">
        <Button variant="primary" type="submit">
          Sign up
        </Button>{' '}
      </div>
    </Form>
  </div>
  );
}

export default SignupForm;
