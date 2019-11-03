import React, {Component} from 'react';
import { Navigation } from "../components/Navigation";
import apiKey from '../apiKey';
import SearchResult from "../components/SearchResult";
import GoogleMapReact from 'google-map-react';
import {Col, Row} from "react-bootstrap";

class SearchResultsPage extends Component {
    state = {
        done: false,
        listings: []
    };

    lat = 37.219366;
    lon = -93.285162;
    limit = 16093.44; // 10 miles in meters

    getApiData = async function() {
        const response = await fetch("https://jobs.api.sgf.dev/api/job?api_token=" + apiKey.hack4good);
        const json = await response.json();

        const validLocations = [];

        for (let job of json.data) {
            let added = false; // if the job has been added to the list
            for (let loc of job.locations.data) {
                let R = 6371e3; // metres
                let lat1rads = this.lat * (Math.PI / 180);
                let lat2rads = loc.lat * (Math.PI / 180);
                let deltaLat = (loc.lat - this.lat) * (Math.PI / 180);
                let deltaLon = (loc.lng - this.lon) * (Math.PI / 180);

                let a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                    Math.cos(lat1rads) * Math.cos(lat2rads) *
                    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                loc["distance"] = R * c;

                if (loc["distance"] <= this.limit && !added) {
                    added = true;
                    validLocations.push(job);
                }
            }

            if (added) {
                job.locations.data.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
            }
        }

        validLocations.sort((a, b) => (a.locations.data[0].distance > b.locations.data[0].distance) ? 1 : -1);

        this.setState({listings: validLocations, done: true});
    };

    componentDidMount() {
        this.getApiData();
    }

    render() {
        if (this.state.done) {
            let elems = [];
            let mapElems = [];
            for (let i = 0; i < this.state.listings.length; i++) {
                mapElems.push(<a href={"details?id=" + this.state.listings[i].id}
                                 key={"map-item-" + i}
                                 lat={this.state.listings[i].locations.data[0].lat}
                                 lng={this.state.listings[i].locations.data[0].lng}>
                                    <img src={require("../logos/room.svg")}
                                    alt={this.state.listings[i].employer.name} />
                              </a>);
                elems.push(<SearchResult key={this.state.listings[i].id} job={this.state.listings[i]}> </SearchResult>);
            }

            return <div>
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: apiKey.maps}}
                        defaultCenter={{lat: this.lat, lng: this.lon}}
                        yesIWantToUseGoogleMapApiInternals
                        defaultZoom={14}>
                        <img alt="You are here" lat={this.lat} lng={this.lon} src={require("../logos/home.svg")} />
                        {mapElems}
                    </GoogleMapReact>
                </div>
                <div id="resultsList">
                    <Row>
                        <Col xs={10}>
                            <h3 style={{marginBottom: 0}}>Results</h3>
                        </Col>
                        <Col xs={2} id="settingsImage">
                            <a href="settings"><img src={require("../logos/settings_applications-24px.svg")} alt="Settings" /></a>
                        </Col>
                    </Row>

                    {elems}
                </div>
                <Navigation />
            </div>
        } else {
            return <div>
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: apiKey.maps}}
                        defaultCenter={{lat: this.lat, lng: this.lon}}
                        yesIWantToUseGoogleMapApiInternals
                        defaultZoom={14}>
                        <img alt="Your Location" lat={this.lat} lng={this.lon} src={require("../logos/home.svg")} />
                    </GoogleMapReact>
                </div>
                <div id="loadingArea">
                    <h3>Loading results...</h3>
                    <img className="loadingAnim" alt="Loading..." src={require("../logos/loading.gif")} />
                </div>
                <Navigation />
            </div>
        }
    }
}

export default SearchResultsPage;