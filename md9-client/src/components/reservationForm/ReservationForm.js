import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationForm.css'
import validator from 'validator' 

const ReservationForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [reservationType, setReservationType] = useState('once');
  const [fieldOption, setFieldOption] = useState('Field 1')
  // const [id, setId] = useState();
  const [mobile, setMobile] = useState();

  // const mobileCompanyOptions = ['050', '0515', '0512', '052', '053', '054', '0552', '05533', '05532', '055440',
  //    '055410', '055441', '05543', '0555', '05555', '0556', '0557', '0558', '0559', '05577', '056','058', '059'];

  const handleSubmit = (reservationData) => {
    reservationData.preventDefault();
    const reservation = {mobile, date, timeSlot, reservationType};
    const validateMobile = (number) => {const isValidNumber = validator.isMobilePhone(number); return isValidNumber;}

    if (validateMobile(reservationData.mobile)) {
      //connect to thrid party authentication method.
    }
    navigate('/payment');
  };

  return (
    <div class="reservation-container">
      <form class="reservation-form" onSubmit={handleSubmit}>
        <div class="reservation-form-field">
          <label>Date: </label>
          <input type="date" value={date} class="form-control" onChange={(date) => setDate(date.target.value)} required />
        </div>
        <div class="reservation-form-field">
          <label>Time Slot: </label>
          <select value={timeSlot} class="form-control" onChange={(timeSlot) => setTimeSlot(timeSlot.target.value)} required>
            <option value="">Select a time slot</option>
            <option value="17:30 - 19:30">17:30 - 19:30</option>
            <option value="19:30 - 21:15">19:30 - 21:15</option>
            <option value="21:15 - 23:00">21:15 - 23:00</option>
          </select>
        </div>
        <div class="reservation-form-field">
          <label>Reservation Type: </label>
          <select value={reservationType} class="form-control" onChange={(reservationType) => setReservationType(reservationType.target.value)}>
            <option value="once">Only Once</option>
            <option value="permanent">Permanent</option>
          </select>
        </div>
        <div class="reservation-form-field">
          <label>Field Option:</label>
          <select value={fieldOption} class="form-control" onCanPlayThroughCapture={(fieldOption) => setFieldOption(fieldOption)}>
            <option value="Field 1">Field 1</option>
            <option value="Field 2">Field 2</option>
          </select>
        </div>
        <div class="reservation-form-field">
          <label>Mobile: </label>
          <input type="text" value={mobile} class="form-control" onChange={(mobile) => setMobile(mobile.target.value)}  required/>
        </div>
        <button type="submit" class="btn btn-primary btn-sm reservation-submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default ReservationForm;
