const { queryData,
    queryAvgTemperature,
    queryAvgAltitude,
    queryPosition,
    checkIfExists,
    createSensor
} = require('../service/sensor-service');

const sendData = async (req, res) => {
    const data = req.body;
    const check = await checkIfExists(data);
    let sendData;

    if(check) {
        sendData = await queryData(data);
    } else {
        sendData = await createSensor(data);
    }

    if(sendData.errors) res.json(sendData._message);

    res.json(sendData);
}

const getTemp = async (req, res) => {
    const temperature = await queryAvgTemperature();
    if(temperature.errors) res.json(temperature._message);
    res.json(temperature);
}

const getAltitude = async (req, res) => {
    const altitude = await queryAvgAltitude();
    if(altitude.errors) res.json(altitude._message);
    res.json(altitude);
}

const getPosition = async (req, res) => {
    const position = await queryPosition();
    if(position.errors) res.json(position._message);
    res.json(position);
}

exports.sendData = sendData;
exports.getTemp = getTemp;
exports.getAltitude = getAltitude;
exports.getPosition = getPosition;
