import {useState}  from 'react'
import './PT.css';
import {
    Container, Col, Form,
    FormGroup, Label, Row   
  } from 'reactstrap';
import MotorPop from '../Popup/MotorPop';
import PumpPop from '../Popup/PumpPop';
import ValvePop from '../Popup/ValvePop';
import Popup from '../Popup/Popup';
import IMG from '../img/On_Red.png'
import TextApi from '../../api/TextApi'
import Temperature from '../TemperatureSection/Temperature'
import PowerData from '../ElectricPower/PowerData'


PowerandTem.propTypes = {};


function PowerandTem() {
    const [openPopup, setOpenPopup] = useState(false)
   

    return (
        <Container className="PTcontainer">
            {/* <h1>PowerData</h1>
           
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
            <Col className="power-container">
            <PowerData/>
            </Col>
            <Col className="temperature-container">
            <Temperature/>
            
            </Col>
            
        </Container>
    )
}

export default PowerandTem
