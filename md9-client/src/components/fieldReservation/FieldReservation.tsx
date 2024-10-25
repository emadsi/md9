import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FieldReservation.css';

interface FieldReservationProps {
  fieldId: string;
  fieldName: string;
  imageSrc: string;
}

const FieldReservation: React.FC<FieldReservationProps> = ({ fieldId, fieldName, imageSrc }) => {
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate(`/reserve/${fieldId}`);
  };

  return (
    <div className="field-reservation">
      <img src={imageSrc} alt={fieldName} className="field-image" />
      <button className='reserve-button' onClick={handleReserve}>Reserve {fieldName}</button>
    </div>
  );
};

export default FieldReservation;
