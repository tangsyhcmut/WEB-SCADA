import {useState,Component} from 'react'
import greenlightoff from '../img/Off_Green.png';
import greenlighton from '../img/On_Green.png';
import redlightoff from '../img/Off_Red.png';
import redlighton from '../img/On_Red.png';
import {
    Container, Col, Form,
    FormGroup, Label, Input,Button
   
  } from 'reactstrap';
    import './PumpPop.css'
  import Select from 'react-select'

  

function PumpPop(props) {


    const [stateP1,setStateP1] = useState(
      {auto:false,man:false,start:false,stop:false});
    const btnAutoClick=()=> setStateP1({auto:true,man:false,start:false,stop:false});
    const btnManClick=()=> setStateP1({auto:false,man:true,start:false,stop:false});
    const btnStartClick =()=>setStateP1({auto:false,man:true,start:true,stop:false});
    const btnStopClick =()=>setStateP1({auto:false,man:true,start:false,stop:true});
    const btnResetClick =()=>setStateP1({auto:false,man:false,start:false,stop:false});
    console.log(stateP1)
    
    const selectMode =(e)=>{
      if(e.target.value === 'Man')
    {
      setStateP1({auto:false,man:true,start:false,stop:false});
    }
    else
    setStateP1({auto:true,man:false,start:false,stop:false})};
     
      
    

    const[bit,setbit] =useState(false)
    return (
        <Container className='pumppop'>
     

        <Form >
        <div className='select-mode'>
          <Col >
            <FormGroup>
              <Label>Mode :</Label>
              <Input className='pump-select-mode' type="select" name="Mode" id="modeSelect" onChange={selectMode}>
             <option>Auto</option>
             <option>Man</option>
             </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
            <div className="pump-controlbtn">
                <Label>Control : </Label>
                <Button className='btnstart' onClick={btnStartClick} disabled ={!stateP1.man}>Start</Button>
                <Button className='btnstop' onClick={btnStopClick} disabled ={!stateP1.man}>Stop</Button> 
                <Button className='btnreset' onClick ={btnResetClick}>Reset</Button>
                </div>
            </FormGroup>
          </Col>
          </div>
          <Col>
            <FormGroup>
            <div className='pump-status'>
              <Label>Running Time</Label>
              <div className='pumplight'>
              <Label> Status </Label>
            <img className="pump-status-light" src ={bit ? greenlighton : greenlightoff}/>
             <Label> Fault </Label>
            <img className="pump-fault-light" src ={bit ?  redlighton : redlightoff } />
              </div>
            
             </div>
            </FormGroup>
          </Col>
          <Col>
          <div className='pump-set'>
            <FormGroup>
            
              <Label>Set speed</Label>
              <Input placeholder="0.00%" />
            </FormGroup>
            <FormGroup>
              <Label>Status</Label>
              
            </FormGroup>
            </div>
          </Col>
         
        </Form>
      </Container>
    )
}

export default PumpPop
