
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import './MultiLevel.css'
const data = [
  {
    name: "Tank A",
    
    pv: 2400,
    
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
 
  }
];

export default function App() {
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
