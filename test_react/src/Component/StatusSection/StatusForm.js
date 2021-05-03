import greenlightoff from '../img/Off_Green.png';
import greenlighton from '../img/On_Green.png';
import redlightoff from '../img/Off_Red.png';
import redlighton from '../img/On_Red.png';
import yellowlightoff from '../img/Off_Yellow.png';
import yellowlighton from '../img/On_Yellow.png';
import {useState} from 'react'
import './Status.css'
import {Container,Row,Col,Label,Button} from 'reactstrap';

function StatusForm() {
    const[bit,setBit] =useState(false);
    const handleBit = () => setBit(!bit);
    return (
        <Container className='statusForm'>
            <h2 className='titleStatus'> SYSTEM STATUS </h2>
            <Row>
        <div className="status-light" >
            
            <Label> Error </Label>
            <img className="redlight" src ={bit ?  redlighton : redlightoff } />
        
            
            <Label> Warning </Label>
            <img className="yellowlight" src ={bit ? yellowlighton : yellowlightoff}/>
           

            
            <Label> Running </Label>
            <img className="greenlight" src ={bit ? greenlighton : greenlightoff}/>
            
        </div>
            </Row>
            <Row>
            <t className='system-mode'>Running Mode :</t> 
            <Button  className='btn-sys-emer'>EMERGENCY</Button>
            </Row>
           
        </Container>
    )
}

export default StatusForm
