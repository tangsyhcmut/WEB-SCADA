import {useState,Component,useEffect} from 'react'
import './StatusData.css'

import {
    Container, Col, Form,Row,
    FormGroup, Label, Input,Button
   
  } from 'reactstrap';

  // import Select from 'react-select'
  import io from "socket.io-client";
  let socket;
  const CONNECTION_PORT = "localhost:5000/";

function StatusData() {


    const [pressure1,setPressure1] = useState(null);
    const [pressure2,setPressure2] = useState(null);
    const [pressure3,setPressure3] = useState(null);
    
    const [timecovert23,setTimecovert23] = useState(null);
    const [timecovert45,setTimecovert45] = useState(null);
    const [timeRinse,setTimeRinse] = useState(null);
    const [timeBackwash,setTimeBackwash] = useState(null);


     /// Connect 
     useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);
      ///State
    useEffect(() => {
      socket.on("PS_Filter1_Set", (data) => {
        setPressure1(data)
          });
          socket.on("PS_Filter2_Set", (data) => {
            setPressure2(data)
              });
              socket.on("PS_RO_Set", (data) => {
                setPressure3(data)
                  });
    socket.on("Timeset_Pump23", (data) => {
        setTimecovert23(data)
            });
            socket.on("Timeset_Pump45", (data) => {
                setTimecovert45(data)
                    });
                    socket.on("Timeset_Rinse", (data) => {
                        setTimeRinse(data)
                            });
                            socket.on("Timeset_Backwash", (data) => {
                                setTimeBackwash(data)
                                    });
                        
   });

    return (
        <div>
             
            <Form className='state-container'>
            <h2 className='label-status'>Status Data</h2>
               
                <FormGroup className='motor-state-container' >
                <Col >
                <ul className ='motor-list'>Motor
                <li>Motor 1</li>
                <li>Motor 2</li>
                <li>Motor 3</li>
                <li>Motor 4</li>
                <li>Motor 5</li>
                </ul>
                </Col>
                <Col >
                <ul className='motor-state'>Status
                <li>Motor 1</li>
                <li>Motor 2</li>
                <li>Motor 3</li>
                <li>Motor 4</li>
                <li>Motor 5</li>
                </ul>
                </Col>
                </FormGroup>
                <FormGroup className="valve-state-container">
                <Col  >
                <ul className ='valve-list'>Valve
                <li>Valve 1</li>
                <li>Valve 2</li>
                <li>Valve 3</li>
                <li>Valve 4</li>
                <li>Valve 5</li>
                <li>Valve 6</li>
                </ul>
                </Col>
                <Col >
                <ul className='valve-state' >Status
                <li>Valve 1</li>
                <li>Valve 2</li>
                <li>Valve 3</li>
                <li>Valve 4</li>
                <li>Valve 5</li>
                <li>Valve 6</li>
                </ul>
                </Col>
                </FormGroup>
                <FormGroup className="valve-state-container">
                <Col >
                <ul className ='valve-list' >Valve
                <li>Valve 7</li>
                <li>Valve 8</li>
                <li>Valve 9</li>
                <li>Valve 10</li>
                <li>Valve 11</li>
                <li>Valve 12</li>
                <li>Valve 13</li>
                </ul>
                </Col>
                <Col >
                <ul className='valve-state'  >Status
                <li>Valve 7</li>
                <li>Valve 8</li>
                <li>Valve 9</li>
                <li>Valve 10</li>
                <li>Valve 11</li>
                <li>Valve 12</li>
                <li>Valve 13</li>
                </ul>
                </Col>
                </FormGroup>
                <FormGroup className="timeclean-container">
                <Row>
                <ul className='time-clean' >Time clean
                <li>Clean Forward: {timeRinse} </li>
              
                <li>Clean Reverse: {timeBackwash} </li>
                </ul>
                </Row>
                <Row >
                <ul className='time-convert' >Time Convert
                <li>Convert Pump 2,3 :{timecovert23}</li>
              
                <li>Convert Pump 4,5 :{timecovert45}</li>
                </ul>
                </Row>
                </FormGroup>
                <FormGroup className="pressure-container">
                <Row>
                <ul className='set-pressure' >Pressure Set
                <br></br>
                <br></br>
                <li>Filter Tank 1 Pressure: {pressure1} Bar</li>
                <br></br>
                <li>Filter Tank 2 Pressure: {pressure2} Bar</li>
                <br></br>
                <li>RO Pressure:{pressure3} Bar</li>
                </ul>
                </Row>
                </FormGroup>
                
            </Form>
            
        </div>
    )
}

export default StatusData
