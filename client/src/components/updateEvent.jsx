// src/components/UpdateEvent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [fees, setFees] = useState('');
    const [rules, setRules] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:5000/event/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEvent(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setDate(response.data.date);
                setLocation(response.data.location);
                setFees(response.data.fees);
                setRules(response.data.rules);
            } catch {
                toast.error('Failed to fetch event details');
            }
        };

        fetchEvent();
    }, [id]);

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/event/update/${id}`, {
                title, description, date, location, fees, rules
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Event updated successfully');
            navigate('/staff-home');
        } catch {
            toast.error('Failed to update event');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
            <form onSubmit={handleUpdateEvent} className="bg-white p-6 shadow-md rounded-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">Event Title</label>
                    <input
                        type="text"
                        id="title"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">Event Description</label>
                    <textarea
                        id="description"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="date">Event Date</label>
                    <input
                        type="date"
                        id="date"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="location">Event Location</label>
                    <input
                        type="text"
                        id="location"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fees">Event Fees</label>
                    <input
                        type="number"
                        id="fees"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="rules">Event Rules</label>
                    <textarea
                        id="rules"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={rules}
                        onChange={(e) => setRules(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default UpdateEvent;
