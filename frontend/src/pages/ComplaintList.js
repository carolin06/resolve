import React, { useEffect, useState } from 'react';
import { getComplaints } from '../services/api';
import ComplaintCard from '../components/ComplaintCard';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await getComplaints(token);
                if (Array.isArray(res.data)) setComplaints(res.data);
                else setComplaints([]);
            } catch (err) {
                console.error('Failed to fetch complaints:', err);
                setComplaints([]);
            }
        };
        fetchComplaints();
    }, [token]);

    return (
        <div className="container page">
            <h2 className="page-title">Complaints</h2>
            <p className="muted" style={{ marginTop: 0 }}>
                Track submitted issues and their resolution progress.
            </p>

            <div className="list" style={{ marginTop: 16 }}>
                {complaints.length === 0 ? (
                    <div className="card">
                        <div className="card-body">
                            <p className="muted" style={{ margin: 0 }}>
                                No complaints found.
                            </p>
                        </div>
                    </div>
                ) : (
                    complaints.map((c) => <ComplaintCard key={c._id} complaint={c} />)
                )}
            </div>
        </div>
    );
};

export default ComplaintList;
