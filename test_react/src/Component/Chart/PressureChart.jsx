

import React, { useEffect, useState,useRef } from "react";
// import {
//   Bar, BarChart,
//   CartesianGrid,
//   Legend, Tooltip, XAxis,Label,Area,AreaChart, LineChart
//   YAxis
// } from "recharts";
// import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={trendList}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="P1" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="P2" stroke="#82ca9d" />
          <Line yAxisId="right" type="monotone" dataKey="P3" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  
    
  );
}