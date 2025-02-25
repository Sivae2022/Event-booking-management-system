// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    fees: {
        type: Number,
        default: 0,
    },
    rules: {
        type: String,
        default: '',
    },
    image: {  // Correctly placed image field
        type: String,
        default: '',
    },
    organizer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
