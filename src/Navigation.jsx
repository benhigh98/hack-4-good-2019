import React from 'react';
import './App.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export function Navigation() {
    return (
        <div>
            <Navbar className="d-flex nav-fill" bg="primary" variant="dark" fixed="bottom">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">1</Nav.Link>
                    <Nav.Link href="/notifications">2</Nav.Link>
                    <Nav.Link href="/favorites">3</Nav.Link>
                    <Nav.Link href="/events">4</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}

