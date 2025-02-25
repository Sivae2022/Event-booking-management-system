// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// const isStudent = (req, res, next) => {
//     if (req.user.role === 'student') {
//         next();
//     } else {
//         res.status(403).json({ message: 'Access denied. Student access only.' });
//     }
// };

// const isStaff = (req, res, next) => {
//     if (req.user.role === 'staff') {
//         next();
//     } else {
//         res.status(403).json({ message: 'Access denied. Staff access only.' });
//     }
// };

// module.exports = { auth, isStudent, isStaff };

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        // Check if the Authorization header exists
        if (!authHeader) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Extract and clean the token from the header
        const token = authHeader.replace('Bearer ', '');

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Student access only.' });
    }
};

const isStaff = (req, res, next) => {
    if (req.user && req.user.role === 'staff') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Staff access only.' });
    }
};

module.exports = { auth, isStudent, isStaff };
