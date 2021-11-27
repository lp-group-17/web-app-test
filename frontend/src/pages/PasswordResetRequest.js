import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'

const PasswordResetRequest = () => {
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
      const {email} = form
      const newErrors = {}
  
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ( !email || email === "" ) newErrors.email = 'cannot be blank'
      else if ( !emailRegex.test(String(email)) ) newErrors.email = 'must be a valid email'

      return newErrors
    }
  
    const handleSubmit = async event => {
      event.preventDefault()
      const newErrors = findFormErrors()
      if ( Object.keys(newErrors).length > 0 ) {
        setErrors(newErrors)
      } else {
        var obj = {email:form.email.value};
        var js = JSON.stringify(obj);
        try
        {
          const response = await fetch('http://137.184.153.148/', {method:'POST', body:js, header:{'Content-Type':'application/json'}});
          var res = JSON.parse(await response.text());
          setMessage('');
          window.location.href('/passwordreset');
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
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Please provide an email address to receive an email</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" onChange={ e => setField('email', e.target.value) } isInvalid={ !!errors.email }/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Send Email
        </Button>{' '}
      </Form>
    );
  }
  
  export default PasswordResetRequest;
  