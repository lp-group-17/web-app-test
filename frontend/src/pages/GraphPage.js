import React from 'react';
import BarGraph from "./components/BarGraph";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
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
      var obj = {mood:graphMood.value, irritability:graphIrritability, anxiety:graphAnxiety.value, suicidal:graphSuicidal};
      var js = JSON.stringify(obj);
      try
      {
        const response = await fetch('http://localhost:5000/api/signup', {method:'POST', body:js, header:{'Content-Type':'application/json'}});
        var res = JSON.parse(await response.text());
        setMessage('');
        history.push('/graph');
      }
      catch(e)
      {
        alert(e.toString());
        return;
      }
    }

  }

  return (
    <div>
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
      <BarGraph />
    </div>
  );
}

export default GraphPage;
