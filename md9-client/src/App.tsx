import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import ReservationPage from './pages/reservationPage/ReservationPage';
import LoginPage from './pages/loginPage/LoginPage';
import AdminPage from './pages/adminPage/AdminPage';
import CancelPage from './pages/cancelPage/CancelPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reserve/:fieldId" element={<ReservationPage />} />
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </Router>
  );
};

export default App;
