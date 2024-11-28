import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import ReservationPage from './pages/reservationPage/ReservationPage';
import LoginPage from './pages/loginPage/LoginPage';
import AdminPage from './pages/adminPage/AdminPage';
import CancelPage from './pages/cancelPage/CancelPage';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import './App.css'
import PaymentForm from './components/paymentForm/PaymentForm';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path="/reserve/:fieldId" element={<ReservationPage />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
