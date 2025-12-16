import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="font-bold">Circus Grievance System</h1>
            <div>
                {token ? (
                    <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                ) : (
                    <>
                        <Link to="/login" className="mr-2">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
