const Complaint = require('../models/Complaint');

exports.addComplaint = async (req, res) => {
    const { type, description, location } = req.body;
    const image_url = req.file ? req.file.path : null;
    const user_id = req.user.id;

    try {
        const complaint = new Complaint({
            user: user_id,
            type,
            description,
            location,
            image_url
        });
        await complaint.save();
        res.json(complaint);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('user', 'name email').sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
