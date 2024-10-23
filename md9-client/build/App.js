// /src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/homePage/HomePage';
import ReservationPage from './pages/reservationPage/ReservationPage';
import LoginPage from './pages/loginPage/LoginPage';
import AdminPage from './pages/adminPage/AdminPage';
import Footer from './components/Footer';
const App = () => {
    return (React.createElement(Router, null,
        React.createElement("div", { className: "app" },
            React.createElement(Header, null),
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(HomePage, null) }),
                React.createElement(Route, { path: "/reserve", element: React.createElement(ReservationPage, null) }),
                React.createElement(Route, { path: "/login", element: React.createElement(LoginPage, null) }),
                React.createElement(Route, { path: "/admin", element: React.createElement(AdminPage, null) })),
            React.createElement(Footer, null))));
};
export default App;
