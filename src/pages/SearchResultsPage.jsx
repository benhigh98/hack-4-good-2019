import React, {Component} from 'react';
import { Navigation } from "../components/Navigation";
import apiKey from '../apiKey';

class SearchResultsPage extends Component {
    state = {
        done: false,
        listings: []
    };

    getApiData = async function() {
        const response = await fetch("https://jobs.api.sgf.dev/api/job?api_token=" + apiKey.hack4good);
        const json = await response.json();

        for (let listing of json.data) {
            for (let address of listing.locations.data) {
                let addr = (address.street + " " + address.city + " " + address.state).replace(" ", "+");
                const googleResponse = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + escape(addr) + "&key=" + apiKey.maps);
                const googleJson = await googleResponse.json();
                if (googleJson["results"].length > 0) {
                    address["lat"] = googleJson["results"][0]["geometry"]["location"]["lat"];
                    address["lng"] = googleJson["results"][0]["geometry"]["location"]["lng"];
                }
            }
        }

        this.setState({listings: json.data, done: true});
    };

    componentDidMount() {
        this.getApiData();
    }

    render() {
        if (this.state.done) {
            let elems = [];
            for (let i = 0; i < this.state.listings.length; i++) {
                elems.push(<div key={i}>{this.state.listings[i]["employer"]["name"]} - {this.state.listings[i]["title"]} - {this.state.listings[i].locations.data[0].lat}, {this.state.listings[i].locations.data[0].lng}</div>)
            }

            return <div>
                {elems}
                <Navigation />
            </div>
        } else {
            return <div>
                <p>Loading...</p>
            </div>
        }
    }

}

export default SearchResultsPage;