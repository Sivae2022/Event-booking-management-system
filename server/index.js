require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const studentRoutes= require('./routes/studentsRoutes');
const bookingRoutes = require('./routes/bookingRoutes');


// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/event', eventRoutes);
app.use('/student', studentRoutes);
app.use('/booking', bookingRoutes);


// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
