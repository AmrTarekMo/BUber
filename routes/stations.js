const express = require('express');
const { validateStation } = require('../model/station');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const validateId = require('../middleware/validateObjectId');
const controller = require('../controllers/station');
const router = express.Router();


router.get('/allStations', auth, controller.findStations);

router.get('/nearMe', auth, controller.findNearMe);

router.get('/:id', validateId, controller.findStationById);

router.post('/', auth, admin, validate(validateStation), controller.createStation);

module.exports = router;

