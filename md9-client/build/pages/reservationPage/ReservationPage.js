var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// /src/pages/ReservationPage.tsx
import React, { useState } from 'react';
import '../styles/ReservationPage.css';
import { reserveField } from 'services/ReservationService';
const ReservationPage = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit');
    const [creditCard, setCreditCard] = useState('');
    const timeSlots = ['17:30 – 19:30', '19:30 – 21:15', '21:15 – 23:00'];
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (name && mobile && date && timeSlot && paymentMethod) {
            try {
                const response = yield reserveField({
                    name,
                    mobile,
                    date,
                    timeSlot,
                    paymentMethod,
                    creditCard: paymentMethod === 'Credit' ? creditCard : undefined,
                });
                alert(`Reservation confirmed! Confirmation Number: ${response.data.confirmationNumber}`);
            }
            catch (error) {
                console.error('Error reserving field:', error);
            }
        }
        else {
            alert('Please fill all fields');
        }
    });
    return (React.createElement("div", { className: "reservation-page" },
        React.createElement("h1", null, "Reserve a Field"),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Name:"),
                React.createElement("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Mobile Number:"),
                React.createElement("input", { type: "tel", value: mobile, onChange: (e) => setMobile(e.target.value), required: true })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Select Date:"),
                React.createElement("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), required: true })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Select Time Slot:"),
                React.createElement("select", { value: timeSlot, onChange: (e) => setTimeSlot(e.target.value), required: true },
                    React.createElement("option", { value: "" }, "--Select--"),
                    timeSlots.map((slot, index) => (React.createElement("option", { key: index, value: slot }, slot))))),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Payment Method:"),
                React.createElement("select", { value: paymentMethod, onChange: (e) => setPaymentMethod(e.target.value), required: true },
                    React.createElement("option", { value: "Credit" }, "Credit"),
                    React.createElement("option", { value: "Cash" }, "Cash"))),
            paymentMethod === 'Credit' && (React.createElement("div", { className: "form-group" },
                React.createElement("label", null, "Credit Card:"),
                React.createElement("input", { type: "text", value: creditCard, onChange: (e) => setCreditCard(e.target.value), required: true }))),
            React.createElement("button", { type: "submit" }, "Reserve"))));
};
export default ReservationPage;
