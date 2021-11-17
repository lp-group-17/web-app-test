import React from 'react';
// import Button from 'react-bootstrap/Button';
import { Button } from 'react';
import { useState } from 'react';
// import Form from 'react-bootstrap/Form';
import { Form } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const PasswordReset = () => {
  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})

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

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } else {
      var obj = {password:resetPassword.value};
      var js = JSON.stringify(obj);
      try
      {
        const response = await fetch('http://137.184.153.148/', {method:'POST', body:js, header:{'Content-Type':'application/json'}});
        var res = JSON.parse(await response.text());

        var user = {firstName:res.username, lastName:res.lastName, id:res.id}
        localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('');
        history.push('/portal');
      }
      catch(e)
      {
        alert(e.toString());
        return;
      }
    }

  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="resetTempPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Temporary Password" onChange={ e => setField('tempPassword', e.target.value) } isInvalid={ !!errors.tempPassword }/>
        <Form.Control.Feedback type="invalid">
          Temporary password must match one on record
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="resetPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" onChange={ e => setField('password', e.target.value) } isInvalid={ !!errors.password }/>
        <Form.Control.Feedback type="invalid">
          Password must be at least 8 characters and contain at least one lowercase, capital, number and symbol
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="resetConfirmPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Confirm Password" onChange={ e => setField('confirmPassword', e.target.value) } isInvalid={ !!errors.confirmPassword }/>
        <Form.Control.Feedback type="invalid">
          Passwords must match
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>{' '}
    </Form>
  );
}

export default PasswordReset;
