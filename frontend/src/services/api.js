import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Complaints
export const submitComplaint = (data, token) => API.post('/complaints', data, {
    headers: { 'x-auth-token': token }
});
export const getComplaints = (token) => API.get('/complaints', {
    headers: { 'x-auth-token': token }
});

export default API;
