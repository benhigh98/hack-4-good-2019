import React from 'react';
import { Navigation } from "../components/Navigation";
import LocationEntry from '../components/LocationEntry';

function HomePage() {
    return (
        <div>
            <LocationEntry />
            <Navigation />
        </div>
    );
}

export default HomePage;