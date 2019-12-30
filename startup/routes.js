/**
 * Module dependencies.
 */
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

/**
 * Controllers (route handlers).
 */
const users = require('../routes/users');
const rides = require('../routes/rides');
const stations = require('../routes/stations');
const error = require('../middleware/error');

module.exports = function (app) {
    /**
     * Express configuration.
     */
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(morgan('tiny'));

    /**
     * Primary app routes.
     */
    app.use('/api/users', users);
    app.use('/api/rides', rides);
    app.use('/api/stations', stations);
    app.use(error);
};
