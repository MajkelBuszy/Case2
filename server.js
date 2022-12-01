require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const sensorRoutes = require('./routes/sensor-routes');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PATCH, GET, DELETE');
    next();
});

app.use('/api/sensor', sensorRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
});