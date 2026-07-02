const express = require('express');
const router = express.Router();
const { getDoctors } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// All user routes require authentication
router.use(protect);

router.get('/doctors', getDoctors);

module.exports = router;
