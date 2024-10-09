import React, { useState } from 'react';

const PaymentForm = ({ onSubmit, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ paymentMethod, creditCardInfo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
        </select>
      </div>

    
        <div>
          <label>Credit Card Info:</label>
          <input type="text" placeholder="Card Number" required
            value={creditCardInfo.cardNumber}
            onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cardNumber: e.target.value })}
          />
          <input type="text" placeholder="Expiry Date" required
            value={creditCardInfo.expiryDate}
            onChange={(e) => setCreditCardInfo({ ...creditCardInfo, expiryDate: e.target.value })}
          />
          <input type="text" placeholder="CVC" required
            value={creditCardInfo.cvc}
            onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cvc: e.target.value })}
          />
          <input type="text" disabled value={paymentMethod === 'cash' ? 75 : 310}/>
        </div>
     

      <button type="submit">Submit Payment</button>
      <button type="button" onClick={onBack}>Back</button>
    </form>
  );
};

export default PaymentForm;
