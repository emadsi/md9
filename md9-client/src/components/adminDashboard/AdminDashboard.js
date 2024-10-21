import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch reservations and logs
    const fetchAdminData = async () => {
      const resResponse = await fetch('/api/admin/reservations', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const logsResponse = await fetch('/api/admin/logs', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (resResponse.ok) setReservations(await resResponse.json());
      if (logsResponse.ok) setLogs(await logsResponse.json());
    };

    fetchAdminData();
  }, []);

  const handleCancel = async (reservationId) => {
    await fetch(`/api/admin/cancel/${reservationId}`, { method: 'DELETE' });
    setReservations(reservations.filter(r => r.id !== reservationId));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Reservations</h3>
      {reservations.map((res) => (
        <div key={res.id}>
          <p>Field: {res.fieldId}, Time: {res.timeSlot}</p>
          <button onClick={() => handleCancel(res.id)}>Cancel Reservation</button>
        </div>
      ))}
      <h3>Logs</h3>
      {logs.map((log, index) => (
        <div key={index}>
          <p>{log}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
