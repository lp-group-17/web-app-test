import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'

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
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="loginUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control required type="text" placeholder="Enter Username" onChange={ e => setField('username', e.target.value) } isInvalid={ !!errors.username }/>
        <Form.Control.Feedback type="invalid">
          Username cannot be blank
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" onChange={ e => setField('password', e.target.value) } isInvalid={ !!errors.password }/>
        <Form.Control.Feedback type="invalid">
          Password cannot be blank
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>{' '}

      <p className="forgot-password text-right">
        Forgot <a href='/passwordreset'>password?</a>
      </p>
    </Form>
  );
}

export default Login;
