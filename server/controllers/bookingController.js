const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');

exports.bookEvent = async (req, res) => {
    const { eventId } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const student = await User.findById(req.user.id);
        if (!student || student.role !== 'student') {
            return res.status(403).json({ message: 'Only students can book events' });
        }

        const existingBooking = await Booking.findOne({ event: eventId, student: req.user.id });
        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked this event' });
        }

        const booking = new Booking({
            event: eventId,
            student: req.user.id,
        });

        await booking.save();
        res.status(201).json({ message: 'Event booked successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error booking event', error });
    }
};

exports.getStudentBookings = async (req, res) => {
    try {
        console.log('Fetching bookings for student ID:', req.user.id);

        const bookings = await Booking.find({ student: req.user.id })
            .populate({
                path: 'event',
                select: 'title date location',
            })
            .populate({
                path: 'student',
                select: 'name email',
            });

        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this student.' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

exports.getBookedStudentsForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const bookings = await Booking.find({ event: req.params.eventId })
            .populate('student', 'name email department yearOfStudy')
            .populate('event', 'title date location');

        if (bookings.length === 0) {
            return res.status(200).json({ message: 'No students have booked this event' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booked students', error });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.student.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }

        await booking.remove();
        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error });
    }
};

exports.getStudentsByEvents = async (req, res) => {
    try {
        console.log('Fetching students by events');

        const bookings = await Booking.aggregate([
            {
                $lookup: {
                    from: 'events',
                    localField: 'event',
                    foreignField: '_id',
                    as: 'eventDetails'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'student',
                    foreignField: '_id',
                    as: 'studentDetails'
                }
            },
            {
                $unwind: '$eventDetails'
            },
            {
                $unwind: '$studentDetails'
            },
            {
                $group: {
                    _id: '$event',
                    eventDetails: { $first: '$eventDetails' },
                    students: { $push: '$studentDetails' }
                }
            },
            {
                $project: {
                    _id: 0,
                    eventDetails: 1,
                    students: 1
                }
            }
        ]);

        if (!bookings.length) {
            return res.status(404).json({ message: 'No students found for any events.' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching students by events:', error);
        res.status(500).json({ message: 'Error fetching students by events', error });
    }
};
