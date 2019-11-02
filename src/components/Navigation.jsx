import React from 'react';
import '../App.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

export function Navigation() {
    return (
        <div>
            <Navbar className="w-100" bg="primary" variant="dark" fixed="bottom">
                <Nav className="w-100">
                    <Container>
                        <Row>
                            <Col> <Nav.Link href="/home"><img src={require('../logos/home.svg')} /></Nav.Link> </Col>
                            <Col> <Nav.Link href="/notifications"><img src={require('../logos/notifications.svg')} /></Nav.Link> </Col>
                            <Col> <Nav.Link href="/favorites"><img src={require('../logos/favorite.svg')} /></Nav.Link> </Col>
                            <Col> <Nav.Link href="/events"><img src={require('../logos/calendar.svg')} /></Nav.Link> </Col>
                        </Row>
                    </Container>
                </Nav>
            </Navbar>
        </div>
    );
}

