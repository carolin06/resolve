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
            alert(err.response.data.msg || 'Error');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Submit Complaint</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input type="text" name="type" placeholder="Type of issue" onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} />
                <textarea name="description" placeholder="Description" onChange={handleChange} required />
                <input type="file" onChange={handleImage} />
                <button type="submit" className="bg-green-600 text-white py-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default SubmitComplaint;
