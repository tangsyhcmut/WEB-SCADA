import  { useState,useEffect } from "react";
import "./Temperature.css";
import io from "socket.io-client";
import {
    Container, Col, Form,
    FormGroup, Label, Input,Button,Row
   
  } from 'reactstrap'
  
  import useClock from '../hooks/useClock'

  let socket;
  const CONNECTION_PORT = "localhost:5000/";


function Tem () {
  
///
  const[temperature,setTemperature]=useState([])
  const [temperatureSet, setTemperatureSet] = useState(null);
  const [temperatureColor, setTemperatureColor] = useState("cold");
  const { timeString } = useClock();
  const[inputTemp,setInputTemp] = useState(null)
  const [sys,setSys] = useState(null);
  const [sysMode,setSysMode] = useState(0);

  const [sysSet,setSysSet] = useState(null)
    /// Connect 
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);


    useEffect(() => {
         socket.on("temperature", (data) => {
            
              setTemperature(data.Tp)
              setTemperatureSet(data.D)
              setSys(data.CM)
             });
      });



  ///// Set values 
  const setSystem=async (e) => {
    
    setSysMode(e.target.value)
    await socket.emit("sysMode", sysMode);


  }

  const setTemp =async ()=>{
   await socket.emit("temperatureSet", inputTemp);

  }


 
 
 
  return (
    <Container className="tem-container">
      <Form >
      <h3 className="label-tem" for ="tem-container" >Temperature</h3>

      

      <Col className='temperature' >
      <Row>
        <FormGroup className="temperature-display-container">
        <Label for="temperature-display-container">CURRENT TEMPERATURE </Label>
        <div className={`temperature-value-display ${temperatureColor}`}>
                {temperature/10}°C
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
            <Label>SYS:</Label>
              <Input className='sys-select-mode' type="select" name="sysMode" id="SysSelect" value ={sys} onChange={setSystem}>
             <option value='0'>Auto</option>
             <option value='1' >Cooling</option>
             <option value='2' >Heating</option>
             </Input>
            </FormGroup>
        </Row>
        <Row>
      <FormGroup className='set-tem-container'>
      <Label for='set-tem-container' >SET TEMPERATURE</Label>
      <div className={`temperature-set-display ${temperatureColor}`}>
                {temperatureSet/10}°C
        </div>
      </FormGroup>
      </Row>
      <Row>
        <FormGroup className="settem-container">
        
        <Input className='input-settem' onChange={(e)=>{setInputTemp(e.target.value)}}/>
        <Button className='btn-settem' onClick={setTemp}>SET</Button>
      </FormGroup>
      </Row>

          
      </Col>
          
      
    
    
      </Form>
       
    
    </Container>
  );
};

export default Tem;