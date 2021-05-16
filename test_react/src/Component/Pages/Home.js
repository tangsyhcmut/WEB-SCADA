import React from 'react'
import '../../App.css';
import MainSection from '../MainSection/MainSection2';
import ControlSection from '../ControlSection/ControlSection';

import NotiTable from'../NotiSection/NotiTable';
import Footer from '../Footer/Footer';
import{Container,Row,Col} from 'reactstrap';
import StatusData from '../StatusSection/StatusData';

function Home() {

   

    return (
        <div>
            <Container>
            <MainSection/>


            <Row>
            <StatusData/>
            </Row>


            <Footer/>
            </Container>
            
        </div>
    )
}
export default Home
