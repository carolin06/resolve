const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    image_url: { type: String },
    status: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED'], default: 'OPEN' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
