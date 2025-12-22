import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container page">
            <div className="hero card">
                <h2>Welcome to the Grievance Dashboard</h2>
                <p>
                    Report issues in your area and track their resolution status in real
                    time.
                </p>

                <div className="actions">
                    <Link to="/submit-complaint" className="btn btn-primary">
                        Submit Complaint
                    </Link>

                    <Link to="/complaints" className="btn btn-ghost">
                        View Complaints
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

