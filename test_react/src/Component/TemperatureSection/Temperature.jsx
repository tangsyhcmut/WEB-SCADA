import  { useState } from "react";
import "./Temperature.css";
import {
    Container, Col, Form,
    FormGroup, Label, Input,Button,Row
   
  } from 'reactstrap'
  import useClock from '../hooks/useClock'




const Tem = () => {




  const [temperatureValue, setTemperatureValue] = useState(null);
  const [temperatureSet, setTemperatureSet] = useState(25);
  const [temperatureColor, setTemperatureColor] = useState("cold");
  const { timeString } = useClock();


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

      

      <Col className='temperature' >
      <Row>
        <FormGroup className="temperature-display-container">
        <Label for="temperature-display-container">CURRENT TEMPERATURE </Label>
        <div className={`temperature-value-display ${temperatureColor}`}>
                {temperatureValue}°C
        </div>
        <div className="clock">
        <p className="clock__time">{timeString}</p>
        </div> 
        </FormGroup>
      </Row>
      
      </Col>
      


      <Col className= 'selectmode'>
        <Row>
            <FormGroup>
            <Label>FAN:</Label>
              <Input className='fan-select-mode' type="select" name="FanMode" id="modeFan">
             <option>ON</option>
             <option>OFF</option>
             </Input>
            </FormGroup>
        </Row>
        <Row>
            <FormGroup>
            <Label>SYS:</Label>
              <Input className='sys-select-mode' type="select" name="sysMode" id="SysSelect">
             <option>Auto</option>
             <option>Cooling</option>
             <option>Heating</option>
             </Input>
            </FormGroup>
        </Row>
        <Row>
      <FormGroup className='set-tem-container'>
      <Label for='set-tem-container' >SET TEMPERATURE</Label>
      <div className={`temperature-set-display ${temperatureColor}`}>
                {temperatureSet}°C
        </div>
      </FormGroup>
      </Row>
      <Row>
        <FormGroup className="button-tem-container">
        
        <Button className='btn-decrease' onClick={decreaseTemperature}>-</Button>
        <Button className='btn-increase' onClick={increaseTemperature}>+</Button>
      </FormGroup>
      </Row>

          
      </Col>
          
      
    
    
      </Form>
       
    
    </Container>
  );
};

export default Tem;