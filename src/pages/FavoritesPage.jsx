import React, {Component} from 'react';
import { Navigation } from "../components/Navigation";
import apiKey from "../apiKey";
import Card from 'react-bootstrap/Card'
import { Col, Row, Container } from 'react-bootstrap';

class FavoritesPage extends Component {
    state = {
        done: false,
        favorites: null,
        noFavorites: false
    };

    getLocalData = function() {
        var tmp =  [];
        if (localStorage.getItem('favorites') === null || "") {
            this.setState(
                {done: true,
                noFavorites: true}
            );
        }

        else {
            var favoritesList = localStorage.getItem('favorites');
            this.setState(
                {done: true,
                    favorites: [JSON.parse(favoritesList)]}
            );
        }


    };

    componentDidMount() {
        this.getLocalData();
    }

    render() {
        console.log(this.state.favorites);
        if (this.state.done && this.state.favorites !== null) {
            let cardElements = [];
            for (let i = 0; i < this.state.favorites.length; i++) {
                cardElements.push(
                    <Card key={i} className='favorites-cards'>
                        <Card.Body>
                            <Card.Title>{this.state.favorites[i]["title"]}</Card.Title>
                            <Card.Text>{this.state.favorites[i]["employer"].name}</Card.Text>
                        </Card.Body>
                    </Card>
                )
            }

            return (
                <div>
                    <Container className='favorites-container'>
                        <Row>
                            <Col>
                                <div className="favorites-text">FAVORITES</div>
                            </Col>
                        </Row>
                        <Row className='favorites-panel'>
                            <Col>
                                {cardElements}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Navigation/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }

        else if (this.state.noFavorites) {
            return (
                <div>
                    <Container className='favorites-container'>
                        <Row>
                            <Col>
                                <div className="favorites-text">FAVORITES</div>
                            </Col>
                        </Row>
                        <h3>There are no favorites at this time.</h3>
                        <Row>
                            <Col>
                                <Navigation/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }

        else {
            return <div>
                <p>Loading...</p>
            </div>
        }
    }
}


export default FavoritesPage;