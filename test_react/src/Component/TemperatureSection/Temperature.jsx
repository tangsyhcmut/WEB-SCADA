import  { useState } from "react";
import "./Temperature.css";
import {
    Container, Col, Form,
    FormGroup, Label, Input,Button
   
  } from 'reactstrap'

const Tem = () => {
const [temperatureValue, setTemperatureValue] = useState(null);
  const [temperatureSet, setTemperatureSet] = useState(25);
  const [temperatureColor, setTemperatureColor] = useState("cold");

  const increaseTemperature = () => {
    if (temperatureSet === 35) return;

    const newTemperature = temperatureSet + 1;

    setTemperatureSet(newTemperature);
    if (newTemperature >= 30) {
      setTemperatureColor("hot");
    }
    else  if  (newTemperature <=22)
      {setTemperatureColor("cold");}
   
    else {setTemperatureColor("normal")

    }
  };

  const decreaseTemperature = () => {
    if (temperatureSet === 18) return;

    const newTemperature = temperatureSet - 1;
    setTemperatureSet(newTemperature);
    if (newTemperature >=30) {
      setTemperatureColor("hot");
    }
    else  if  (newTemperature <=22)
      {setTemperatureColor("cold");}
   
    else {setTemperatureColor("normal")

    }
  };
 
 
  return (
    <Container className="tem-container">
      <Form >
      <h2 className="label-tem" for ="tem-container" >Temperature</h2>
      <Col>
      <FormGroup className="temperature-display-container">
        <Label for="temperature-display-container">CURRENT VALUE</Label>
        <div className={`temperature-value-display ${temperatureColor}`}>
                {temperatureValue}°C
        </div>
      </FormGroup>
      </Col>
      
      <Col>
      <FormGroup className='set-tem-container'>
      <Label for='set-tem-container' >SET VALUE</Label>
      <div className={`temperature-set-display ${temperatureColor}`}>
                {temperatureSet}°C
        </div>
      </FormGroup>
      </Col>
     
    <Col>
    <FormGroup className="button-tem-container">
        
        <Button className='btn-decrease' onClick={decreaseTemperature}>-</Button>
        <Button className='btn-increase' onClick={increaseTemperature}>+</Button>
      </FormGroup>
    </Col>
      </Form>
       
    
    </Container>
  );
};

export default Tem;