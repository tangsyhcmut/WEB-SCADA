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
  

function ValvePop() {

    const[bit,setbit] =useState(false)
    const [stateV0,setStateV0] = useState([]);


    /// Connect 
    useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);
    ///State
  useEffect(() => {
    socket.on("valve0", (data) => {
       
        
        });
 });

    ///Mode
    const selectMode =async(e)=>{
      let valve0Mode = {
        valve0Mode:e.target.value}
     await 
     socket.emit('valve0Mode',valve0Mode)
    };
    ///Set Open
    const btnOpenClick =()=>{
      let setOpenV0 = {openV0:true}
        socket.emit('valve0Open',setOpenV0)}
      ///Set Close
    const btnCloseClick =()=>{
        let setCloseV0 = {closeV0:true}
        socket.emit('valve0Close',setCloseV0)}

    
    return (
        <Container>
     

        <Form className='valvepop'>
        <Row form>
          <div className='select-mode'>
          <Col >
            <FormGroup >
            
              <Label>Mode :</Label>
              <Input className='valve-select-mode' type="select" name="Mode" id="modeSelect" onChange={selectMode}>
              <option value ='2'> Auto </option>
             <option value ='1'> Man </option>
             </Input>
             
             
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
            <div className="controlbtn">
                <Label>Control : </Label>
                <Button className='btnopen'  onClick={btnOpenClick} disabled ={!stateV0.man}>Open</Button> {' '}
                <Button className='btnclose' onClick={btnCloseClick} disabled ={!stateV0.man}>Close</Button> 
                <Button className='btnreset' >Reset</Button>
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
            <img className="valvehighlight" src ={bit ?  redlighton : redlightoff } />
            <Label>Low limit </Label>
            <img className="valvelowlight" src ={bit ?  redlighton : redlightoff } />


            <Label>Opened</Label>
            <img className="valveopenlight" src ={bit ? greenlighton : greenlightoff}/>
             <Label>Closed</Label>
            <img className="valvecloselight" src ={bit ? greenlighton : greenlightoff}/>


             <Label> Fault </Label>
            <img className="valvefaultlight" src ={bit ?  redlighton : redlightoff } />
             </div>
            </FormGroup>
          </Col>
        </Row>
         
        </Form>
      </Container>
    )
}

export default ValvePop
