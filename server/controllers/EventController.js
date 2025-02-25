// // controllers/eventController.js
// const Event = require('../models/Event');

// exports.createEvent = async (req, res) => {
//     const { title, description, date, location, fees, rules } = req.body;
//     try {
//         const event = new Event({
//             title,
//             description,
//             date,
//             location,
//             fees,
//             rules,
//             organizer_id: req.user.id,
//         });
//         await event.save();

        
//         res.status(201).json({ message: 'Event created successfully', event });
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating event', error });
//     }
// };

// exports.getEvents = async (req, res) => {
//     try {
//         const events = await Event.find().populate('organizer_id', 'name email');
//         res.status(200).json(events);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching events', error });
//     }
// };

// exports.getEventById = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.id).populate('organizer_id', 'name email');
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(200).json(event);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching event', error });
//     }
// };

// exports.updateEvent = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.id);
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         if (event.organizer_id.toString() !== req.user.id) {
//             return res.status(403).json({ message: 'Not authorized to update this event' });
//         }

//         Object.assign(event, req.body);
//         await event.save();
//         res.status(200).json({ message: 'Event updated successfully', event });
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating event', error });
//     }
// };

// exports.deleteEvent = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.id);
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         if (event.organizer_id.toString() !== req.user.id) {
//             return res.status(403).json({ message: 'Not authorized to delete this event' });
//         }

//         await event.remove();
//         res.status(200).json({ message: 'Event deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting event', error });
//     }
// };
// controllers/eventController.js
const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
    const { title, description, date, location, fees, rules, image } = req.body;
    try {
        const event = new Event({
            title,
            description,
            date,
            location,
            fees,
            rules,
            image,  // Add image URL to the event
            organizer_id: req.user.id,
        });
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer_id', 'name email');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizer_id', 'name email');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};


// Update an existing event
// Update an existing event
exports.updateEvent = async (req, res) => {
    // Log the request details for debugging purposes
    console.log('Received request to update event:', {
        requestId: req.params.id,
        requestBody: req.body,
        user: req.user
    });

    try {
        // Find the event by ID
        const event = await Event.findById(req.params.id);

        // Check if the event exists
        if (!event) {
            console.error(`Event with ID ${req.params.id} not found.`);
            return res.status(404).json({
                success: false,
                message: 'Event not found',
                error: `No event found with ID ${req.params.id}`
            });
        }

        // Check if the user is authorized to update the event
        if (event.organizer_id.toString() !== req.user.id) {
            console.error(`User ${req.user.id} is not authorized to update event ${req.params.id}.`);
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this event',
                error: `User ${req.user.id} is not the organizer of this event`
            });
        }

        // Log the event details before the update
        console.log('Event details before update:', {
            id: event._id,
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            fees: event.fees,
            rules: event.rules,
            image: event.image
        });

        // Update the event with new data from the request body
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;
        event.fees = req.body.fees || event.fees;
        event.rules = req.body.rules || event.rules;
        event.image = req.body.image || event.image;  // Update image URL if provided

        // Log the updated event details
        console.log('Event details after update:', {
            id: event._id,
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            fees: event.fees,
            rules: event.rules,
            image: event.image
        });

        // Save the updated event
        await event.save();

        // Respond with a success message and the updated event details
        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error updating event:', error);

        // Respond with an error message and details
        res.status(400).json({
            success: false,
            message: 'Error updating event',
            error: error.message
        });
    }
};

// Delete an event// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        console.debug('Delete Event Request - Parameters:', req.params, 'User:', req.user.id);

        // Find the event by ID
        const event = await Event.findById(req.params.id);
        if (!event) {
            console.warn(`Event with ID ${req.params.id} not found. User: ${req.user.id} attempted to delete it.`);
            return res.status(404).json({ message: 'Event not found' });
        }

        console.debug('Event Found:', event);

        // Check if the event organizer ID is defined and if the user is authorized to delete the event
        if (!event.organizer_id) {
            console.warn(`Event with ID ${req.params.id} has no organizer associated. Deletion attempt by User: ${req.user.id}`);
            return res.status(403).json({ message: 'Event has no organizer associated, cannot delete' });
        }

        if (event.organizer_id.toString() !== req.user.id) {
            console.warn(`Unauthorized deletion attempt. User: ${req.user.id} is not the organizer of Event ID: ${req.params.id}`);
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        // Delete the event
        await event.remove();

        console.debug(`Event deleted successfully. Event ID: ${event._id}, Deleted by User: ${req.user.id}`);

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', {
            message: error.message,
            stack: error.stack,
            params: req.params,
            user: req.user ? req.user.id : 'Unknown',
            potentialReasons: [
                'Database connectivity issues',
                'Event ID is malformed or invalid',
                'User session may be expired or invalid'
            ],
            suggestedFixes: [
                'Ensure the database connection is stable',
                'Check the event ID format and ensure it matches the expected pattern',
                'Verify that the user is logged in and has a valid session'
            ]
        });

        res.status(500).json({ message: 'Error deleting event', error });
    }
};
