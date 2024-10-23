// /src/pages/AdminPage.tsx
import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import { deleteReservation, getAllReservations } from '../../services/ReservationService';
import { addTimeSlot, blockTimeSlot, viewLogs } from '../../services/AdminService';

const AdminPage: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [timeSlot, setTimeSlot] = useState('');
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchReservations();
    fetchLogs();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await getAllReservations();
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await viewLogs();
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReservation(id);
      fetchReservations(); // Refresh reservations after deletion
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const handleAddTimeSlot = async () => {
    try {
      await addTimeSlot(timeSlot);
      alert('Time Slot Added');
    } catch (error) {
      console.error('Error adding time slot:', error);
    }
  };

  const handleBlockTimeSlot = async () => {
    try {
      await blockTimeSlot(timeSlot);
      alert('Time Slot Blocked');
    } catch (error) {
      console.error('Error blocking time slot:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      {/* Time Slot Management */}
      <div>
        <h2>Manage Time Slots</h2>
        <input type="text" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} placeholder="Enter Time Slot" />
        <button onClick={handleAddTimeSlot}>Add Time Slot</button>
        <button onClick={handleBlockTimeSlot}>Block Time Slot</button>
      </div>

      {/* Reservations Table */}
      <h2>Reservations</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Field</th>
            <th>Payment Method</th>
            <th>Confirmation No.</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.reserverName}</td>
              <td>{reservation.date}</td>
              <td>{reservation.from}</td>
              <td>{reservation.to}</td>
              <td>{reservation.field}</td>
              <td>{reservation.paymentMethod}</td>
              <td>{reservation.confirmationNumber}</td>
              <td>{reservation.status}</td>
              <td>
                <button onClick={() => handleDelete(reservation.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Logs */}
      <h2>Logs</h2>
      <div className="logs">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
