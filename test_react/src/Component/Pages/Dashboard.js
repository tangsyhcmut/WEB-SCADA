import React from 'react'
import {
    Container, Col, Form,
    FormGroup, Label, Row   
  } from 'reactstrap';

import './Dashboard.css'
import MultiLevel from '../Chart/MultiLevelChart';
import MotorChart from '../Chart/PumpChart';

function Dashboard() {
    return (
        <Container className='dashboard'>
            <Row className="multilevel" >
                <MultiLevel/>
            </Row>
            <Row className="motorchart">
                <MotorChart/>
            </Row>
        </Container>
        
    )
}

export default Dashboard
