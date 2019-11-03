import React from 'react';
import { Navigation } from "../components/Navigation";
import { Container, Row, Col } from 'react-bootstrap';

function NotificationsPage() {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className='notifications-text'>NOTIFICATIONS</div>
                        <div className='notifications-page'>You have no new notifications at this time</div>
                    </Col>
                </Row>
            </Container>
            <Navigation />
        </div>
    );
}

export default NotificationsPage;