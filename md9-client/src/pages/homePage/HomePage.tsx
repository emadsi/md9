import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FieldReservation from '../../components/FieldReservation';
import './HomePage.css'

const HomePage: React.FC = () => {
  return (
    <div className='homepage'>
      <Header />
      <div className="content">
        <div className="fields-container">
          <FieldReservation fieldId="1" fieldName="Field 1" imageSrc="/images/field1.jpg" />
          <FieldReservation fieldId="2" fieldName="Field 2" imageSrc="/images/field2.jpg" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
