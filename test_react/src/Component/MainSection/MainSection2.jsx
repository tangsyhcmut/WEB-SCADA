import React from 'react'
import {Button} from 'reactstrap';
import './MainSection2.css';
// Status
import Status from '../StatusSection/StatusForm'
//Bể Lắng
import  FeedTank from '../img/Tank_1.png';
import  PressureTank from '../img/Tank_2.svg';
import  RawTank from '../img/Tank_4.svg';

// Pipes
import Pipe_hori from '../img/Pipes_horizontal.png';
import Pipe_alight from '../img/Pipes_alight.png';
import Pipe_RB from '../img/Pipes_RB.png';
import Pipe_RT from '../img/Pipes_RT.png';
import Pipe_LT from '../img/Pipes_LT.png';
import Pipe_LB from '../img/Pipes_LB.png';
import Pipe_fork from '../img/Pipe_fork.png';
import Pipe_fork_down from '../img/Pipe_fork_down.png';
import Pipe_angle from '../img/Pipe_angle.svg';

import Pipe_fork_alight_right from '../img/Pipe_fork_alight_right.svg';
import Pipe_fork_alight_left from '../img/Pipe_fork_alight_left.png';
// Pump
import Pump from '../img/Pump.png';
import Pump_alight from '../img/Pump_alight.svg';
// Valve
import Valve_hori from '../img/Hand valve 2.png';
// Level bar
import Level from '../Chart/LevelBar'



function MainSection2() {
    return (
        <div className='mainsection2-container'>
            {/* -------------Status---------------- */}


            <div className="status-section">
             <Status/>
             <Button  className='btn-sys-emer'>EMERGENCY</Button>
            </div>
            {/* -------------------------Tank1-------------- */}
        <div className="tank1-container">
             {/* ----------- Before Tank1-------------------- */}
            
            <div className="before-tank1">

            <img className="pipe1" src ={Pipe_hori}/>
            <img className="pipe2" src ={Pipe_hori}/>
            <img title=" PUMP 1 " className="pump1" src ={Pump}/>
            <img className="pipe3" src ={Pipe_hori}/>
           
                <img title=' VALVE 0 ' className="valve0"  src ={Valve_hori}/>
                
            <img className="pipe5" src ={Pipe_alight}/>
            <img className="pipe4" src ={Pipe_RB}/>
            
            </div>
            {/* ------After Tank1----------- */}
            <div className="after-tank1">

            <img className="pipe6" src ={Pipe_hori}/>
            <img className="pipe8" src ={Pipe_hori}/>
            <img className="pipe10" src ={Pipe_hori}/>
            <img className="pipe9" src ={Pipe_LB}/>
            <img className="pipe7" src ={Pipe_fork}/>
            <img className="pipe11" src ={Pipe_hori}/>
            <img className="pipe12" src ={Pipe_hori}/>
            <img title=" PUMP 2 " className="pump2" src ={Pump}/>
            <img title=" PUMP 3 " className="pump3" src ={Pump}/>
            <img className="pipe15" src ={Pipe_alight}/>
            <img className="pipe16" src ={Pipe_hori}/>
            <img className="pipe13" src ={Pipe_RB}/>
            <img className="pipe14" src ={Pipe_fork}/>
            <img className="pipe18" src ={Pipe_alight}/>
            <img className="pipe17" src ={Pipe_RT}/>
           
            </div>
           {/* -------------Tank1------------ */} 

           <img title=" Feed Tank" className="tank1" src ={FeedTank} />
           <p className='label-tank1' > FEED TANK </p>
           <div className='leveltank1'>
           <Level  value={1.5} maxValue ={3} height ={210}/> 
           </div>
           
          
           

        </div>
        {/* -----------------------Tank2-------------- */}
        <div className="tank2-container">
                {/* ----------beforeTank2------------------ */}
                <img title=" Pressure Tank 1" className='tank2' src={PressureTank}/>
                <p className='label-tank2' > PRESSURE TANK 1 </p>
                <div className="before-tank2">

                    <img className="pipe21" src ={Pipe_hori}/>
                    <img className="pipe22" src ={Pipe_hori}/>
                    <img className="pipe19" src ={Pipe_fork_alight_right}/>
                    <img className="pipe20" src ={Pipe_LB}/>
                    <img className="pipe23" src ={Pipe_hori}/>
                    <img className="pipe24" src ={Pipe_hori}/>
                    
                         <img title=' VALVE 1 ' className="valve1" src ={Valve_hori}/>
                         
                    
                    
                         <img title=' VALVE 2 ' className="valve2"  src ={Valve_hori}/>
                   
                    <img className="pipe25" src ={Pipe_fork_down}/>
                    <img className="pipe26" src ={Pipe_fork_down}/>
                    <img title=' VALVE 3 ' className="valve3" src ={Valve_hori}/>
                    <img title=' VALVE 4 '  className="valve4" src ={Valve_hori}/>
                    <img className="pipe29" src ={Pipe_alight}/>
                    <img className="pipe27" src ={Pipe_RB}/>
                    <img className="pipe28" src ={Pipe_fork_alight_left}/>
              

                    
                    

                </div>
                    {/* ----------afterTank2---------- */}
                <div className="after-tank2">

                    <img className="pipe33" src ={Pipe_hori}/>
                    <img className="pipe30" src ={Pipe_fork}/>
                    <img className="pipe31" src ={Pipe_LB}/>
                    <img className="pipe32" src ={Pipe_angle}/>
                    <img title=' VALVE 5 ' className="valve5" src ={Valve_hori}/>
                    <img className="pipe35" src ={Pipe_alight}/>
                    <img className="pipe34" src ={Pipe_RT}/>
                    
                    

                </div>
                {/* -------LevelTank2----- */}
                    <div className='leveltank2'>
                    <Level  value={1} maxValue ={2} height ={210}/> 
                    </div>

        </div>
        {/* ---------------------------Tank3----------- */}
        <div className='tank3-container'>
            {/* ---Tank3----------- */}
        {/* ----------beforeTank2------------------ */}
        <img title='Pressure Tank 2' className='tank3' src={PressureTank}/>
        <p className='label-tank3' > PRESSURE TANK 2 </p>

            <div className='before-tank3'>
                    <img className="pipe38" src ={Pipe_hori}/>
                    <img className="pipe39" src ={Pipe_hori}/>
                    <img className="pipe36" src ={Pipe_fork_alight_right}/>
                    <img className="pipe37" src ={Pipe_LB}/>
                    <img className="pipe40" src ={Pipe_hori}/>
                     <img className="pipe41" src ={Pipe_hori}/>
                    <img title=' VALVE 6 ' className="valve6" src ={Valve_hori}/>
                    <img title=' VALVE 7 ' className="valve7" src ={Valve_hori}/>
                    <img className="pipe42" src ={Pipe_fork_down}/>
                     <img className="pipe43" src ={Pipe_fork_down}/> 
                      <img title=' VALVE 8 ' className="valve8" src ={Valve_hori}/> 
                     <img title=' VALVE 9 'className="valve9" src ={Valve_hori}/> 
                     <img className="pipe46" src ={Pipe_alight}/>
                    <img className="pipe44" src ={Pipe_RB}/>
                    <img className="pipe45" src ={Pipe_fork_alight_left}/>
            </div>

              {/* ----------afterTank3---------- */}
                <div className="after-tank3">

                    <img className="pipe50" src ={Pipe_hori}/>
                    <img className="pipe47" src ={Pipe_fork}/>
                    <img className="pipe48" src ={Pipe_LB}/>
                    <img className="pipe49" src ={Pipe_angle}/>
                    <img title=' VALVE 10 ' className="valve10" src ={Valve_hori}/>
                    <img className="pipe52" src ={Pipe_alight}/>
                    <img className="pipe51" src ={Pipe_RT}/>
                    

                </div>
                 {/* -------LevelTank3----- */}
                 <div className='leveltank3'>
                    <Level  value={1} maxValue ={2} height ={210}/> 
                </div>


        </div>
        {/* -------------Tank4-------- */}
        <div className="tank4-container">
            {/* ------------Before Tank4--------------------*/}
                <div className="before-tank4">

                <img className="pipe54" src ={Pipe_hori}/>
                <img className="pipe53" src ={Pipe_LB}/>
                <img className="pipe55" src ={Pipe_RB}/>

                </div>
            {/* --------After Tank 4---------- */}
                <div className='after-tank4'>
                <img className="pipe56" src ={Pipe_alight}/>
                <img title=" PUMP 4 " className="pump4" src ={Pump_alight}/>
                </div>
        </div>
           <img title="Raw Tank" className="tank4" src ={RawTank}/>
           <p className='label-tank4' > RAW TANK </p>
            {/* -------LevelTank4----- */}
            <div className='leveltank4'>
                    <Level  value={1} maxValue ={3} height ={210}/> 
            </div>
           
        </div>
    )
}

export default MainSection2
