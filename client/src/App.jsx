// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentHome from './pages/StudentHome';
import StaffHome from './pages/StaffHome';
import PostEvent from '../src/components/PostEvent';
import LandingPage from './pages/Landing';
import ProtectedRoute from './components/proRoutes';
import UpdateEvent from './components/UpdateEvent';
import BookedStudents from './components/bookenStudent';
import StudentDashboard from './pages/studentHome'; // Correct import for StudentDashboard
import BookEvent from './components/BookEvent'; // Correct import for BookEvent
import MyBookedEvents from './pages/MyBookedEvents'; // Correct import for MyBookedEvents
import BS from './components/BS';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/bs" element={< BS/>} />
                <Route
                    path="/student-home"
                    element={
                        <ProtectedRoute element={<StudentHome />} />
                    }
                />
                <Route
                    path="/staff-home"
                    element={
                        <ProtectedRoute element={<StaffHome />} />
                    }
                />
                <Route
                    path="/post-event"
                    element={
                        <ProtectedRoute element={<PostEvent />} />
                    }
                />
                <Route
                    path="/update-event/:eventId"
                    element={
                        <ProtectedRoute element={<UpdateEvent />} />
                    }
                />
                <Route
                    path="/booked-students/:eventId"
                    element={
                        <ProtectedRoute element={<BookedStudents />} />
                    }
                />
                <Route
                    path="/student-dashboard"
                    element={
                        <ProtectedRoute element={<StudentDashboard />} />
                    }
                />
                <Route
                    path="/book-event/:eventId"
                    element={
                        <ProtectedRoute element={<BookEvent />} />
                    }
                />
                <Route
                    path="/my-booked-events"
                    element={
                        <ProtectedRoute element={<MyBookedEvents />} />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
