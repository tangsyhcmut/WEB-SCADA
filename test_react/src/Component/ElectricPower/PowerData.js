import React from 'react'
import {
    Container, Col, Form,Row
    , Label, Input,Button
   
  } from 'reactstrap'
import './PowerData.css'
function PowerData() {
    return (
  
    <Form className='powerData'>
        <h2 className='powertitle' >ElectricPower Monitor</h2>
           <Row className='U-I'>
               
                <h3>Voltage-Current</h3>
                <ul className='voltage'>
                    <li>UL1: V </li>
                    <li>UL2: V </li>
                    <li>UL3: V </li>
                </ul>
            
               
                <ul className='current'>
                    <li>IL1: A </li>
                    <li>IL2: A </li>
                    <li>IL3: A </li>
                </ul>
            
           </Row>
           <Row className="power-contain">
                    <h3>Power</h3>
    
                <ul className='factor'>
                    <li>PF: </li>
                    <li>Phi: </li>
                    <li>Frq: Hz</li>
                </ul>
            
               
              
                <ul className='power'>
                    <li>P:  kW </li>
                    <li>Q:  kVar</li>
                    <li>S:  kVa</li>
                </ul>
            
           </Row>

       </Form>
   
       
            
       
    )
}

export default PowerData
