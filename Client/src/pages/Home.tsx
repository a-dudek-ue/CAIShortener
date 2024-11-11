import React from 'react';
import LinkShortener from '../components/LinkShortener';
import './Home.css'

const Home: React.FC = () => {
    return (
        <div className="main-container">
            <LinkShortener />
        </div>
    );
};
export default Home;
