import React from 'react';
import BarGraph from '../components/BarGraph';
import CalendarComp from '../CalendarComp';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { atcb_init } from 'add-to-calendar-button';
import 'bootstrap/dist/css/bootstrap.min.css'


const GraphPage = () => {

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
    const {mood, irritability, anxiety, suicidal} = form
    const newErrors = {}

    if ( !mood || mood === "" ) newErrors.firstName = 'cannot be blank'
    else if ( mood.value > 5 | mood.value < 1) newErrors.mood = 'value must be between 1 and 5'

    if ( !irritability || irritability === "" ) newErrors.irritability = 'cannot be blank'
    else if ( irritability.value > 5 | irritability.value < 1) newErrors.irritability = 'value must be between 1 and 5'

    if ( !anxiety || anxiety === "" ) newErrors.anxiety = 'cannot be blank'
    else if ( anxiety.value > 5 | anxiety.value < 1) newErrors.anxiety = 'value must be between 1 and 5'

    if ( !suicidal || suicidal === "" ) newErrors.suicidal = 'cannot be blank'
    else if ( suicidal.value > 5 | suicidal.value < 1) newErrors.suicidal = 'reponse must be either "yes" or "no"'

    return newErrors
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } else {
      var obj = {mood:form.mood.value, irritability:form.irritability, anxiety:form.anxiety.value, suicidal:form.suicidal};
      var js = JSON.stringify(obj);
      try
      {
        const response = await fetch('http://137.184.153.148/', {method:'POST', body:js, header:{'Content-Type':'application/json'}});
        var res = JSON.parse(await response.text());
        setMessage('');
        window.location.href('/graph');
      }
      catch(e)
      {
        alert(e.toString());
        return;
      }
    }

  }

  const doLogout = event => 
    {
      event.preventDefault();
      localStorage.removeItem("user_data")
      window.location.href = '/';
    }; 

  return (
    
    <div>
      <Button variant="danger" onClick={doLogout}>
        Logout
      </Button>
      <div>
        
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
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="graphMood">
          <Form.Label>Mood Level</Form.Label>
          <Form.Control required type="number" placeholder="1-5" onChange={ e => setField('mood', e.target.value) } isInvalid={ !!errors.mood }/>
          <Form.Control.Feedback type="invalid">
            Must be a value between 1 and 5
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="graphIrritability">
          <Form.Label>Irritability Level</Form.Label>
          <Form.Control required type="number" placeholder="1-5" onChange={ e => setField('irritability', e.target.value) } isInvalid={ !!errors.irritability }/>
          <Form.Control.Feedback type="invalid">
            Must be a value between 1 and 5
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="graphAnxiety">
          <Form.Label>Anxiety Level</Form.Label>
          <Form.Control required type="number" placeholder="1-5" onChange={ e => setField('anxiety', e.target.value) } isInvalid={ !!errors.anxiety }/>
          <Form.Control.Feedback type="invalid">
            Must be a value between 1 and 5
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="graphSuicidal">
          <Form.Label>Suicidal Inclinations</Form.Label>
          <Form.Control required type="text" placeholder="mood level" onChange={ e => setField('suicidal', e.target.value) } isInvalid={ !!errors.suicidal }/>
          <Form.Control.Feedback type="invalid">
            Must be either "yes" or "no"
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          This is how I feel
        </Button>{' '}
      </Form>
      {/* <CalendarComp /> */}
      <BarGraph />
      
    </div>
  );
}

export default GraphPage;
