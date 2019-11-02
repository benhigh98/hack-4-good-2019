import React, {Component} from 'react';
import { Navigation } from "../components/Navigation";
import apiKey from '../apiKey'
import { Container, Row, Col } from 'react-bootstrap';

// Extract employer name, id, title, locations
// var testJob = JSON.parse('{"data":[{"id":1,"date_posted":"2019-10-20","date_updated":"2019-11-01","date_expires":"2019-11-11","employer_id":15,"employer":{"id":15,"name":"Ankunding Ltd","category":"Ameliorated 24hour emulation","naics":362688,"created_at":"2019-11-01T22:21:09.000000Z","updated_at":"2019-11-01T22:21:09.000000Z"},"locations":{"data":[{"id":51,"name":"Professional Answering Service, Inc.","street":"3861 S. Jefferson","city":"Springfield","state":"MO","zipcode":"65807","created_at":"2019-11-01T22:21:25.000000Z","updated_at":"2019-11-01T22:21:25.000000Z"},{"id":52,"name":"Creekside at Elfindale Retirement Community","street":"1601 S. Fort","city":"Springfield","state":"MO","zipcode":"65807","created_at":"2019-11-01T22:21:25.000000Z","updated_at":"2019-11-01T22:21:25.000000Z"},{"id":53,"name":"Central Trust Company","street":"3333 S. National, 3rd Floor","city":"Springfield","state":"MO","zipcode":"65807","created_at":"2019-11-01T22:21:25.000000Z","updated_at":"2019-11-01T22:21:25.000000Z"}],"links":{"self":"\\/api\\/location"}},"title":"Outdoor Power Equipment Mechanic","job_id":668834,"pay_rate":"$55,000 per year","data_source":"Hack 4 Good Springfield","data_site":"hack4goodsgf.com","url":"https:\\/\\/hack4goodsgf.com\\/projects\\/workforce\\/?job=668834","fake":1,"created_at":"2019-11-01T22:21:21.000000Z","updated_at":"2019-11-01T22:21:21.000000Z"}]}');

function jobExtract(jobObj) {
    var obj = new Object();
    obj.employerName = jobObj.data[0]["employer"]["name"];
    obj.jobId = jobObj.data[0]["job_id"];
    obj.jobTitle = jobObj.data[0]["title"];
    obj.jobLocations = [];

    var i;
    for (i = 0; i < jobObj.data[0]["locations"]["data"].length; i++) {
        obj.jobLocations.push(jobObj.data[0]["locations"]["data"][i]["street"]);
    }

    var out = JSON.stringify(obj) + "[eoe]";

    return out;
}

function favoriteJob(jobJSON) {
    var favoritesList = localStorage.getItem('favorites');

    if (favoritesList === null) {
        favoritesList = "";
        favoritesList = favoritesList.concat(jobJSON);
        localStorage.setItem('favorites', favoritesList);
    }

    else {
        // If the job is already favorited, do nothing
        if (favoritesList.includes(jobJSON)) {
            void(0)
        }
        // Otherwise add it to the end of the string
        else {
            favoritesList = favoritesList.concat(jobJSON);
            localStorage.setItem('favorites', favoritesList);
        }
    }
}

function unfavoriteJob(jobJSON) {
    var favoritesList = localStorage.getItem('favorites');

    if (favoritesList.includes(jobJSON)) {
        favoritesList = favoritesList.replace(jobJSON,'');
        localStorage.setItem('favorites', favoritesList);
    }
}

function DetailsPage(props) {

    let iframe = "https://www.google.com/maps/embed/v1/place?q=" + props.lat + "," + props.long + "&key=" + apiKey.maps;

    return (
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
                    <Col><Row><img className="nomarg" src={require('../logos/walk.svg')}/></Row><Row><p
                        className="nomarg">0.0</p></Row></Col>
                    <Col><Row><img className="nomarg" src={require('../logos/car.svg')}/></Row><Row><p
                        className="nomarg">0.0</p></Row></Col>
                    <Col><Row><img className="nomarg" src={require('../logos/bike.svg')}/></Row><Row><p
                        className="nomarg">0.0</p></Row></Col>
                    <Col><Row><img className="nomarg" src={require('../logos/bus.svg')}/></Row><Row><p
                        className="nomarg">0.0</p></Row></Col>
                </Row>
                <Row className="topPad">
                    <Col>
                        <h2>Job title</h2>
                        <h5>Employer</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore
                            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                            esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                            in
                            culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Col>
                </Row>
            </Container>

            <Navigation/>
        </div>
    )
}

export default DetailsPage;