const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    image_url: { type: String },
    status: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED'], default: 'OPEN' }
    ,
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
    },

    slaHours: {
        type: Number,
        default: 48
    },

    resolvedAt: {
        type: Date,
        default: null
    },

    escalated: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
