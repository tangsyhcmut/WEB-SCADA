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
  

function Pump2Pop() {

 
  const [stateP2,setStateP2] = useState([]);
  const [bit,setBit] = useState()

    /// Connect 
    useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);
    ///State
  useEffect(() => {
    socket.on("pump2", (data) => {
       
        
        });
 });

  
    ///Mode
    const selectMode =async(e)=>{
      let pump2Mode = {
        pump2Mode:e.target.value}
     await 
     socket.emit('pump2Mode',pump2Mode)
    };
    ///Set Start
    const btnStartClick =()=>{
      let setStartP2 = {startP2:true}
      socket.emit('pump2Start',setStartP2)}
      ///Set Stop
    const btnStopClick =()=>{
        let setStopP2 = {stopP2:true}
        socket.emit('pump2Stop',setStopP2)}

      
    


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
                <Button className='btnstart' onClick={btnStartClick} disabled ={!stateP2.man}>Start</Button>
                <Button className='btnstop' onClick={btnStopClick} disabled ={!stateP2.man}>Stop</Button> 
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

export default Pump2Pop
