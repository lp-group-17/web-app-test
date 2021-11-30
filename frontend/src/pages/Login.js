import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';

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
    <div class="center spacer-large">
      <img src={logo} width="256"/>
    </div>
    <div class="center">
      <h2 class="gradient">
        MOOD TRACKER
      </h2>
    </div>
    <Form noValidate onSubmit={handleSubmit}>
      <div class="textBox">
        <Form.Group className="mb-3" controlId="loginUsername">
          <Form.Label class="text">Username</Form.Label>
          <Form.Control required type="text" placeholder="Enter Username" onChange={ e => setField('username', e.target.value) } isInvalid={ !!errors.username }/>
          {/* <FormControl.Feedback type="invalid">
            Username cannot be blank
          </FormControl.Feedback> */}
        </Form.Group>
      </div>

      <div class="textBox">
        <Form.Group className="mb-3" controlId="loginPassword" class="textBox">
          <Form.Label class="text">Password</Form.Label>
          <div className="forgot-password text-right text">
            Forgot <a href='/passwordresetrequest'>password?</a>
          </div>
          <Form.Control required type="password" placeholder="Password" onChange={ e => setField('password', e.target.value) } isInvalid={ !!errors.password }/>
          {/* <FormControl.Feedback type="invalid">
            Password cannot be blank
          </FormControl.Feedback> */}
          
        </Form.Group>
      </div>

      <div class="center spacer-small">  
        <Button variant="primary" type="submit">
          Log in
        </Button>{' '}
      </div>

      <div class="center spacer-small">
        <Button variant="success" href="/signup">
          Create Account
        </Button>
      </div>
      
    </Form>
  </div>);
}

export default Login;
