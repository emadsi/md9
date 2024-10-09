
import React from 'react';
import './HomePage.css'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const handleReserveClick = () => {
        navigate('/reserve');
    };

    const handleAdminClick = () => {
        navigate('/admin');
    };

    return (
        <div class="HomePage">
            <h1>Welcome to MD9</h1>
            <div className="home-container">
                <div className="button-container">
                    <button onClick={handleReserveClick} className="home-button">Reserve Field</button>
                    <button onClick={handleAdminClick} className="home-button">Admin Zone</button>
                </div>  
            </div>
        </div>
    )
}

export default HomePage;