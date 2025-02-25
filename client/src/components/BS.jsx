import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ViewBookedStudents = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookedStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    toast.error('No token found, please log in.');
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:5000/booking/students-by-events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching booked students:', error);
                toast.error(error.response?.data?.message || 'Failed to fetch booked students');
            }
        };

        fetchBookedStudents();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 flex flex-col items-center">
            <nav className="bg-white text-gray-800 w-full p-4 flex justify-between items-center shadow-lg rounded-b-lg mb-6">
                <div className="text-xl font-bold">Booked Students</div>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate('/staff-dashboard')}
                        className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                        className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-4xl">
                <h2 className="text-3xl font-semibold mb-6 text-gray-900">Booked Students List</h2>
                {bookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{booking.eventDetails.title}</h3>
                                <p className="text-gray-700 mb-1"><strong>Student Names:</strong> {booking.students.map(student => student.name).join(', ')}</p>
                                <p className="text-gray-700 mb-1"><strong>Emails:</strong> {booking.students.map(student => student.email).join(', ')}</p>
                                <p className="text-gray-700 mb-1"><strong>Departments:</strong> {booking.students.map(student => student.department).join(', ')}</p>
                                <p className="text-gray-700 mb-1"><strong>Year of Study:</strong> {booking.students.map(student => student.yearOfStudy).join(', ')}</p>
                                <p className="text-gray-700 mb-1"><strong>Phone Numbers:</strong> {booking.students.map(student => student.phone_number).join(', ')}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">No students have booked any events yet.</p>
                )}
            </div>
        </div>
    );
};

export default ViewBookedStudents;
