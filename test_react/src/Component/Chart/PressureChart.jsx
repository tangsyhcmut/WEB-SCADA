

import React, { useEffect, useState,useRef } from "react";
import {
  Bar, BarChart,
  CartesianGrid,
  Legend, Tooltip, XAxis,Label,Area,AreaChart,
  YAxis
} from "recharts";
import axios from "axios";
import './PressureChart.css'
import io from "socket.io-client";
import { apiUrl } from "../../context/constants";


let socket;
const CONNECTION_PORT = "localhost:5000/";


  
export default function App() {
  const [trendList, setTrendList] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get(`${apiUrl}/trenddata`);
      if (response.data.success) {
        setTrendList(response.data.sendTrendData); ///// Data từ backend
      }
    } catch (error) {
      return error.response.data
      ? error.response.data
      : { success: false, message: "server error" };
    }
  }, []);

  
  return (
    <div className="pressure-chart-container">
        <h2 className='label-level-chart'>Pressure Value</h2>
    <AreaChart width={730} height={250} data={trendList}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="10%" stopColor="#bb371a" stopOpacity={2.2}/>
      <stop offset="90%" stopColor="#8884d8" stopOpacity={0.8}/>
      
    </linearGradient>
  </defs>
  <XAxis dataKey="dateCreated"  />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="value" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
    </div>
  
    
  );
}