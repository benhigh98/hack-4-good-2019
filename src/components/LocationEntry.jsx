import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import JobsLogo from '../Icons/Workforce2019LogoMoJobs'
import '../App.css'

function LocationEntry() {
    return (
        <div>
            <Container>
                <Row>
                    <Col className='logo-column'>
                        <div className='jobs-logo text-center'>
                            <JobsLogo />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className='jobs-text text-center'>CHOOSE ADDRESS FOR JOB SEARCH</h1>
                        <div className='d-flex'>
                            <Button variant="primary" size="lg" block className='mx-auto current-location-btn'>Use my current location</Button>
                        </div>
                        <div className='separator d-flex'>OR</div>
                        <Form>
                            <Form.Group controlId="formAddress">
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Addresss"
                                        aria-describedby="inputGroupAppend"
                                        required
                                    />
                                    <InputGroup.Append>
                                        <Button variant='primary'>
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

export default LocationEntry;