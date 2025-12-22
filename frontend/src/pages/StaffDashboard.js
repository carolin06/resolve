import React, { useEffect, useState } from 'react';
import { getAllComplaints, updateComplaintStatus } from '../services/api';

const StaffDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const load = async () => {
        setLoading(true);
        try {
            const res = await getAllComplaints(token);
            setComplaints(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error(e);
            alert('Failed to load complaints (are you staff/admin?)');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const changeStatus = async (id, newStatus) => {
        try {
            await updateComplaintStatus(id, newStatus, token);
            // refresh list
            load();
        } catch (e) {
            console.error(e);
            alert('Failed to update status');
        }
    };

    return (
        <div className="container page">
            <div className="card">
                <div className="card-body">
                    <h2 className="page-title">Staff Dashboard</h2>
                    <p className="muted" style={{ marginTop: 0 }}>
                        View and update complaint lifecycle (OPEN → IN_PROGRESS → RESOLVED).
                    </p>

                    {loading ? (
                        <p>Loading...</p>
                    ) : complaints.length === 0 ? (
                        <p>No complaints found.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Location</th>
                                        <th>Citizen</th>
                                        <th>Status</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.type}</td>
                                            <td>{c.location || '-'}</td>
                                            <td>{c.user?.name || '—'}</td>
                                            <td>
                                                <span className={`badge badge-${c.status}`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td>
                                                <select
                                                    className="input"
                                                    value={c.status}
                                                    onChange={(e) => changeStatus(c._id, e.target.value)}
                                                >
                                                    <option value="OPEN">OPEN</option>
                                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                                    <option value="RESOLVED">RESOLVED</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
