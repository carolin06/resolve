import React, { useEffect, useState } from 'react';
import { getComplaints } from '../services/api';
import ComplaintCard from '../components/ComplaintCard';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchComplaints = async () => {
            const res = await getComplaints(token);
            setComplaints(res.data);
        };
        fetchComplaints();
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h2 className="text-2xl font-bold mb-4">Complaints</h2>
            {complaints.map(c => <ComplaintCard key={c._id} complaint={c} />)}
        </div>
    );
};

export default ComplaintList;
