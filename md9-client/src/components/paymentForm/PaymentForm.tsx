import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState('');
  const navigate = useNavigate();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const paymentData = { paymentMethod, cardDetails, amount: 310 };
    const { data } = await axios.post('/api/payment', paymentData);
    alert(`Confirmation Number: ${data.confirmationNo}`);
    navigate('/');
  };

  return (
    <form onSubmit={handlePayment}>
      <label>
        <input
          type="radio"
          value="Cash"
          checked={paymentMethod === 'Cash'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        /> Cash
      </label>
      <label>
        <input
          type="radio"
          value="Credit"
          checked={paymentMethod === 'Credit'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        /> Credit
      </label>
      {paymentMethod === 'Credit' && (
        <input
          type="text"
          placeholder="Credit Card Details"
          value={cardDetails}
          onChange={(e) => setCardDetails(e.target.value)}
          required
        />
      )}
      <button type="submit">Complete Payment</button>
    </form>
  );
};

export default PaymentForm;
