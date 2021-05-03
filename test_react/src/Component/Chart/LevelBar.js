
import {useState} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";

export default function App(props) {
  
  const [data,setData] =useState([]);
  const setValue =(e) =>{
  setData([{pv:props.value}])
    console.log(data);
  }


  return (
    <div className='barContainer'>
    <button onClick={setValue}>Set</button>
    <BarChart
      width={105}
      height={props.height}
      data={data}
     
     > 
      <CartesianGrid horizontal ={false} vertical={false} />
      {/* <XAxis  hide={true} /> */}
      <YAxis domain ={[0,props.maxValue]} unit ='m'/>
      <Tooltip />
      <Legend iconSize = '10' align='right'/>
      
      <Bar dataKey='pv' name='Level' fill="#3742fa" background={{ fill: "#eee" }}>
      <LabelList dataKey="pv" position="top" fontSize="12"/>
      </Bar>
    </BarChart>
    </div>
  );
}
