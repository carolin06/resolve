import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="navbar">
            <div className="navbar-inner">
                <div className="brand">
                    <div className="brand-badge" />
                    Circus Grievance System
                </div>

                <div className="navlinks">
                    {!token ? (
                        <>
                            <Link className="navlink" to="/login">Login</Link>
                            <Link className="navlink" to="/register">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link className="navlink" to="/dashboard">Dashboard</Link>
                            <Link className="navlink" to="/complaints">Complaints</Link>
                            <button className="btn btn-danger" onClick={logout}>Logout</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
