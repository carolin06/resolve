const Complaint = require('../models/Complaint');
const User = require('../models/User'); // needed for assigning validation (optional)

exports.addComplaint = async (req, res) => {
    const { type, description, location } = req.body;
    const image_url = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const user_id = req.user.id;

    try {
        const complaint = new Complaint({
            user: user_id,
            type,
            description,
            location,
            image_url,
            status: 'OPEN', // safe default
        });

        await complaint.save();

        // populate user when returning
        const populated = await Complaint.findById(complaint._id).populate('user', 'name email role');
        res.json(populated);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * Citizen route (recommended):
 * Citizens should see only their own complaints.
 * Staff/Admin should use /all route.
 */
exports.getComplaints = async (req, res) => {
    try {
        const role = req.user.role;

        // If citizen -> show only their complaints
        const filter = role === 'citizen' ? { user: req.user.id } : {};

        const complaints = await Complaint.find(filter)
            .populate('user', 'name email role')
            .populate('assignedTo', 'name email role')
            .sort({ createdAt: -1 });

        res.json(complaints);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// =======================
// PHASE 2 FUNCTIONS
// =======================

// Staff/Admin: get all complaints
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate('user', 'name email role')
            .populate('assignedTo', 'name email role')
            .sort({ createdAt: -1 });

        res.json(complaints);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Staff/Admin: update complaint status
exports.updateStatus = async (req, res) => {
    const { status } = req.body;

    // basic validation
    const allowed = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];
    if (!allowed.includes(status)) {
        return res.status(400).json({ msg: 'Invalid status' });
    }

    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

        complaint.status = status;

        // if resolved, set resolvedAt
        if (status === 'RESOLVED') {
            complaint.resolvedAt = new Date();
        } else {
            complaint.resolvedAt = null;
        }

        await complaint.save();

        const updated = await Complaint.findById(complaint._id)
            .populate('user', 'name email role')
            .populate('assignedTo', 'name email role');

        res.json(updated);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Admin: assign complaint to a staff user
exports.assignComplaint = async (req, res) => {
    const { staffId } = req.body;

    if (!staffId) return res.status(400).json({ msg: 'staffId is required' });

    try {
        // optional validation: ensure staff exists and has role staff/admin
        const staffUser = await User.findById(staffId);
        if (!staffUser) return res.status(404).json({ msg: 'Staff user not found' });

        if (!['staff', 'admin'].includes(staffUser.role)) {
            return res.status(400).json({ msg: 'Assigned user must be staff/admin' });
        }

        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

        complaint.assignedTo = staffId;
        await complaint.save();

        const updated = await Complaint.findById(complaint._id)
            .populate('user', 'name email role')
            .populate('assignedTo', 'name email role');

        res.json(updated);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
