import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            const { token, role } = response.data;
            localStorage.setItem('token', token);

            if (role === 'student') {
                navigate('/student-home');
            } else if (role === 'staff') {
                navigate('/Staff-home');
            }
            toast.success('Login successful!');
        } catch (e) {
            if (e.response) {
                toast.error(e.response.data.message || 'Login failed');
            } else if (e.request) {
                toast.error('No response from server');
            } else {
                toast.error('Login failed');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-300 to-white">
            <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl max-w-md w-full relative">
                <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
                <p className="text-center text-gray-600 mb-8">
                    Please enter your credentials to login.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="email">Email Address</label>
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
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105 duration-300 ease-in-out w-full"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
