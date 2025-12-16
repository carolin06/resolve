import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(form);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response.data.msg || 'Error');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit" className="bg-blue-600 text-white py-2 rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
