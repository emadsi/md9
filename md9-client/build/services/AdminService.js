// /src/services/AdminService.ts
import axios from 'axios';
const ADMIN_API_URL = 'http://localhost:8080/api/admin';
export const addTimeSlot = (timeSlot) => {
    return axios.post(`${ADMIN_API_URL}/time-slots`, { timeSlot });
};
export const blockTimeSlot = (timeSlot) => {
    return axios.post(`${ADMIN_API_URL}/block-time-slots`, { timeSlot });
};
export const viewLogs = () => {
    return axios.get(`${ADMIN_API_URL}/logs`);
};
export const loginAdmin = (loginData) => {
    return axios.post(`${ADMIN_API_URL}/login`, loginData);
};
