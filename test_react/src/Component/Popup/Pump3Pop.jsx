import {useState,Component,useEffect} from 'react'
import greenlightoff from '../img/Off_Green.png';
import greenlighton from '../img/On_Green.png';
import redlightoff from '../img/Off_Red.png';
import redlighton from '../img/On_Red.png';
import {
    Container, Col, Form,
    FormGroup, Label, Input,Button
   
  } from 'reactstrap';
    import './PumpPop.css'
 
  import io from "socket.io-client";
  let socket;
  const CONNECTION_PORT = "localhost:5000/";
  

function Pump3Pop() {

 
  const [stateP3,setStateP3] = useState([]);
  const [bit,setBit] = useState()

    /// Connect 
    useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);
    ///State
  useEffect(() => {
    socket.on("pump3", (data) => {
       
        
        });
 });

  
    ///Mode
    const selectMode =async(e)=>{
      let pump3Mode = {
        pump3Mode:e.target.value}
     await 
     socket.emit('pump3Mode',pump3Mode)
    };
    ///Set Start
    const btnStartClick =()=>{
      let setStartP3 = {startP3:true}
      socket.emit('pump3Start',setStartP3)}
      ///Set Stop
    const btnStopClick =()=>{
        let setStopP3 = {stopP3:true}
        socket.emit('pump3Stop',setStopP3)}

      
    


    return (
        <Container className='pumppop'>
     

        <Form >
        <div className='select-mode'>
          <Col >
            <FormGroup>
              <Label>Mode :</Label>
              <Input className='pump-select-mode' type="select" name="Mode" id="modeSelect" onChange={selectMode}>
             <option value = '2'> Auto </option>
             <option value ='1'> Man </option>
             </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
            <div className="pump-controlbtn">
                <Label>Control : </Label>
                <Button className='btnstart' onClick={btnStartClick} disabled ={!stateP3.man}>Start</Button>
                <Button className='btnstop' onClick={btnStopClick} disabled ={!stateP3.man}>Stop</Button> 
                <Button className='btnreset'>Reset</Button>
                </div>
            </FormGroup>
          </Col>
          </div>
          <Col>
            <FormGroup>
            <div className='pump-status'>
              {/* <Label>Running Time</Label> */}
              <div className='pumplight'>
              <Label> Status </Label>
            <img className="pump-status-light" src ={bit ? greenlighton : greenlightoff}/>
             <Label> Fault </Label>
            <img className="pump-fault-light" src ={bit ?  redlighton : redlightoff } />
              </div>
            
             </div>
            </FormGroup>
          </Col>
          <Col>
          <div className='pump-set'>
            <FormGroup>
            
              <Label>Set speed</Label>
              <Input placeholder="0.00%" />
            </FormGroup>
            <FormGroup>
              <Label>Status</Label>
              
            </FormGroup>
            </div>
          </Col>
         
        </Form>
      </Container>
    )
}

export default Pump3Pop
