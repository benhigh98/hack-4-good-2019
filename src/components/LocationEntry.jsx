import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import JobsLogo from '../Icons/Workforce2019LogoMoJobs'
import { google, withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import { geolocated } from "react-geolocated";
import '../App.css'
import apiKey from '../apiKey';

class LocationEntry extends React.Component {

    constructor (props){
        super(props);

        this.sendCurrentLocation = this.sendCurrentLocation.bind(this);
        this.sendAddress = this.sendAddress.bind(this);
    }

    getLatAndLong = async function(){
        console.log(document.getElementById("address").value);
        const googleResponse = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + document.getElementById("address").value + "&key=" + apiKey.maps);
        const googleJson = await googleResponse.json();
        let address = {};
        if (googleJson["results"].length > 0) {
            address["lat"] = googleJson["results"][0]["geometry"]["location"]["lat"];
            address["lng"] = googleJson["results"][0]["geometry"]["location"]["lng"];
        }
        return address;
    }

    getAddressFromCoords = async function(){
        const googleResponse = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            this.props.coords.latitude +"," + this.props.coords.longitude
            + "&sensor=true&key=" + apiKey.maps);
        const googleJson = await googleResponse.json();
        console.log(googleJson);
        let address = {};
        if (googleJson["results"].length > 0) {
            address["addr"] = googleJson["results"][0]["formatted_address"];
        }
        if(address.addr !== undefined){
            return address.addr;
        }else{
            return "";
        }
    }


    sendAddress = async function() {
        let address = await this.getLatAndLong();
        const elem = document.getElementById("address").value;
        const locationObj = { "address" : elem.toString(),
            "latitude" : address.lat,
            "longitude" : address.lng};
        localStorage.setItem('userLocation', JSON.stringify(locationObj));
        window.location.href = "/results";
    }

    sendCurrentLocation = async function() {
        const address = await this.getAddressFromCoords();
        const locationObj = { "address" : address,
                                "latitude" : this.props.coords.latitude,
                                "longitude" : this.props.coords.longitude};
        localStorage.setItem('userLocation', JSON.stringify(locationObj));
        window.location.href = "/results";
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className='logo-column'>
                            <div className='jobs-logo text-center'>
                                <JobsLogo/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className='jobs-text text-center'>CHOOSE ADDRESS FOR JOB SEARCH</h1>
                            <div className='d-flex'>
                                <Button onClick={this.sendCurrentLocation} variant="primary" size="lg" block className='mx-auto current-location-btn'>Use
                                    my current location</Button>
                            </div>
                            <div className='separator d-flex'>OR</div>
                            <Form>
                                <Form.Group controlId="formAddress">
                                    <InputGroup className='mx-auto autocomplete-holder' >
                                        <Autocomplete
                                            className='autocomplete-box'
                                            id="address"
                                            type="text"
                                            placeholder="Enter Address"
                                            aria-describedby="inputGroupAppend"
                                        />
                                        <InputGroup.Append>
                                            <Button onClick={this.sendAddress} variant='primary'>
                                                Search
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(LocationEntry);