// // /src/services/ReservationService.ts
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api/reservations';

// export const reserveField = (reservationData: any) => {
//     return axios.post(`${API_BASE_URL}/reserve`, reservationData);
// };

// /src/services/ReservationService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/reservations'; // Adjust this based on your backend URL

interface ReservationRequest {
  name: string;
  mobile: string;
  date: Date;
  timeSlot: string;
  paymentMethod: string;
  confirmationNo: string;
}

export const getAllReservations = () => {
  return axios.get(API_BASE_URL);
};

export const createReservation = (reservation: any) => {
  return axios.post(API_BASE_URL, reservation);
};

export const deleteReservation = (id: string) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};


export const reserveField = (reservationData: ReservationRequest) => {
  return axios.post(`${API_BASE_URL}/reserve`, reservationData);
};

