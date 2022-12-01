const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
    sensorId: { type: String, required: true },
    startedAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    recentAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    measurments: [
        {
            time: { type: Date, required: true },
            x: { type: String, required: true },
            y: { type: String, required: true },
            temperature: { type: Number, required: true },
            altitude: { type: Number, required: true },
        }
    ]
});

const SensorModel = mongoose.model('Sensor', SensorSchema);

module.exports = SensorModel;
