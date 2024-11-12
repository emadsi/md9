// // /components/ReservationForm.tsx
// import React, { useState } from 'react';

// const ReservationForm: React.FC = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [date, setDate] = useState('');
//   const [timeRange, setTimeRange] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
//       <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
//       <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//       <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
//         <option value="17:30-19:30">17:30-19:30</option>
//         <option value="19:30-21:15">19:30-21:15</option>
//         <option value="21:15-23:00">21:15-23:00</option>
//       </select>
//       <button type="submit">Reserve</button>
//     </form>
//   );
// };

// export default ReservationForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ReservationFormProps {
  fieldId: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ fieldId }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const handlePaymentNavigate = () => {
    navigate('/payment');
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handlePaymentNavigate();
    // Submit form data to backend via API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
        <option value="">Select Time Slot</option>
        <option value="17:30-19:30">17:30 - 19:30</option>
        <option value="19:30-21:15">19:30 - 21:15</option>
        <option value="21:15-23:00">21:15 - 23:00</option>
      </select>
      {/* <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
        <option value="Cash">Cash</option>
        <option value="Credit">Credit</option>
      </select> */}
      <button type="submit">Reserve</button>
    </form>
  );
};

export default ReservationForm;
