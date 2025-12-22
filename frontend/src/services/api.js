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

// Staff/Admin
export const getAllComplaints = (token) =>
    API.get('/complaints/all', { headers: { 'x-auth-token': token } });

export const updateComplaintStatus = (id, status, token) =>
    API.patch(`/complaints/${id}/status`, { status }, { headers: { 'x-auth-token': token } });

export default API;
