import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(form);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="container page">
            <div className="auth-wrap card">
                <div className="card-body">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-sub">
                        Login to manage and track your complaints
                    </p>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="field">
                            <span className="label">Email</span>
                            <input
                                className="input"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="field">
                            <span className="label">Password</span>
                            <input
                                className="input"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
