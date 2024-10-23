// /src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
const HomePage = () => {
    const navigate = useNavigate();
    return (React.createElement("div", { className: "home-page" },
        React.createElement("div", { className: "field-container" },
            React.createElement("div", { className: "field" },
                React.createElement("img", { src: "/images/field1.jpg", alt: "Field 1" }),
                React.createElement("button", { onClick: () => navigate('/reserve') }, "Reserve Field 1")),
            React.createElement("div", { className: "field" },
                React.createElement("img", { src: "/images/field2.jpg", alt: "Field 2" }),
                React.createElement("button", { onClick: () => navigate('/reserve') }, "Reserve Field 2"))),
        React.createElement("button", { className: "cancel-btn" }, "Cancel Reservation")));
};
export default HomePage;
