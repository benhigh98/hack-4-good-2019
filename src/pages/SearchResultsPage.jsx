import React, {Component} from 'react';
import apiKey from '../apiKey';

class SearchResultsPage extends Component {
    state = {
        done: false,
        listings: []
    };

    getApiData = async function() {
        const response = await fetch("https://jobs.api.sgf.dev/api/job?api_token=" + apiKey.hack4good);
        const json = await response.json();

        const lat = 37.219366;
        const lon = -93.285162;
        const limit = 16093.44; // 10 miles in meters

        const validLocations = [];

        for (let job of json.data) {
            let added = false; // if the job has been added to the list
            for (let loc of job.locations.data) {
                let R = 6371e3; // metres
                let lat1rads = lat * (Math.PI / 180);
                let lat2rads = loc.lat * (Math.PI / 180);
                let deltaLat = (loc.lat - lat) * (Math.PI / 180);
                let deltaLon = (loc.lng - lon) * (Math.PI / 180);

                let a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                    Math.cos(lat1rads) * Math.cos(lat2rads) *
                    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                loc["distance"] = R * c;

                if (loc["distance"] <= limit && !added) {
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
            for (let i = 0; i < this.state.listings.length; i++) {
                elems.push(<div key={i}>{this.state.listings[i]["employer"]["name"]} - {this.state.listings[i]["title"]} - {this.state.listings[i].locations.data[0].lat}, {this.state.listings[i].locations.data[0].lng} - {this.state.listings[i].locations.data[0].distance * 0.000621371} miles<hr /></div>)
            }

            return <div>
                {elems}
            </div>
        } else {
            return <div>
                <p>Loading...</p>
            </div>
        }
    }
}

export default SearchResultsPage;