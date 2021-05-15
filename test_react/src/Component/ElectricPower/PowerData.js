import React,{useEffect,useState} from 'react'
import {
    Container, Col, Form,Row
    , Label, Input,Button
   
  } from 'reactstrap'
import './PowerData.css'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList
  } from "recharts"
import io from "socket.io-client";


let socket;
const CONNECTION_PORT = "localhost:5000/";

// PowerData.propTypes = {UL1,UL2,UL3,IL1,IL2,IL3,PF,Phi,F,P,Q,S};



function PowerData() {


    const [power,setPower] =useState([])
    

    /// Connect 
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);


    useEffect(() => {
      
        socket.on("powermeter", (data) => {
        //   console.log(data);
          setPower(data)
         });

        
      });


   /// Chart data
   const data = [
    {
      name: "UL1",
      
      pv: power.UL1/10,
      
    },
    {
      name: "UL2",
      
      pv: power.UL2/10,
      
    },
    {
      name: "UL3",
    
      pv: power.UL3/10,
     
    }]
   


/// Convert data 
function Convert (data) {
   
   
    var x= data >>> 15;

    if(x==1)
    {var a = ~data & 0x0000FFFF;

    data = -(a+1)/10
    }
   else{data=data/10}
return data;
}
   
    return (
  
    <Form className='powerData'>
        <h2 className='powertitle' >ElectricPower Monitor</h2>
           <Row className='U-I'>
               
                <h3>Voltage-Current</h3>
                <ul className='voltage'>
                    <li>UL1: {power.UL1/10} V </li>
                    <li>UL2: {power.UL2/10} V </li>
                    <li>UL3: {power.UL3/10} V </li>
                </ul>
            
               
                <ul className='current'>
                    <li>IL1: {power.IL1/10} A </li>
                    <li>IL2: {power.IL2/10} A </li>
                    <li>IL3: {power.IL3/10} A </li>
                </ul>
            
           </Row>
           <Row className="power-contain">
                    <h3>Power</h3>
    
                <ul className='factor'>
                    <li>PF: {power.PF/1000} </li>
                    <li>Phi: {power.Phi/100} </li>
                    <li>Frq: {power.F/100} Hz</li>
                </ul>
            
               
              
                <ul className='power'>
                    <li>P: {Convert(power.P)} kW </li>
                    <li>Q: {Convert(power.Q)} kVar</li>
                    <li>S: {Convert(power.S)} kVa</li>
                </ul>
            
           </Row>

           <Row className="chart-container">

    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={30}
    >
      <XAxis tick={{stroke: 'black', strokeWidth: 1.5}}  dataKey="name" scale="point" padding={{ left: 20, right: 20 }} color="black" />
      <YAxis tick={{stroke: 'black', strokeWidth: 1.5}}/>
      <Tooltip />
      <Legend  />
      <CartesianGrid strokeDasharray="3 3"  />
      <Bar name ='Voltage' dataKey='pv' fill="rgba(22, 29, 111,1)" background={{ fill: "#eee" }} />
    </BarChart>
    </Row>

       </Form>
   
       
            
       
    )
}

export default PowerData
