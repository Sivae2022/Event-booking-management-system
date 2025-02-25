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
        const token = localStorage.getItem('token');
        try {
            const studentResponse = await axios.post('http://localhost:5000/student/add', studentDetails, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const studentId = studentResponse.data._id;

            await axios.post('http://localhost:5000/booking/book', {
                eventId,
                studentId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success('Event booked successfully');
            navigate('/my-booked-events');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to book event');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center">
            <nav className="w-full bg-purple-700 text-white p-4 flex justify-between items-center fixed top-0 left-0 shadow-lg z-10">
                <div className="text-2xl font-bold">Book Event</div>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate('/student-dashboard')}
                        className="hover:bg-purple-800 px-4 py-2 rounded transition duration-300"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="flex-1 flex items-center justify-center mt-16 w-full p-6">
                <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Book an Event</h2>
                    <form onSubmit={handleBookEvent}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                value={studentDetails.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                value={studentDetails.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="department">Department</label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                value={studentDetails.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="yearOfStudy">Year of Study</label>
                            <input
                                type="text"
                                id="yearOfStudy"
                                name="yearOfStudy"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                value={studentDetails.yearOfStudy}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone_number">Phone Number</label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                value={studentDetails.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full"
                        >
                            Book Event
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookEvent;
