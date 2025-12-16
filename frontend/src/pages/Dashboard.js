import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="flex gap-4">
                <Link to="/submit-complaint" className="bg-green-500 text-white px-4 py-2 rounded">Submit Complaint</Link>
                <Link to="/complaints" className="bg-blue-500 text-white px-4 py-2 rounded">View Complaints</Link>
            </div>
        </div>
    );
};

export default Dashboard;
