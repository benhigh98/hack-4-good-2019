import React, {Component} from 'react';
import { Navigation } from "../components/Navigation";
import apiKey from '../apiKey'
import { Container, Row, Col } from 'react-bootstrap';

function DetailsPage(props) {

    let iframe = "https://www.google.com/maps/embed/v1/place?q=" + props.lat + "," + props.long+"&key=" + apiKey.maps;

    return(
         <div>
             <Container fluid>
                 <Row className="">
                     <Col className="p-0">
                         <iframe className="w-100" id="map" src={iframe}></iframe>
                     </Col>
                 </Row>
             </Container>

             <Container>
                 <Row>
                     <Col><Row><img className="nomarg" src={require('../logos/walk.svg')} /></Row><Row><p className="nomarg">0.0</p></Row></Col>
                     <Col><Row><img className="nomarg" src={require('../logos/car.svg')} /></Row><Row><p className="nomarg">0.0</p></Row></Col>
                     <Col><Row><img className="nomarg" src={require('../logos/bike.svg')} /></Row><Row><p className="nomarg">0.0</p></Row></Col>
                     <Col><Row><img className="nomarg" src={require('../logos/bus.svg')} /></Row><Row><p className="nomarg">0.0</p></Row></Col>
                 </Row>
                 <Row className="topPad">
                     <Col>
                         <h2>Job title</h2>
                         <h5>Employer</h5>
                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                             et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                             aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                             cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                             culpa qui officia deserunt mollit anim id est laborum.</p>
                     </Col>
                 </Row>
             </Container>

             <Navigation/>
         </div>

    );
}

export default DetailsPage;