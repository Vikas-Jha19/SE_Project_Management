const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); 
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const milestoneRoutes = require('./routes/milestoneRoutes');  
const insightsRoutes = require('./routes/insightsRoutes');  

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
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


app.use('/api/projects', authenticateToken, projectRoutes);


app.use('/api/milestones', authenticateToken, milestoneRoutes);  


app.use('/api/users', userRoutes);

app.use('/api/insights', authenticateToken, insightsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
