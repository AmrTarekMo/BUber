const express = require('express');
const { validateUser } = require('../model/user');
const controller = require('../controllers/user');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get(
    '/me',
    auth,
    controller.findLoggedUser
);

router.post(
    '/',
    validate(validateUser),
    controller.createUser
);

module.exports = router;