const express = require('express');
const router = express.Router();

const { sendData, getTemp, getAltitude, getPosition } = require('../controllers/sensor-controllers');

router.post('/', sendData)

router.get('/avg-temperature', getTemp);

router.get('/avg-altitude', getAltitude);

router.get('/position', getPosition);

module.exports = router;