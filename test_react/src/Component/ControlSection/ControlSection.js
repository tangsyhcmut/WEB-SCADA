import {useState} from 'react';
import './ControlSection.css';
// import {Button} from '../Button/Button';
import {Col,Container,Row, Button,FormGroup } from 'reactstrap';
function ControlSection() {
    const [state,setState] = useState({auto:false,man:false,start:false,stop:false});
    const btnAutoClick=()=> setState({auto:true,man:false,start:false,stop:false});
    const btnManClick=()=> setState({auto:false,man:true,start:false,stop:false});
    const btnStartClick =()=>setState({auto:false,man:true,start:true,stop:false});
    const btnStopClick =()=>setState({auto:false,man:true,start:false,stop:true});
    const btnResetClick =()=>setState({auto:false,man:false,start:false,stop:false});
    console.log(state)
    return (
        <>
        <Container className='control-sys'>
                <h2 className='title-sys'> CONTROL   SYSTEM </h2>
            
            <Row>
                <FormGroup className='line1'>
            <Button  className= 'btn-sys-auto' onClick={btnAutoClick}>Auto</Button>{''}
            <Button  className='btn-sys-reset' onClick ={btnResetClick}>Reset</Button>
           
                 </FormGroup>
            </Row>   
            <Row>
                <FormGroup>
                    <div className='line2'>
                    <Button  className='btn-sys-man' onClick={btnManClick}>Man</Button>
           <Button  className='btn-sys-start' onClick={btnStartClick} disabled ={!state.man}>Start</Button>
           <Button  className='btn-sys-stop' onClick={btnStopClick} disabled ={!state.man}>Stop</Button>
                    </div>
           
                </FormGroup>
                
           </Row>  
           </Container>
        </>
    )
}

export default ControlSection

