import React from 'react';
import FieldReservation from '../../components/fieldReservation/FieldReservation';
import './HomePage.css'
import { useNavigate } from 'react-router-dom';


const navigate = useNavigate();
const handleCancelReservation = () => {
  navigate('/cancel')
}

const HomePage: React.FC = () => {
  return (
    <div className='homepage'>
      <div className="content">
        <button className='cancel-button' onClick={handleCancelReservation}>Cancel Reservation</button>
        <div className="fields-container">
          <FieldReservation fieldId="1" fieldName="Field 1" imageSrc="/images/field1.jpg" />
          <FieldReservation fieldId="2" fieldName="Field 2" imageSrc="/images/field2.jpg" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
