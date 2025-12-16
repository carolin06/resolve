const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addComplaint, getComplaints } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.single('image'), addComplaint);
router.get('/', protect, getComplaints);

module.exports = router;
