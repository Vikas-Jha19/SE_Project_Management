const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'SE_Project_2024';


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized access' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden access' });
        req.user = user; 
        next(); 
    });
};

module.exports = authenticateToken;
