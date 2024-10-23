// /src/components/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
const Header = () => {
    const navigate = useNavigate();
    return (React.createElement("header", { className: "header" },
        React.createElement("h1", null, "Welcome to MD9"),
        React.createElement("button", { onClick: () => navigate('/login'), className: "admin-btn" }, "Admin Zone")));
};
export default Header;
