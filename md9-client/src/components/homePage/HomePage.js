
import React from 'react';
import './HomePage.css'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
        {/* Admin Zone button in the top-right corner */}
            <div className="admin-zone-button">
                <button onClick={() => navigate('/login')}>Admin Zone</button>
            </div>

            {/* Field images & Reservation Button */}
            <div className='fields-reservations'> 
                <div className="big-field">
                    <img src="/images/field1.jpg" alt="Field 1" className="field-image" />
                    <button className='reservation-buttons' onClick={() => navigate(`/reserve/${1}`)}>Field 1 Reservation</button>
                </div>

                {/* Reservation buttons */}
                <div className="small-field">
                    <img src="/images/field2.jpg" alt="Field 2" className="field-image" /> 
                    <button className='reservation-buttons' onClick={() => navigate(`/reserve/${2}`)}>Field 2 Reservation</button>
                </div>
            </div>

        </div>
    )
}

export default HomePage;