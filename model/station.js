const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    coordinates:{
        type: [Number],
        required: true
    },
    availableBikes: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
});

const Station = mongoose.model('Station', stationSchema);

function validateStation(req){
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(255),
        availableBikes: Joi.number().required().min(0).max(100),
        coordinates: Joi.array().items(Joi.number()).length(2).required()
    });
    return schema.validate(req);
}

module.exports = {
    Station: Station,
    validateStation: validateStation
};