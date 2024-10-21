import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReservationForm.css'
import validator from 'validator' 

const ReservationForm = ({ onSubmit }) => {
  var timeSlotOptions = [
    {from: '17:30', to: '19:30'},
    {from: '19:30', to: '21:15'},
    {from: '21:15', to: '23:00'}
  ]
  const navigate = useNavigate();
  const { fieldId } = useParams(); // Field 1 or 2
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
      <h3>Reserve Field {fieldId}</h3>
      <form class="reservation-form" onSubmit={handleSubmit}>
        <div class="reservation-form-field">
          <label>Date: </label>
          <input type="date" value={date} class="form-control" onChange={(date) => setDate(date.target.value)} required />
        </div>
        <div class="reservation-form-field">
          <label>Time Slot: </label>
          <select value={timeSlot} class="form-control" onChange={(timeSlot) => setTimeSlot(timeSlot.target.value)} required>
            <option value="">Select a time slot</option>
            {timeSlotOptions.map((timeSlot, index) => 
              <option value={`${index}`}> ${timeSlot.from} - ${timeSlot.to}</option>
            )}
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

// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const ReservationPage = () => {
//   var timeSlotOptions = [
//     {from: '17:30', to: '19:30'},
//     {from: '19:30', to: '21:15'},
//     {from: '21:15', to: '23:00'}
//   ]
//   const { fieldId } = useParams(); // Field 1 or 2
//   const [timeSlot, setTimeSlot] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [cardDetails, setCardDetails] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Submit reservation to backend
//     const response = await fetch('/api/reservations', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify({ fieldId, timeSlot, paymentMethod, cardDetails }),
//     });

//     if (response.ok) {
//       alert('Reservation successful!');
//       navigate('/');
//     } else {
//       alert('Failed to reserve!');
//     }
//   };

//   return (
//     <div class="reservation-container">
//       <form onSubmit={handleSubmit}>
//         <h3>Reserve Field {fieldId}</h3>
//         <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
//           {timeSlotOptions.map((timeSlot, index) => {
//             <option value={`${index}`}> ${timeSlot.from} - ${timeSlot.to}</option>
//           })}
//           {/* <option value="">Select Time Slot</option>
//           <option value="17:30-19:30">17:30 - 19:30</option>
//           <option value="19:30-21:15">19:30 - 21:15</option>
//           <option value="21:15-23:00">21:15 - 23:00</option> */}
//         </select>
//         <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
//           <option value="">Select Payment Method</option>
//           <option value="credit">Credit</option>
//           <option value="cash">Cash</option>
//         </select>
//         {paymentMethod === 'cash' && (
//           <input 
//             type="text" 
//             value={cardDetails} 
//             onChange={(e) => setCardDetails(e.target.value)} 
//             placeholder="Credit Card Details for Deposit" 
//             required 
//           />
//         )}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ReservationPage;
