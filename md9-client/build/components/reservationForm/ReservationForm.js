// /components/ReservationForm.tsx
import React, { useState } from 'react';
const ReservationForm = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [date, setDate] = useState('');
    const [timeRange, setTimeRange] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };
    return (React.createElement("form", { onSubmit: handleSubmit },
        React.createElement("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Your Name" }),
        React.createElement("input", { type: "text", value: mobile, onChange: (e) => setMobile(e.target.value), placeholder: "Mobile" }),
        React.createElement("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value) }),
        React.createElement("select", { value: timeRange, onChange: (e) => setTimeRange(e.target.value) },
            React.createElement("option", { value: "17:30-19:30" }, "17:30-19:30"),
            React.createElement("option", { value: "19:30-21:15" }, "19:30-21:15"),
            React.createElement("option", { value: "21:15-23:00" }, "21:15-23:00")),
        React.createElement("button", { type: "submit" }, "Reserve")));
};
export default ReservationForm;
