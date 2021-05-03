import {useState}  from 'react'
// import '../../App.css';
import MotorPop from '../Popup/MotorPop';
import PumpPop from '../Popup/PumpPop';
import ValvePop from '../Popup/ValvePop';
import Popup from '../Popup/Popup';
import IMG from '../img/On_Red.png'
import TextApi from '../../api/TextApi'
import Temperature from '../TemperatureSection/Temperature'
import PowerData from '../ElectricPower/PowerData'
function Security() {
    const [openPopup, setOpenPopup] = useState(false)

    return (
        <div>
            {/* <h1>Security</h1>
           
            <TextApi/>
            <img src={IMG} onClick={() =>  setOpenPopup(true)}/> */}

            {/* <Popup
                title="Motor 1"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <MotorPop/>
            </Popup> */}
            {/* <Popup
                title="Motor 1"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <MotorPop/>
            </Popup> */}
            <PowerData/>
            <Temperature/>
        </div>
    )
}

export default Security
