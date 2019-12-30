const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const rideSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        default: Date.now()
    },
    endTime: {
        type: Date
    },
    startCoordinates: {
        type: [Number],
        required: true
    },
    endCoordinates: {
        type: [Number],
        required: true
    },
    distance:{
        type: Number,
        min: 0
    },
    reward: {
        type: Number,
        min: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Ride = mongoose.model('Ride', rideSchema);

function validateRide(req){
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        stationId: Joi.objectId().required()
    });
    return schema.validate(req);
}

module.exports = {
    Ride: Ride,
    validateRide: validateRide
};
