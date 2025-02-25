const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    yearOfStudy: { type: Number, required: true },
    phone_number: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
