const Student = require('../models/Student'); // Make sure to use the correct model name

// Create a new Student
exports.createStudent = async (req, res) => {
    const { name, email, department, yearOfStudy, phone_number } = req.body;
    try {
        // Check for missing fields
        if (!name || !email || !department || !yearOfStudy || !phone_number) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new student instance
        const student = new Student({
            name,
            email,
            department,
            yearOfStudy,
            phone_number
        });

        // Save the student to the database
        await student.save();
        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Error creating student', error });
    }
};

// Get Student Profile
exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student profile', error });
    }
};

// Update Student Profile
exports.updateStudentProfile = async (req, res) => {
    const { name, email, department, yearOfStudy } = req.body;
    try {
        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update student fields
        student.name = name || student.name;
        student.email = email || student.email;
        student.department = department || student.department;
        student.yearOfStudy = yearOfStudy || student.yearOfStudy;
        student.updated_at = Date.now();

        // Save the updated student
        await student.save();
        res.status(200).json({ message: 'Student profile updated successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student profile', error });
    }
};

// Delete Student Profile
exports.deleteStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Delete the student profile
        await student.remove();
        res.status(200).json({ message: 'Student profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student profile', error });
    }
};
