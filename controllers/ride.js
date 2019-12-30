const { Ride } = require('../model/ride');
const { User } = require('../model/user');
const { Station } = require('../model/station');

const mongoose = require("mongoose");
const Fawn = require('fawn');

Fawn.init(mongoose);

async function findRide(req, res){
    const ride = await Ride.findById(req.params.id);
    if(!ride)
        return res.status(404).send("Ride not Found");
    res.send(ride);
}

async function startRide(req, res){
    const user = req.user;
    if(user.inRide)
        return res.status(400).send("User in a Ride");

    const station = req.station;
    if(station.availableBikes === 0)
        return res.status(400).send("No available Bikes in the Station..");

    const ride = Ride({
        userId: user._id,
        startCoordinates: station.coordinates
    });

    try {
        new Fawn.Task()
            .save('rides', ride)
            .update('users', {_id: user._id},{
                $set: {inRide: true}
            })
            .update('stations',{_id: station._id}, {
                $inc: {availableBikes: -1}
            })
            .run();
        res.send(`${user.name} started a ride at ${ride.startTime} from station ${station.name}..`);
    }
    catch (e) {
        res.status(500).send('Something failed.');
    }
}

async function endRide(req, res){
    let user = req.user;
    if(!user.inRide)
        return res.status(400).send("User is not in a Ride");

    let station = req.station;

    let ride = await Ride.findById(req.params.id);
    if(!ride)
        return res.status(404).send("Ride not Found");

    ride.endData = Date.now();
    ride.endCoordinates = station.coordinates;

    const distance = {};
    const reward = {};

    try {
        new Fawn.Task()
            .save('rides', ride)
            .update('users', {_id: user._id},{
                $set: {inRide: false}
            })
            .update('stations',{_id: station._id}, {
                $inc: {availableBikes: 1}
            })
            .run();
        res.send(`${user.name} finished a ride at ${ride.endTime} at station ${station.name}..`);
    }
    catch (e) {
        res.status(500).send('Something failed.');
    }
}

async function findUser(req, res, next){
    const user = await User.findById(req.body.userId);
    if(!user)
        return res.status(400).send("User not Found");
    req.user = user;
    next();
}

async function findStation(req, res, next){
    const station = await Station.findById(req.body.stationId);
    if(!station)
        return res.status(400).send("Station not Found");
    req.station = station;
    next();
}

module.exports = {
    findRide: findRide,
    startRide: startRide,
    endRide: endRide,
    findUser: findUser,
    findStation: findStation
};
