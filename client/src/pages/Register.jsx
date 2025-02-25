import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/register', { name, email, password, role });
            toast.success('Registration successful!');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-white">
            <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl max-w-md w-full relative">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-800 text-sm font-medium mb-2">Role</label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="student"
                                    checked={role === 'student'}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="form-radio h-5 w-5 text-purple-600"
                                />
                                <span className="ml-2 text-gray-700">Student</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="staff"
                                    checked={role === 'staff'}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="form-radio h-5 w-5 text-purple-600"
                                />
                                <span className="ml-2 text-gray-700">Staff</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105 duration-300 ease-in-out w-full"
                        >
                            Register
                        </button>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
