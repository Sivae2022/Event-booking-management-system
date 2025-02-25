// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { auth, isStaff } = require('../middleware/authMiddleware');
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} = require('../controllers/EventController');

router.post('/add', auth, isStaff, createEvent);
router.get('/get', auth, getEvents);
router.get('/:id', auth, getEventById);
router.put('/update/:id', auth, isStaff, updateEvent);
router.delete('/delete/:id', auth, isStaff, deleteEvent);

module.exports =router;
