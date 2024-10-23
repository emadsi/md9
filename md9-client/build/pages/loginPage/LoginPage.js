var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// /src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/AdminService';
import '../styles/LoginPage.css';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const response = yield loginAdmin({ username, password });
            localStorage.setItem('token', response.data.token); // Save JWT
            navigate('/admin');
        }
        catch (error) {
            alert('Invalid login credentials');
        }
    });
    return (React.createElement("div", { className: "login-page" },
        React.createElement("h1", null, "Admin Login"),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Username:"),
                React.createElement("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), required: true })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Password:"),
                React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })),
            React.createElement("button", { type: "submit" }, "Login"))));
};
export default LoginPage;
