import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentForm.css'

const PaymentForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({});
  const [cardNumber, setCardNumber]= useState('');
  const [expireDate, setExpireDate]= useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCardDetails({ cardNumber: cardNumber, expireDate: expireDate, CVC: cardCVC, id: id })
    const paymentData = { paymentMethod, cardDetails, amount: 310 };
    const { data } = await axios.post('/api/payment', paymentData);
    alert(`Confirmation Number: ${data.confirmationNo}`);
    navigate('/');
  };

  return (
    <div className='content-page content'> 
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
        <div className='payment-fields'>
          <label>Card Number: </label>
          <input type='text' onChange={(e) => setCardNumber(e.target.value)}/>
          <label>Expire date:</label>
          <input type='date' onChange={(e) => setExpireDate(e.target.value)} />
          <label>CVC:</label>
          <input type='number' onChange={(e) => setCardCVC(e.target.value)}/>
          <label>ID:</label>
          <input type='text' onChange={(e) => setId(e.target.value)}/>
          <label>Amount</label>
          <input type='number' value={310} disabled/>
        </div>
        {/* {paymentMethod === 'Credit' && (
          <input
            type="text"
            placeholder="Credit Card Number"
            value={cardDetails}
            onChange={(e) => setCardDetails(e.target.value)}
            required
          />
        )}
        {paymentMethod === 'Cash' && (
          <input type='text' placeholder='Credit'/>
        )} */}
        <button type="submit">Complete Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
