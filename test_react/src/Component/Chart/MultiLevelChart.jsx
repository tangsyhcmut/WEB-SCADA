
import React, { useEffect, useState } from "react";
import {
  Bar, BarChart,



  CartesianGrid,

  Legend, Tooltip, XAxis,
  YAxis
} from "recharts";
import io from "socket.io-client";
import './MultiLevel.css';
let socket;
const CONNECTION_PORT = "localhost:5000/";

  
export default function App() {

  
  const [level,setLevel] =useState(0)

  const [data,setData] =useState([{
    name: "Tank A",
    pv:0,
  },
  {
    name: "Tank B",
    pv:0,
  },
  {
    name: "Tank C",
    pv:0,
  },
  {
    name: "Tank D",
    pv:0,
  },
  {
    name: "Tank E",
    pv:0,
  }]);
  useEffect(() => {
    socket = io(CONNECTION_PORT);
}, [CONNECTION_PORT]);

  useEffect(() => {
    
    socket.on("FTank_Level", (data) => {
      setLevel(data);
      console.log(data);
      });


    setData([{
      name: "Tank A",
      pv: level,
    },
    {
      name: "Tank B",
      pv: 1398,
    },
    {
      name: "Tank C",
      pv: 9800,
    },
    {
      name: "Tank D",
      pv: 3908,
    },
    {
      name: "Tank E",
      pv: 4800,
    }]);
    console.log(data)
});



  return (
    <div className="level-chart-container">
<h1 className='label-level-chart'>LEVEL TANK CHART</h1>
    <BarChart
      width={700}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={40}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar name ='Current Level' dataKey="pv" fill="rgba(22, 29, 111,1)" background={{ fill: "#eee" }} />
    </BarChart>
    </div>
    
  );
}
