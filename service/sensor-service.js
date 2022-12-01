const SensorModel = require('../models/Sensor');

const checkIfExists = async (body) => {
    const { sensorId } = body;
    return await SensorModel.findOne({ sensorId: sensorId }).count() > 0;
} 

const createSensor = async (body) => {
    const { sensorId, time, x, y, temperature, altitude } = body;

    let sensor;
    
    try {
        sensor = await SensorModel.create({
            sensorId: sensorId,
            measurments: [{
                time: time,
                x: x,
                y: y,
                temperature: temperature,
                altitude: altitude
            }]
        });
        console.log(sensor);
    } catch(error) {
        return error;
    }
    return sensor;
}

const queryData = async (body) => {
    const { sensorId, time, x, y, temperature, altitude } = body;
    let sensor;
    try {
        sensor = await SensorModel.findOneAndUpdate({ sensorId: sensorId }, {
            $push: { measurments: {
                time: time,
                x: x,
                y: y,
                temperature: temperature,
                altitude: altitude
            } }
        });
    } catch(error) {
        return error;
    }

    return sensor;
}

const queryAvgTemperature = async () => {
    let temp;

    try {
        temp = await SensorModel.aggregate([
            { $unwind: { path: '$measurments' } },
            { $group: { 
                    _id: '$sensorId',
                    avgTemp: { $avg: '$measurments.temperature' }
                } 
            }
        ])
    } catch(error) {
        return error;
    }

    return temp;
}

const queryAvgAltitude = async () => {
    let altitude;

    try {
        altitude = await SensorModel.aggregate([
            { $unwind: { path: '$measurments' } },
            { $group: { 
                    _id: '$sensorId',
                    avgAltitude: { $avg: '$measurments.altitude' }
                } 
            }
        ])
    } catch(error) {
        return error;
    }

    return altitude;
}

const queryPosition = async () => {
    let position;

    try {
        position = await SensorModel.aggregate([
            { $unwind: { path: '$measurments' } },
            { $sort : { 'measurments.time': -1 } },
            { $limit: 1 },
            { 
                $project: {
                    _id: 0,
                    sensorId: '$sensorId',
                    x: '$measurments.x',
                    y: '$measurments.y'
                } 
            }
        ])
    } catch(error) {
        return error;
    }

    return position;
}

exports.queryData = queryData;
exports.queryAvgTemperature = queryAvgTemperature;
exports.queryAvgAltitude = queryAvgAltitude;
exports.queryPosition = queryPosition;
exports.checkIfExists = checkIfExists;
exports.createSensor = createSensor;