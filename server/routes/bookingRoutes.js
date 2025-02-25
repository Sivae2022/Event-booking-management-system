const express = require('express');
const router = express.Router();
const { auth, isStaff, isStudent } = require('../middleware/authMiddleware');
const {
    bookEvent,
    getStudentBookings,
    cancelBooking,
    getBookedStudentsForEvent,
    getStudentsByEvents, // Ensure this is imported only once
} = require('../controllers/bookingController');

// Define routes
router.post('/book', auth, bookEvent);
router.get('/get', auth, getStudentBookings);
router.delete('/cancel/:id', auth, cancelBooking); // Route to cancel a booking
router.get('/booked-students/:eventId', auth, isStaff, getBookedStudentsForEvent); // Route for staff to get students who booked a specific event
router.get('/students-by-events', auth, isStaff, getStudentsByEvents); // Route for staff to get all students by events

module.exports = router;
