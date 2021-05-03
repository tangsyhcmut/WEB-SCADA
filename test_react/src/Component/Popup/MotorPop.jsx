import {useState,Component} from 'react'
import {
    Container, Col, Form,
    FormGroup, Label, Input,Button
   
  } from 'reactstrap';
import './MotorPop.css'
  import Select from 'react-select'
//   import './App.css';
  

function Motor_1_Pop() {

    const [stateM1,setStateM1] = useState({auto:false,man:false,start:false,stop:false});
    const btnAutoClick=()=> setStateM1({auto:true,man:false,start:false,stop:false});
    const btnManClick=()=> setStateM1({auto:false,man:true,start:false,stop:false});
    const btnStartClick =()=>setStateM1({auto:false,man:true,start:true,stop:false});
    const btnStopClick =()=>setStateM1({auto:false,man:true,start:false,stop:true});
    const btnResetClick =()=>setStateM1({auto:false,man:false,start:false,stop:false});
    console.log(stateM1)
    
    return (
        <Container className='motorpop'>
     

        <Form >
          <div className='select-mode'>
          <Col>
            <FormGroup>
            <Label>Mode :</Label>
              <Input className='motor-select-mode' type="select" name="Mode" id="modeSelect">
             <option>Auto</option>
             <option>Man</option>
             </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
            <div className="controlbtn">
                <Label>Control : </Label>
                <Button className='btnstart' onClick={btnStartClick} disabled ={!stateM1.man}>Start</Button>
                <Button className='btnstop' onClick={btnStopClick} disabled ={!stateM1.man}>Stop</Button> 
               
                </div>
            </FormGroup>
          </Col>
          </div>
          
          <Col>
          <div className="motor-status">
          <FormGroup>
              <Label>Running Time</Label>
            </FormGroup>
          </div>
            
          </Col>
         
        </Form>
      </Container>
    )
}

export default Motor_1_Pop
