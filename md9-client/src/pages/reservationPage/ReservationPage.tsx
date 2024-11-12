// // /src/pages/ReservationPage.tsx
// import React, { useState } from 'react';
// import '../styles/ReservationPage.css';
// import { reserveField } from '../../services/ReservationService';

// const ReservationPage: React.FC = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [date, setDate] = useState('');
//   const [timeSlot, setTimeSlot] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('Credit');
//   const [creditCard, setCreditCard] = useState('');

//   const timeSlots = ['17:30 – 19:30', '19:30 – 21:15', '21:15 – 23:00'];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (name && mobile && date && timeSlot && paymentMethod) {
//       try {
//         const response = await reserveField({
//           name,
//           mobile,
//           date,
//           timeSlot,
//           paymentMethod,
//           creditCard: paymentMethod === 'Credit' ? creditCard : undefined,
//         });
//         alert(`Reservation confirmed! Confirmation Number: ${response.data.confirmationNumber}`);
//       } catch (error) {
//         console.error('Error reserving field:', error);
//       }
//     } else {
//       alert('Please fill all fields');
//     }
//   };

//   return (
//     <div className="reservation-page">
//       <h1>Reserve a Field</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <label>Mobile Number:</label>
//           <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <label>Select Date:</label>
//           <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <label>Select Time Slot:</label>
//           <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
//             <option value="">--Select--</option>
//             {timeSlots.map((slot, index) => (
//               <option key={index} value={slot}>
//                 {slot}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Payment Method:</label>
//           <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
//             <option value="Credit">Credit</option>
//             <option value="Cash">Cash</option>
//           </select>
//         </div>
//         {paymentMethod === 'Credit' && (
//           <div className="form-group">
//             <label>Credit Card:</label>
//             <input type="text" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} required />
//           </div>
//         )}
//         <button type="submit">Reserve</button>
//       </form>
//     </div>
//   );
// };

// export default ReservationPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import ReservationForm from '../../components/reservationForm/ReservationForm';

const ReservationPage: React.FC = () => {
  const { fieldId } = useParams();

  return (
    <div className='content-page content'>
      <h2>Reserve Field {fieldId}</h2>
      <ReservationForm fieldId={fieldId || '1'} />
    </div>
  );
};

export default ReservationPage;
