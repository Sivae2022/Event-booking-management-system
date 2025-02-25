const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register function without manual password hashing
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Directly create and save the user (password hashing will be done by the pre-save hook)
        const user = new User({ name, email, password, role });
        await user.save();

        // Respond with success
        res.status(201).json({ user, message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
};

// Login function remains the same
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Compare the provided password with the stored hashed password
        console.log('Hashed password:', user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate and send the JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
