import {useState,Component,useEffect} from 'react'
import greenlightoff from '../img/Off_Green.png';
import greenlighton from '../img/On_Green.png';
import redlightoff from '../img/Off_Red.png';
import redlighton from '../img/On_Red.png';
import {
    Container, Col, Form,
    FormGroup, Label, Input,Button,Row
   
  } from 'reactstrap';
    import './ValvePop.css'
    import io from "socket.io-client";
    let socket;
    const CONNECTION_PORT = "localhost:5000/";
  

function ValveA4Pop() {

  const[mode,setMode] =useState(null)
  const [stateVA4,setStateVA4] = useState([]);


  /// Connect 
  useEffect(() => {
    socket = io(CONNECTION_PORT);
}, [CONNECTION_PORT]);
  ///State
useEffect(() => {
  socket.on("VA4", (data) => {
    setStateVA4(data);
     
      
      });
});

  ///Mode
  const btnSetClick =async()=>{
      
    await socket.emit('VA4_Mode',mode)}

  
  ///Set Open
  const btnOpenClick =async()=>{
   
    await socket.emit('Button','VA4_OPEN')}
    ///Set Close
  const btnCloseClick =async()=>{
      
    await socket.emit('Button','VA4_CLOSE')}
    ///Set Reset
  const btnResetClick =async()=>{
      await socket.emit('Button','VA4_RESET')}

    
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
          <div className="valve-running">
          <Col>
            <Label>Running Time</Label>
            <FormGroup>
                
              <Label>Position</Label>
              <Input placeholder="0.00%" />
            </FormGroup>
            
          </Col>
          </div>
          
        </Row>
        <Row form>
          <Col>
            <FormGroup>
            <div className='valve-status-light'>
            <Label> High limit </Label>
            <img className="valvehighlight" src ={stateVA4 ?  redlighton : redlightoff } />
            <Label>Low limit </Label>
            <img className="valvelowlight" src ={stateVA4 ?  redlighton : redlightoff } />


            <Label>Opened</Label>
            <img className="valveopenlight" src ={stateVA4.OPENED? greenlighton : greenlightoff}/>
             <Label>Closed</Label>
            <img className="valvecloselight" src ={stateVA4.CLOSED ? greenlighton : greenlightoff}/>


             <Label> Fault </Label>
            <img className="valvefaultlight" src ={stateVA4.FAULT ?  redlighton : redlightoff } />
             </div>
            </FormGroup>
          </Col>
        </Row>
         
        </Form>
      </Container>
    )
}

export default ValveA4Pop
