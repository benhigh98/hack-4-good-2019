import React, {Component} from 'react';
import { Navigation } from "../components/Navigation";
import apiKey from "../apiKey";
import Card from 'react-bootstrap/Card'

function sortByDate(a,b){
    return new Date(a.date_begin).getTime() - new Date(b.date_begin).getTime();
}

class EventsPage extends Component {
    state = {
        done: false,
        listings: []
    };

    getApiData = async function() {
        const response = await fetch("https://jobs.api.sgf.dev/api/event?api_token=" + apiKey.hack4good);
        const json = await response.json();

        const arr = [];

        for (let listing of json.data) {
            arr.push(listing);
        }

        arr.sort(sortByDate);

        const newjson = {"data" : arr};

        this.setState({listings: newjson.data, done: true});
    };

    componentDidMount() {
        this.getApiData();
    }

    render() {
        if (this.state.done) {
            let elems = [];
            for (let ii = 0; ii < this.state.listings.length; ii++) {
                elems.push(
                    <Card key={ii}>
                        <Card.Body>
                            <Card.Title>{this.state.listings[ii]["title"]}</Card.Title>
                            <Card.Text>{this.state.listings[ii]["date_begin"]}</Card.Text>
                        </Card.Body>
                    </Card>
                )
            }


            return <div>
                <h1>Events</h1>
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

export default EventsPage;