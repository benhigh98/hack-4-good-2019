import React from "react";
import {Card, Row, Col} from "react-bootstrap";

function SearchResult(props) {
    return(
        <div>
            <a href={"details?id=" + props.job.id} className={"searchResult"}>
                <Card>
                    <Row>
                        <Col xs={8}>
                            <Card.Title>{props.job.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{props.job.employer.name}</Card.Subtitle>
                        </Col>
                        <Col xs={4} className="text-right text-muted">
                            {(props.job.locations.data[0].distance * 0.000621371).toPrecision(3)} miles
                        </Col>
                    </Row>
                </Card>
            </a>
        </div>
    );
}

export default SearchResult;