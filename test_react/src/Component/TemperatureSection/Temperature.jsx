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
  const [sysMode,setSysMode] = useState(null);

  const [sysSet,setSysSet] = useState(null)
    /// Connect 
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);
    useEffect(() => {
         socket.on("temperature", (data) => {
            //   console.log(data);
              setTemperature(data.Tp)
              setTemperatureSet(data.N)
              setSys(data.CM)
              // if(sys=0)
              // setSysMode('Auto')
              // else if(sys=1)
              // {setSysMode('Cooling')}
              
              // else if(sys=2){
              //   setSysMode('Heating')
              // }
              
             });
      });



  ///// Set values 
  const setSystem=async (e) => {
    
    let sysmode = {
      sysmode: e.target.value
    }
    await socket.emit("sysMode", sysmode);


  }

  const setTemp =async ()=>{
   let setTemp = {
     settem:inputTemp};
   await socket.emit("temperatureSet", setTemp);

  }


  // const inputValidation =()=>{
  //   if (inputTemp >35)
  //   {}

  // }
  // const increaseTemperature = async () => {
  //   if (temperatureSet === 35) return;

  //   const newTemperature = temperatureSet + 1;
    
  //   if (newTemperature >= 30) {
  //     setTemperatureColor("hot");
  //   }
  //   else  if  (newTemperature <=22)
  //     {setTemperatureColor("cold");}
   
  //   else {setTemperatureColor("normal")

  //   }
  // let settem= {
  //      temperatureSet: newTemperature
  //     };
  
  //     await socket.emit("temperatureSet", settem);
     
  //   };
  

  // const decreaseTemperature = async() => {
  //   if (temperatureSet === 18) return;

  //   const newTemperature = temperatureSet - 1;
    
  //   if (newTemperature >=30) {
  //     setTemperatureColor("hot");
  //   }
  //   else  if  (newTemperature <=22)
  //     {setTemperatureColor("cold");}
   
  //   else {setTemperatureColor("normal")

  //   }

  //   let settem= {
  //     temperatureSet: newTemperature
  //    };
 
  //    await socket.emit("temperatureSet", settem);
  // };
 
 
  return (
    <Container className="tem-container">
      <Form >
      <h2 className="label-tem" for ="tem-container" >Temperature</h2>

      

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
            <Label>FAN:</Label>
              <Input className='fan-select-mode' type="select" name="FanMode"  id="modeFan">
             <option>ON</option>
             <option>OFF</option>
             </Input>
            </FormGroup>
        </Row>
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