// src/components/BookEvent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const BookEvent = () => {
    const [studentDetails, setStudentDetails] = useState({
        name: '',
        email: '',
        department: '',
        yearOfStudy: '',
        phone_number: '',
    });
    const { eventId } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setStudentDetails({
            ...studentDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleBookEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        try {
            // Step 1: Add student details to the database with the token in headers
            const studentResponse = await axios.post('http://localhost:5000/student/add', studentDetails, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to headers
                },
            });
            const studentId = studentResponse.data._id;

            // Step 2: Book the event for the student with the token in headers
            const bookingResponse = await axios.post('http://localhost:5000/booking/book', {
                eventId,
                studentId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to headers
                },
            });

            toast.success('Event booked successfully');
            navigate('/my-booked-events');  // Redirect to the My Booked Events page after booking
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to book event');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold">Book Event</div>
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
                <h2 className="text-2xl font-semibold mb-4">Book an Event</h2>
                <form onSubmit={handleBookEvent}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={studentDetails.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={studentDetails.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="department">Department</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={studentDetails.department}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="yearOfStudy">Year of Study</label>
                        <input
                            type="text"
                            id="yearOfStudy"
                            name="yearOfStudy"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={studentDetails.yearOfStudy}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone_number">Phone Number</label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={studentDetails.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Book Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookEvent;
