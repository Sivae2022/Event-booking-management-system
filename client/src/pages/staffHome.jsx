import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const StaffHome = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/event/get', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEvents(response.data);
            } catch {
                toast.error('Failed to fetch event details');
            }
        };

        fetchEventDetails();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/event/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(events.filter(event => event._id !== id));
            toast.success('Event deleted successfully');
        } catch {
            toast.error('Failed to delete event');
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update-event/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
                <div className="text-2xl font-bold">Staff Dashboard</div>
                <div className="space-x-4 flex items-center">
                    <Link to="/post-event" className="hover:bg-blue-700 px-4 py-2 rounded transition-colors">Post Event</Link>
                    <Link to='/bs' className="hover:bg-blue-700 px-4 py-2 rounded transition-colors">Booked Students</Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Welcome to the Staff Dashboard</h1>

                <div className="mb-6">
                    <h2 className="text-3xl font-semibold mb-4 text-center text-gray-700">Event Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div key={event._id} className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-shadow">
                                <h3 className="text-2xl font-bold mb-2 text-gray-800">{event.title}</h3>
                                <p className="text-gray-700 mb-2">{event.description}</p>
                                <p className="text-gray-500 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                                <p className="text-gray-500 mb-2">Location: {event.location}</p>
                                <p className="text-gray-500 mb-2">Fees: ${event.fees}</p>
                                <p className="text-gray-500 mb-4">Rules: {event.rules}</p>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => handleUpdate(event._id)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffHome;
