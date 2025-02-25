import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentDashboard = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/event/get', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(response.data);
            } catch (error) {
                toast.error('Failed to fetch events');
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6 flex flex-col items-center">
            <nav className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-4 mb-6 flex justify-between items-center">
                <div className="text-3xl font-bold text-gray-800">Student Dashboard</div>
                <div className="space-x-4">
                    <Link to="/student-dashboard" className="text-indigo-700 hover:text-indigo-900 transition duration-300 text-lg font-medium">Dashboard</Link>
                    <Link to="/my-booked-events" className="text-indigo-700 hover:text-indigo-900 transition duration-300 text-lg font-medium">My Booked Events</Link>
                    <button
                        onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-lg font-medium"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6">Available Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <div key={event._id} className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                            <p className="text-gray-700 mb-2">{event.description}</p>
                            <p className="text-gray-600 mb-1"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p className="text-gray-600 mb-1"><strong>Location:</strong> {event.location}</p>
                            <p className="text-gray-600 mb-1"><strong>Fees:</strong> {event.fees ? `$${event.fees}` : 'Free'}</p>
                            <p className="text-gray-600 mb-4"><strong>Rules:</strong> {event.rules}</p>
                            <Link to={`/book-event/${event._id}`}>
                                <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                                    Book Event
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
