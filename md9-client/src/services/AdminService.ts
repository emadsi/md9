// /src/services/AdminService.ts
import axios from 'axios';

const ADMIN_API_URL = 'http://localhost:8080/api/admin';

export const addTimeSlot = (timeSlot: string) => {
  return axios.post(`${ADMIN_API_URL}/time-slots`, { timeSlot });
};

export const blockTimeSlot = (timeSlot: string) => {
  return axios.post(`${ADMIN_API_URL}/block-time-slots`, { timeSlot });
};

export const viewLogs = () => {
  return axios.get(`${ADMIN_API_URL}/logs`);
};

export const loginAdmin = (loginData: any) => {
    return axios.post(`${ADMIN_API_URL}/login`, loginData);
};
