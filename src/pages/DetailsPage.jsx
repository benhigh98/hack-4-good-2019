import { Navigation } from "../components/Navigation";
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import apiKey from '../apiKey';

// Extract employer name, id, title, locations
// var testJob = JSON.parse('{"data":[{"id":1,"date_posted":"2019-10-20","date_updated":"2019-11-01","date_expires":"2019-11-11","employer_id":15,"employer":{"id":15,"name":"Ankunding Ltd","category":"Ameliorated 24hour emulation","naics":362688,"created_at":"2019-11-01T22:21:09.000000Z","updated_at":"2019-11-01T22:21:09.000000Z"},"locations":{"data":[{"id":51,"name":"Professional Answering Service, Inc.","street":"3861 S. Jefferson","city":"Springfield","state":"MO","zipcode":"65807","created_at":"2019-11-01T22:21:25.000000Z","updated_at":"2019-11-01T22:21:25.000000Z"},{"id":52,"name":"Creekside at Elfindale Retirement Community","street":"1601 S. Fort","city":"Springfield","state":"MO","zipcode":"65807","created_at":"2019-11-01T22:21:25.000000Z","updated_at":"2019-11-01T22:21:25.000000Z"},{"id":53,"name":"Central Trust Company","street":"3333 S. National, 3rd Floor","city":"Springfield","state":"MO","zipcode":"65807","created_at":"2019-11-01T22:21:25.000000Z","updated_at":"2019-11-01T22:21:25.000000Z"}],"links":{"self":"\\/api\\/location"}},"title":"Outdoor Power Equipment Mechanic","job_id":668834,"pay_rate":"$55,000 per year","data_source":"Hack 4 Good Springfield","data_site":"hack4goodsgf.com","url":"https:\\/\\/hack4goodsgf.com\\/projects\\/workforce\\/?job=668834","fake":1,"created_at":"2019-11-01T22:21:21.000000Z","updated_at":"2019-11-01T22:21:21.000000Z"}]}');

function jobExtract(jobObj) {
    var obj = new Object();


    obj.employerName = jobObj.data[0]["employer"]["name"];
    obj.jobId = jobObj.data[0]["job_id"];
    obj.jobTitle = jobObj.data[0]["title"];

    return obj
}

function favoriteJob(jobJSON) {
    var favoritesList = localStorage.getItem('favorites');

    if (favoritesList === null) {
        favoritesList = JSON.stringify([jobJSON]);
        localStorage.setItem('favorites', favoritesList);
    }

    else {
        favoritesList = JSON.parse(favoritesList);
        // If the job is already favorited, do nothing
        if (JSON.stringify(favoritesList).includes(JSON.stringify(jobJSON))) {
            void(0)
        }
        // Otherwise add it to the end of the string
        else {
            favoritesList.push(jobJSON);
            localStorage.setItem('favorites', JSON.stringify(favoritesList));
        }
    }
}

function unfavoriteJob(jobJSON) {
    var favoritesList = localStorage.getItem('favorites');

    if (favoritesList.includes(JSON.stringify(jobJSON))) {
        favoritesList = favoritesList.replace([JSON.stringify(jobJSON)],'');
        localStorage.setItem('favorites', favoritesList);
    }
}

// async function needs a callback to some function that updates your UI or does
// a thing with the data
async function getTravelTimes(jobObj) {
    // key:curLocation
    // value: Street Address City State (eg. 900 North Benton Ave Springfield MO)
    var home = localStorage.getItem('userLocation');

    var obj = new Object();
    obj.timeByCar = "";
    obj.timeByBus = "";
    obj.timeByBike = "";
    obj.timeByFoot = "";

    // Locations are sorted such that the closest is at the front of the list,
    // so we can simply grab its street and construct a string acceptable for GMaps API.
    var jobLocation = jobObj.data[0]["locations"]["data"][0]["street"] + " " +
        jobObj.data[0]["locations"]["data"][0]["city"] + " " +
        jobObj.data[0]["locations"]["data"][0]["state"];

    const driveResponse = await fetch(`http://maps.googleapis.com/maps/api/distancematrix/json?origins={home}&destinations={jobLocation}&key={apiKey.maps}`)
    const driveTimeObj = await driveResponse.json();
    obj.timeByCar = driveTimeObj.rows[0]["elements"][0]["duration"]["text"];

    const busResponse = await fetch(`http://maps.googleapis.com/maps/api/distancematrix/json?origins={home}&destinations={jobLocation}&mode=transit&key={apiKey.maps}`)
    const busTimeObj = await busResponse.json();
    obj.timeByBus = busTimeObj.rows[0]["elements"][0]["duration"]["text"];

    const bikeResponse = await fetch(`http://maps.googleapis.com/maps/api/distancematrix/json?origins={home}&destinations={jobLocation}&mode=bicycling&key={apiKey.maps}`)
    const bikeTimeObj = await bikeResponse.json();
    obj.timeByBike = bikeTimeObj.rows[0]["elements"][0]["duration"]["text"];

    const footResponse = await fetch(`http://maps.googleapis.com/maps/api/distancematrix/json?origins={home}&destinations={jobLocation}&mode=walking&key={apiKey.maps}`)
    const footTimeObj = await footResponse.json();
    obj.timeByFoot = footTimeObj.rows[0]["elements"][0]["duration"]["text"];
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