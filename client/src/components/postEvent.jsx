import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [fees, setFees] = useState('');
    const [rules, setRules] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'your_upload_preset');

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
                setImageUrl(response.data.secure_url);
                setImage(file);
            } catch (error) {
                toast.error('Failed to upload image');
            }
        }
    };

    const handlePostEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/event/add', {
                title, description, date, location, fees, rules, image: imageUrl
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Event posted successfully');
            navigate('/staff-home');
        } catch (error) {
            toast.error('Failed to post event');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 flex flex-col items-center">
            <nav className="bg-gray-800 text-white w-full p-4 flex justify-between items-center rounded-lg shadow-lg mb-8">
                <div className="text-xl font-bold">Staff Dashboard</div>
                <div className="space-x-4">
                    <a href="/staff-home" className="hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Home</a>
                    <a href="/post-event" className="hover:bg-gray-700 px-4 py-2 rounded transition duration-300">Post Event</a>
                    <button
                        onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Post an Event</h2>
                <form onSubmit={handlePostEvent}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">Event Title</label>
                        <input
                            type="text"
                            id="title"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">Event Description</label>
                        <textarea
                            id="description"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="date">Event Date</label>
                        <input
                            type="date"
                            id="date"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="location">Event Location</label>
                        <input
                            type="text"
                            id="location"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fees">Event Fees</label>
                        <input
                            type="number"
                            id="fees"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="rules">Event Rules</label>
                        <textarea
                            id="rules"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            value={rules}
                            onChange={(e) => setRules(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="image">Event Image</label>
                        <input
                            type="file"
                            id="image"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            onChange={handleImageUpload}
                        />
                        {imageUrl && <img src={imageUrl} alt="Event" className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto" />}
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 w-full"
                    >
                        Post Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostEvent;
