import React, { useState } from 'react';
import { submitComplaint } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SubmitComplaint = () => {
    const [form, setForm] = useState({ type: '', description: '', location: '' });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleImage = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('type', form.type);
        data.append('description', form.description);
        data.append('location', form.location);
        if (image) data.append('image', image);

        try {
            await submitComplaint(data, token);
            alert('Complaint submitted');
            navigate('/complaints');
        } catch (err) {
            alert(err.response?.data?.msg || 'Error');
        }
    };

    return (
        <div className="container page">
            <div className="card">
                <div className="card-body">
                    <h2 className="page-title">Submit Complaint</h2>
                    <p className="muted" style={{ marginTop: 0 }}>
                        Report a civic issue (roads, water, garbage) with location and optional photo.
                    </p>

                    <form className="form form-grid" onSubmit={handleSubmit}>
                        <div className="field">
                            <span className="label">Issue Type</span>
                            <input
                                className="input"
                                type="text"
                                name="type"
                                placeholder="Road damage / Water leakage / Garbage not collected"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="field">
                            <span className="label">Location</span>
                            <input
                                className="input"
                                type="text"
                                name="location"
                                placeholder="Sector A, near Caravan 12"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field field-span-2">
                            <span className="label">Description</span>
                            <textarea
                                className="textarea"
                                name="description"
                                placeholder="Describe the issue clearly..."
                                onChange={handleChange}
                                required
                            />
                            <span className="helper">
                                Tip: include landmarks + urgency (example: “water leaking near food stalls”).
                            </span>
                        </div>

                        <div className="field">
                            <span className="label">Photo (optional)</span>
                            <input className="input file" type="file" onChange={handleImage} />
                        </div>

                        <div className="field actions-row">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => navigate('/complaints')}
                            >
                                View Complaints
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitComplaint;
