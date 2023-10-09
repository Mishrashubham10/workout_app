const express = require('express');
require('dotenv').config();
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const { default: mongoose } = require('mongoose');

// express app
const app = express();

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/workouts' ,workoutRoutes);
app.use('/api/user', userRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
app.listen(process.env.PORT, () => {
    console.log('Connected to db & listening on port', process.env.PORT);
})
    })
    .catch(err => console.log(err));