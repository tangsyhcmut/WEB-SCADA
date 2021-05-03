import './MainSection.css';
//Bể Lắng
import  ClarifierTank from '../img/Tank_1.png';
// Bể nước bù
import RehydrationWaterTank from '../img/Tank_2.png';
// Bể lọc ly tâm
import CentrifugalFilterTank from '../img/Tank_3.png';
// Bể nước sử dụng
import WaterTank from '../img/Tank_4.png';
//Bể hoá chất
import ChemicalTank from  '../img/Tank_5.png';
// Ống nước
import Pipe_hori from '../img/Pipes_horizontal.png';
import Pipe_RB from '../img/Pipes_RB.png';
import Pipe_RT from '../img/Pipes_RT.png';
import Pipe_LT from '../img/Pipes_LT.png';
import Pipe_LB from '../img/Pipes_LB.png';
import Pipe_fork from '../img/Pipes_fork.png';
import Pipe_alight from '../img/Pipes_alight.png';
import Valve_alight0 from '../img/Valve_alight.png';
import Valve_left from '../img/Valve_left.png';
import Valve_alight from '../img/Hand_valve.png'
import Valve_hori from '../img/Valve_horizontal.png';
import Pump from '../img/Pump.png';
import Motor_Mix from '../img/Motor_mixer.png'
// Level Chart
import LevelBar from '../Chart/LevelBar'
// Status
import Status from '../StatusSection/StatusForm'

function MainSection() {
    const handleClick = () => {
        console.log('test')
    }
    return (
        <div className="main-container"> 
          {/*---------------Status------------  */}
        <div className="status-section">
        <Status/>
        </div>
         
        {/* ----------------Trước Bể lắng---------------- */}
         <img className ="clarifierTank" onClick={handleClick} src={ClarifierTank}  alt="Bể Lắng"/>
         <img className='pipe0' src={Pipe_hori} />
         <img className='pipe1' src={Pipe_RB}/>
         <img className='pipe2' src={Pipe_alight}/>
        <img className='valve0' src={Valve_alight0}/>
        <div className='clarifierlevel' >
        <LevelBar className ='clarifierlevel' value={1.5} maxValue ={3} height ={210}/>
        </div>
         {/* -------------------Trước Bể nước bù----------------- */}
         <img className="rehydrationTank" src={ RehydrationWaterTank} alt="Bể nước bù"/>
         <img className='pipe3' src={Pipe_hori}/>
         <div className='rehydrationlevel'>
        <LevelBar className='rehydrationlevel' value={1.5} maxValue ={3} height ={210}/>
        </div>

         {/* -----------Trước Bể lọc ly tâm------- */}
         <img className="filterTank" src={CentrifugalFilterTank} alt="Bể lọc ly tâm"/>
         <img className='pipe4' src={Pipe_hori}/>
         <img className='pipe5' src={Pipe_hori}/>
         <img className='pipe6' src={Pipe_hori}/>
        
         <img className ='pipe8' src={Pipe_alight}/>
         <img className='pipe7' src={Pipe_RB}/>
         <img className='pump0' src={Pump}/>
         <img className ='valve1' src={Valve_hori} />
         <div className='filterlevel'>
        <LevelBar className='filterlevel' value={0.5} maxValue ={1.5} height ={180}/>
        </div>

         {/* ------------Trước Bể hoá chất-------------- */}
         <img className ='pipe18' src={Pipe_alight}/>
         {/* <img className ='pipe19' src={Pipe_alight}/> */}
         <img className ='valve2' src={Valve_left}/>
         <img className='chemicalTank' src={ChemicalTank} alt="Bể hoá chất"/>
         <img className= 'motormix'src={Motor_Mix}/>
         <div className='chemicallevel'>
        <LevelBar className='chemicallevel' value={0.5} maxValue ={1} height ={150}/>
        </div>
         {/* ---------------Trước Bể nước sử dụng------------- */}
         <img className ='pipe9' src={Pipe_alight}/>
         {/* ---Sau Bể bù--- */}
         <img className='pipe10' src={Pipe_hori}/>
         <img className='pipe11' src={Pipe_hori}/>
         <img className='pipe12' src={Pipe_alight}/>
    
         <img className ='pipe14' src={Pipe_alight}/>
         <img className='pipe13' src={Pipe_RT}/>
         <img className='pipe16' src={Pipe_hori}/>
         <img className='pipe15' src={Pipe_LB}/>
         <img className='pipe17' src={Pipe_RB}/>
         <img className='pump1' src={Pump}/>
         <img className ='valve3' src={Valve_hori} />
         {/* ------Sau bể hoá chất------- */}
         <img className ='pipe20' src={Pipe_alight}/>
         <img className='pipe22' src={Pipe_hori}/>
         <img className='pipe21' src={Pipe_RT}/>
         <img className='pipe23' src={Pipe_LB}/>
         <img className ='pipe24' src={Pipe_alight}/>
         <img className ='valve4' src={Valve_alight} />
         <img className='pump2' src={Pump}/>
         
         
         {/* --Sau Bể nước sử dụng-------------- */}
         <img className='pipe25' src={Pipe_hori}/>
         <img className ='pipe27' src={Pipe_alight}/>
         <img className='pipe26' src={Pipe_fork}/>
         <img className='pipe28' src={Pipe_LT}/>
         <img className='pipe29' src={Pipe_hori}/>
         <img className='pipe30' src={Pipe_hori}/>
         <img className='pump3' src={Pump}/>
         <img className='pump4' src={Pump}/>
        

         <img className= 'waterTank' src={WaterTank} alt="Bể nước sử dụng"/>
         <div className='waterlevel'>
        <LevelBar className='waterlevel' value={2} maxValue ={5} height ={320}/>
        </div>
         
         
        </div>
    )
}

export default MainSection
