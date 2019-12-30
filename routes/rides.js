const express = require('express');
const router = express.Router();
const { validateRide } = require('../model/ride');
const auth = require('../middleware/auth');
const validateId = require('../middleware/validateObjectId');
const validate = require('../middleware/validate');
const ride = require('../controllers/ride');

router.get(
    '/:id',
    validateId,
    ride.findRide
);

router.post(
    '/start',
    auth,
    validate(validateRide),
    ride.findUser,
    ride.findStation,
    ride.startRide
);

router.post(
    '/end/:id',
    auth,
    validateId,
    validate(validateRide),
    ride.findUser,
    ride.findStation,
    ride.endRide
);

module.exports = router;