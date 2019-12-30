const { Station } = require('../model/station');
const googleGeometry = require('spherical-geometry-js');

async function findStations(req, res) {
    const stations = await Station.find();
    res.send(stations);
}

async function findNearMe(req, res){
    const myLocation = [40.3436811, 18.5242391];
    const stations = await Station.find();

    const filtered = stations.filter(s => distanceBetween(myLocation, s.coordinates) < 15);
    res.send(filtered);
}

async function findNearest(req, res){
    const myLocation = [40.3436811, 18.5242391];
    const stations = await Station.find();
    if(stations.length === 0)
        return res.status(400).send("No Station in the system..");

    const nearest = nearestStation(myLocation,stations);
    res.send(nearest);
}

async function findStationById(req, res) {
    const station = await Station.findById(req.params.id);
    if(!station)
        return res.status(404).send("No Station with provided ID");

    res.send(station);
}

async function createStation(req, res){
    let station = await Station.findOne({name: req.body.name});
    if(station)
        return res.status(400).send("There is a station with the same name..");

    station = new Station({
        name: req.body.name,
        availableBikes: req.body.availableBikes,
        coordinates: req.body.coordinates
    });
    await station.save();
    res.send(station);
}

function distanceBetween(point1, point2){
    return googleGeometry.computeDistanceBetween(point1, point2, googleGeometry.EARTH_RADIUS);
}

function nearestStation(myLocation, stations){
    let nearest = stations[0];
    let nearestDistance = distanceBetween(myLocation, nearest.coordinates);
    for (let station in stations) {
        let dis = distanceBetween(myLocation, station.coordinates);
        if(dis < nearestDistance){
            nearest = station;
            nearestDistance = dis;
        }
    }
    return nearest;
}

module.exports = {
    findStations: findStations,
    findNearMe: findNearMe,
    findStationById: findStationById,
    createStation: createStation
};