var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// /src/pages/AdminPage.tsx
import React, { useEffect, useState } from 'react';
import '../styles/AdminPage.css';
import { deleteReservation, getAllReservations } from '../../services/ReservationService';
import { addTimeSlot, blockTimeSlot, viewLogs } from '../../services/AdminService';
const AdminPage = () => {
    const [reservations, setReservations] = useState([]);
    const [timeSlot, setTimeSlot] = useState('');
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        fetchReservations();
        fetchLogs();
    }, []);
    const fetchReservations = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield getAllReservations();
            setReservations(response.data);
        }
        catch (error) {
            console.error('Error fetching reservations:', error);
        }
    });
    const fetchLogs = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield viewLogs();
            setLogs(response.data);
        }
        catch (error) {
            console.error('Error fetching logs:', error);
        }
    });
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield deleteReservation(id);
            fetchReservations(); // Refresh reservations after deletion
        }
        catch (error) {
            console.error('Error deleting reservation:', error);
        }
    });
    const handleAddTimeSlot = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield addTimeSlot(timeSlot);
            alert('Time Slot Added');
        }
        catch (error) {
            console.error('Error adding time slot:', error);
        }
    });
    const handleBlockTimeSlot = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield blockTimeSlot(timeSlot);
            alert('Time Slot Blocked');
        }
        catch (error) {
            console.error('Error blocking time slot:', error);
        }
    });
    return (React.createElement("div", { className: "admin-page" },
        React.createElement("h1", null, "Admin Panel"),
        React.createElement("div", null,
            React.createElement("h2", null, "Manage Time Slots"),
            React.createElement("input", { type: "text", value: timeSlot, onChange: (e) => setTimeSlot(e.target.value), placeholder: "Enter Time Slot" }),
            React.createElement("button", { onClick: handleAddTimeSlot }, "Add Time Slot"),
            React.createElement("button", { onClick: handleBlockTimeSlot }, "Block Time Slot")),
        React.createElement("h2", null, "Reservations"),
        React.createElement("table", { className: "reservation-table" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Date"),
                    React.createElement("th", null, "From"),
                    React.createElement("th", null, "To"),
                    React.createElement("th", null, "Field"),
                    React.createElement("th", null, "Payment Method"),
                    React.createElement("th", null, "Confirmation No."),
                    React.createElement("th", null, "Status"),
                    React.createElement("th", null, "Actions"))),
            React.createElement("tbody", null, reservations.map((reservation) => (React.createElement("tr", { key: reservation.id },
                React.createElement("td", null, reservation.reserverName),
                React.createElement("td", null, reservation.date),
                React.createElement("td", null, reservation.from),
                React.createElement("td", null, reservation.to),
                React.createElement("td", null, reservation.field),
                React.createElement("td", null, reservation.paymentMethod),
                React.createElement("td", null, reservation.confirmationNumber),
                React.createElement("td", null, reservation.status),
                React.createElement("td", null,
                    React.createElement("button", { onClick: () => handleDelete(reservation.id) }, "Cancel"))))))),
        React.createElement("h2", null, "Logs"),
        React.createElement("div", { className: "logs" }, logs.map((log, index) => (React.createElement("p", { key: index }, log))))));
};
export default AdminPage;
