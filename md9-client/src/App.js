import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import ReservationForm from './components/reservationForm/ReservationForm';
import PaymentForm from './components/paymentForm/PaymentForm';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import LoginPage from './components/loginPage/LoginPage';

function App() {
    // Function to handle reservation form submission
  const handleReservationSubmit = (reservationData) => {
    console.log('Reservation data:', reservationData);
    // You can add logic here to handle the reservation, like sending the data to the backend.
  };
  return (
    <Router>
      <Routes>
        {/* Default route goes to the ReservationForm */}
        <Route path="/" element={<Navigate to="/home" />}/>

        {/* Default route goes to the HomePage */}
        <Route path="/home" element={<HomePage/>}/>

        {/* Reservation page */}
        <Route path="/reserve" element={() => <ReservationForm fieldId={this.props.fieldId} onSubmit={handleReservationSubmit} />}/>

        {/* Payment page */}
        <Route path="/payment" element={<PaymentForm />} />

        {/* Login Page for Admins */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Catch-all route for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
