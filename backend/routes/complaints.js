const express = require('express');
const router = express.Router();
const multer = require('multer');

const { addComplaint, getComplaints, getAllComplaints, updateStatus, assignComplaint } =
    require('../controllers/complaintController');

const { protect } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// uploads to /uploads
const upload = multer({ dest: 'uploads/' });

/**
 * =========================
 * PHASE 1 (Citizen)
 * =========================
 */

// Citizen submits complaint (with optional image)
router.post('/', protect, upload.single('image'), addComplaint);

// Citizen gets THEIR complaints (you can keep this as citizen-only if your controller filters by req.user.id)
router.get('/', protect, getComplaints);

/**
 * =========================
 * PHASE 2 (Staff/Admin)
 * =========================
 */

// Staff/Admin: view ALL complaints
router.get('/all', protect, role('staff', 'admin'), getAllComplaints);

// Staff/Admin: update status (OPEN → IN_PROGRESS → RESOLVED)
router.patch('/:id/status', protect, role('staff', 'admin'), updateStatus);

// Admin: assign complaint to staff
router.patch('/:id/assign', protect, role('admin'), assignComplaint);

module.exports = router;

