
import { useEffect, useState } from "react";
import {
  Bar, BarChart,



  CartesianGrid,


  LabelList, Legend, Tooltip, YAxis
} from "recharts";

export default function App(props) {

  const [data,setData] =useState([]);

  useEffect(() => {
   
    setData([{pv:props.value}])
    console.log(data)
}, [props.value]);
  
 
 
  


  return (
    <div className='barContainer'>
    
    <BarChart
      width={100}
      height={props.height}
      data={data}
     
     > 
      <CartesianGrid horizontal ={false} vertical={false} />
      {/* <XAxis  hide={true} /> */}
      <YAxis domain ={[0,props.maxValue]} unit ='m' fontSize ='12' />
      <Tooltip />
      <Legend iconSize = '0' align='right' fontSize="5"/>
      
      <Bar dataKey="pv" name=' ' fill="#3742fa" background={{ fill: "#eee" }}>
      <LabelList dataKey="pv" position="top" fontSize="13" fontWeight="bold"/>
      </Bar>
    </BarChart>
    </div>
  );
}
