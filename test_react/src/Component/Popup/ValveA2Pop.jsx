import { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form,
  FormGroup, Input, Label, Row
} from 'reactstrap';
import io from "socket.io-client";
import greenlightoff from '../img/Off_Green.png';
import redlightoff from '../img/Off_Red.png';
import greenlighton from '../img/On_Green.png';
import redlighton from '../img/On_Red.png';
import './ValvePop.css';
    let socket;
    const CONNECTION_PORT = "localhost:5000/";
  

function ValveA2Pop() {

  const[mode,setMode] =useState(null)
  const [stateVA2,setStateVA2] = useState([]);


  /// Connect 
  useEffect(() => {
    socket = io(CONNECTION_PORT);
}, [CONNECTION_PORT]);
  ///State
useEffect(() => {
  socket.on("VA2", (data) => {
    setStateVA2(data);
     
      
      });
});

  ///Mode
  const btnSetClick =async()=>{
      
    await socket.emit('VA2_Mode',mode)}

  
  ///Set Open
  const btnOpenClick =async()=>{
   
    await socket.emit('Button','VA2_OPEN')}
    ///Set Close
  const btnCloseClick =async()=>{
      
    await socket.emit('Button','VA2_CLOSE')}
    ///Set Reset
  const btnResetClick =async()=>{
      await socket.emit('Button','VA2_RESET')}

    
    return (
        <Container>
     

        <Form className='valvepop'>
        <Row form>
          <div className='select-mode'>
          <Col >
            <FormGroup >
            
              <Label>Mode :</Label>
              <Input className='valve-select-mode' type="select" name="Mode" id="modeSelect" onChange={(e)=>setMode(e.target.value)}>
              <option value ='2'> Auto </option>
             <option value ='1'> Man </option>
             </Input>
             <Button onClick={btnSetClick} className ='btnset'> SET </Button>
             
             
            </FormGroup>
           </Col>
             <Col>
            <FormGroup>
            <div className="controlbtn">
                <Label>Control : </Label>
                <Button className='btnopen'  onClick={btnOpenClick} >Open</Button> {' '}
                <Button className='btnclose' onClick={btnCloseClick}>Close</Button> 
                <Button className='btnreset' onClick={btnResetClick} >Reset</Button>
              </div>
            </FormGroup>
          </Col>
          </div>
         
          
        </Row>
        <Row form>
          <Col>
            <FormGroup>
            <div className='valve-status-light'>
           


            <Label>Opened</Label>
            <img className="valveopenlight" src ={stateVA2.OPENED? greenlighton : greenlightoff}/>
             <Label>Closed</Label>
            <img className="valvecloselight" src ={stateVA2.CLOSED ? greenlighton : greenlightoff}/>


             <Label> Fault </Label>
            <img className="valvefaultlight" src ={stateVA2.FAULT ?  redlighton : redlightoff } />
             </div>
            </FormGroup>
          </Col>
        </Row>
         
        </Form>
      </Container>
    )
}

export default ValveA2Pop
