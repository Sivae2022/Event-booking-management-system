// src/pages/MyBookedEvents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyBookedEvents = () => {
    const [bookedEvents, setBookedEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookedEvents = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/booking/get', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookedEvents(response.data);
            } catch (error) {
                toast.error('Failed to fetch booked events');
            }
        };
        fetchBookedEvents();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold">My Booked Events</div>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate('/student-dashboard')}
                        className="hover:bg-blue-700 px-4 py-2 rounded"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Booked Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookedEvents.map((event) => (
                        <div key={event._id} className="bg-gray-200 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p className="text-gray-700">{event.description}</p>
                            <p className="text-gray-600"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p className="text-gray-600"><strong>Location:</strong> {event.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBookedEvents;
