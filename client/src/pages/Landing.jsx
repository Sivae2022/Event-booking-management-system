import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url('https://wallpapercave.com/wp/wp7488230.jpg')` }}
        >
            <div className="bg-gradient-to-r from-black via-transparent to-black p-12 rounded-3xl shadow-lg text-center max-w-4xl">
                <h1 className="text-6xl font-bold text-white mb-6 tracking-wide">
                    Welcome to College Event Management System
                </h1>
                <p className="text-xl text-gray-200 mb-12">
                    Manage your college events seamlessly. Whether you're a student looking to participate or staff managing events, our platform makes it easy and efficient.
                </p>
                <div className="flex justify-center gap-6">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-8 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-green-800 hover:bg-green-900 text-white font-semibold py-4 px-8 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-green-500 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
