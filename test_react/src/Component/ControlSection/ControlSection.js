import React,{ useState, useEffect} from 'react';
import './ControlSection.css';
import io from "socket.io-client";
import {Label,Input,Container,Row, Button,FormGroup } from 'reactstrap';
import CleanPop from '../Popup/CleanPop'


let socket;
const CONNECTION_PORT = "localhost:5000/";

function ControlSection() {
    const[modeSet,setModeSet] =useState(null)
    const [mode,setMode] = useState();
 
   

 /// Connect 
 useEffect(() => {
  socket = io(CONNECTION_PORT);
}, [CONNECTION_PORT]);



///btnClick
   const btnAutoClick = async () => {
     
        await socket.emit("Button",'GAuto');
        };

     const btnResetClick = async () => {
            let send_sys_state = {
              auto : false,
              man : false,
              start: false,
              stop: false
            };
        
            await socket.emit("send_sys_state",send_sys_state);
            };


    const btnStartClick = async () => {
               
        await socket.emit("Button",'StartSystem');
                };

     const btnStopClick = async () => {
                 
        await socket.emit("Button",'StopSystem');
                    };
    





    return (
        <>
        <Container className='control-sys'>
                <h2 className='title-sys'> CONTROL   SYSTEM </h2>
            <Row>
            <FormGroup>
              <Label>SetMode</Label>
              <Input className='select-sys-mode' type="select" name="Mode" id="modeSelect" onChange={(e)=>setModeSet(e.target.value)}>
             <option value ='2'> Auto </option>
             <option value ='1'> Man </option>
             <option value ='3'> Service </option>
             </Input>
             <Button className='btn-sys-set'>Set</Button>
            </FormGroup>
            </Row>
            <Row>
                <FormGroup className='line1'>
            <Button  className= 'btn-sys-auto' onClick={btnAutoClick} >Auto</Button>{''}
            <Button  className='btn-sys-reset' onClick ={btnResetClick}>Reset</Button>
           
                 </FormGroup>
            </Row>   
            <Row>
                <FormGroup>
                    <div className='line2'>
                    
                    <Button  className='btn-sys-start' onClick={btnStartClick}  >Start</Button>
                    <Button  className='btn-sys-stop' onClick={btnStopClick}  >Stop</Button>
                    
                    </div>
           
                </FormGroup>
                
           </Row>  
           </Container>
        </>
    )
}

export default ControlSection;

