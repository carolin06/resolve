import React from 'react';

const statusClass = (status) => {
    if (status === 'OPEN') return 'open';
    if (status === 'IN_PROGRESS') return 'progress';
    if (status === 'RESOLVED') return 'resolved';
    return '';
};

const ComplaintCard = ({ complaint }) => {
    return (
        <div className="ticket">
            <div className="ticket-top">
                <div>
                    <h3 className="ticket-title">{complaint.type}</h3>
                    <p className="ticket-desc">{complaint.description}</p>

                    <div className="ticket-meta">
                        <div><strong>Location:</strong> {complaint.location || '—'}</div>
                        <div>
                            <strong>Submitted by:</strong>{' '}
                            {complaint.user?.name || 'Unknown'} ({complaint.user?.email || '—'})
                        </div>
                    </div>
                </div>

                <div className="badges">
                    <span className={`badge ${statusClass(complaint.status)}`}>
                        {complaint.status}
                    </span>
                </div>
            </div>

            {complaint.image_url && (
                <div className="ticket-img">
                    <img
                        src={`http://localhost:5000/${complaint.image_url}`}
                        alt="complaint"
                    />
                </div>
            )}
        </div>
    );
};

export default ComplaintCard;
