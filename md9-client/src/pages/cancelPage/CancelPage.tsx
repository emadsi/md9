import React, { useState } from 'react';

const CancelPage: React.FC = () => {
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reservation cancellation via API
  };

  return (
    <div>
      <h2>Cancel Reservation</h2>
      <form onSubmit={handleCancel}>
        <input
          type="text"
          placeholder="Enter Confirmation Number"
          value={confirmationNumber}
          onChange={(e) => setConfirmationNumber(e.target.value)}
          required
        />
        <button type="submit">Cancel Reservation</button>
      </form>
    </div>
  );
};

export default CancelPage;