// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { auth, isStudent } = require('../middleware/authMiddleware');
const {
    getStudentProfile,
    updateStudentProfile,
    deleteStudentProfile,
    createStudent,
} = require('../controllers/studentController');


router.post('/add',auth,isStudent,createStudent);
router.get('/get', auth, isStudent, getStudentProfile);
router.put('/profile', auth, isStudent, updateStudentProfile);
router.delete('/profile', auth, isStudent, deleteStudentProfile);

module.exports = router;
