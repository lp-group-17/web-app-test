import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';

const PasswordReset = () => {
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
    const {tempPassword, password, confirmPassword} = form
    const newErrors = {}

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
      var obj = {password:form.resetPassword.value};
      var js = JSON.stringify(obj);
      try
      {
        const response = await fetch('http://137.184.153.148/', {method:'POST', body:js, header:{'Content-Type':'application/json'}});
        var res = JSON.parse(await response.text());

        // CONSIDER CHANGING WHAT THIS IS SAVING
        var user = {firstName:res.username, lastName:res.lastName, id:res.id}
        localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('');
        window.location.href('/portal');
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
      PASSWORD RESET
    </h2>
 </div>
    <Form noValidate onSubmit={handleSubmit}>
      <div class="wrapper">
        <div class="textBox">
        <Form.Group className="mb-3" controlId="resetTempPassword">
          <Form.Label class="text">Old Password</Form.Label>
          <Form.Control required type="password" placeholder="Old Password" onChange={ e => setField('tempPassword', e.target.value) } isInvalid={ !!errors.tempPassword }/>
          <Form.Control.Feedback type="invalid">
            Temporary password must match one on record
          </Form.Control.Feedback>
        </Form.Group>
        </div>

        <div class="textBox">
        <Form.Group className="mb-3" controlId="resetPassword">
          <Form.Label class="text">New Password</Form.Label>
          <Form.Control required type="password" placeholder="Enter New Password" onChange={ e => setField('password', e.target.value) } isInvalid={ !!errors.password }/>
          <Form.Control.Feedback type="invalid">
            Password must be at least 8 characters and contain at least one lowercase, capital, number and symbol
          </Form.Control.Feedback>
        </Form.Group>
        </div>

        <div class="textBox">
        <Form.Group className="mb-3" controlId="resetConfirmPassword">
          <Form.Label class="text">Confirm New Password</Form.Label>
          <Form.Control required type="password" placeholder="Confirm Password" onChange={ e => setField('confirmPassword', e.target.value) } isInvalid={ !!errors.confirmPassword }/>
          <Form.Control.Feedback type="invalid">
            Passwords must match
          </Form.Control.Feedback>
        </Form.Group>
        </div>

        <div class="center spacer-small">
          <Button variant="primary" type="submit">
            Submit
          </Button>{' '}
        </div>
      </div>
    </Form>

  </div>
  );
}

export default PasswordReset;
