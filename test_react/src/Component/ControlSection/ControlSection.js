import React,{ useState, useEffect} from 'react';
import './ControlSection.css';
import io from "socket.io-client";

import {Col,Container,Row, Button,FormGroup } from 'reactstrap';


let socket;
const CONNECTION_PORT = "localhost:5000/";

function ControlSection() {
    const [sysState,setSysState] = useState({auto:false,man:false,start:false,stop:false});

/// Connect Socket
    useEffect(() => {
        socket = io(CONNECTION_PORT, {
       withCredentials: true,
       extraHeaders:{
         "my-custom-header": "phucsys"
       }
   });
      
   });


///Socket on
    useEffect(() => {
    socket.on("receive_sys_state", (data) => {
      setSysState(data);
      console.log(data);
        });
        });
///btnClick
   const btnAutoClick = async () => {
        let send_sys_state = {
          auto : true,
          man : false,
          start: false,
          stop: false
        };
    
        await socket.emit("send_sys_state",send_sys_state);
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


     const btnManClick = async () => {
            let send_sys_state = {
              auto : false,
              man : true,
              start: false,
              stop: false
            };
        
            await socket.emit("send_sys_state",send_sys_state);
            };
    const btnStartClick = async () => {
                let send_sys_state = {
                  auto : false,
                  man : true,
                  start: true,
                  stop: false
                };
            
                await socket.emit("send_sys_state",send_sys_state);
                };

     const btnStopClick = async () => {
                  let send_sys_state = {
                      auto : false,
                      man : true,
                      start: false,
                      stop: true
                    };
                
                    await socket.emit("send_sys_state",send_sys_state);
                    };
    





    return (
        <>
        <Container className='control-sys'>
                <h2 className='title-sys'> CONTROL   SYSTEM </h2>
            
            <Row>
                <FormGroup className='line1'>
            <Button  className= 'btn-sys-auto' onClick={btnAutoClick} >Auto</Button>{''}
            <Button  className='btn-sys-reset' onClick ={btnResetClick}>Reset</Button>
           
                 </FormGroup>
            </Row>   
            <Row>
                <FormGroup>
                    <div className='line2'>
                    <Button  className='btn-sys-man' onClick={btnManClick}>Man</Button>
                    <Button  className='btn-sys-start' onClick={btnStartClick} disabled ={!sysState.man} >Start</Button>
                    <Button  className='btn-sys-stop' onClick={btnStopClick} disabled ={!sysState.man} >Stop</Button>
                    </div>
           
                </FormGroup>
                
           </Row>  
           </Container>
        </>
    )
}

export default ControlSection;

