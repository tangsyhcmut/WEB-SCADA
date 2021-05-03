import {useState,Component} from 'react'
import greenlightoff from '../img/Off_Green.png';
import greenlighton from '../img/On_Green.png';
import redlightoff from '../img/Off_Red.png';
import redlighton from '../img/On_Red.png';
import {
    Container, Col, Form,
    FormGroup, Label, Input,Button,Row
   
  } from 'reactstrap';
    import './ValvePop.css'
  import Select from 'react-select'
//   import './App.css';
  

function ValvePop() {


    const [stateV1,setStateV1] = useState({auto:false,man:false,start:false,stop:false});
    const btnAutoClick=()=> setStateV1({auto:true,man:false,start:false,stop:false});
    const btnManClick=()=> setStateV1({auto:false,man:true,start:false,stop:false});
    const btnStartClick =()=>setStateV1({auto:false,man:true,start:true,stop:false});
    const btnStopClick =()=>setStateV1({auto:false,man:true,start:false,stop:true});
    const btnResetClick =()=>setStateV1({auto:false,man:false,start:false,stop:false});
    console.log(stateV1)
    

    const[bit,setbit] =useState(false)
    return (
        <Container>
     

        <Form className='valvepop'>
        <Row form>
          <div className='select-mode'>
          <Col >
            <FormGroup >
            
              <Label>Mode :</Label>
              <Input className='valve-select-mode' type="select" name="Mode" id="modeSelect">
              <option>Auto</option>
              <option>Man</option>
             </Input>
             
             
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
            <div className="controlbtn">
                <Label>Control : </Label>
                <Button className='btnopen'  onClick={btnStartClick} disabled ={!stateV1.man}>Open</Button> {' '}
                <Button className='btnclose' onClick={btnStopClick} disabled ={!stateV1.man}>Close</Button> 
                <Button className='btnreset' onClick ={btnResetClick}>Reset</Button>
              </div>
            </FormGroup>
          </Col>
          </div>
          <div className="valve-running">
          <Col>
            <Label>Running Time</Label>
            <FormGroup>
                
              <Label>Position</Label>
              <Input placeholder="0.00%" />
            </FormGroup>
            
          </Col>
          </div>
          
        </Row>
        <Row form>
          <Col>
            <FormGroup>
            <div className='valve-status-light'>
            <Label> High limit </Label>
            <img className="valvehighlight" src ={bit ?  redlighton : redlightoff } />
            <Label>Low limit </Label>
            <img className="valvelowlight" src ={bit ?  redlighton : redlightoff } />


            <Label>Opened</Label>
            <img className="valveopenlight" src ={bit ? greenlighton : greenlightoff}/>
             <Label>Closed</Label>
            <img className="valvecloselight" src ={bit ? greenlighton : greenlightoff}/>


             <Label> Fault </Label>
            <img className="valvefaultlight" src ={bit ?  redlighton : redlightoff } />
             </div>
            </FormGroup>
          </Col>
        </Row>
         
        </Form>
      </Container>
    )
}

export default ValvePop
