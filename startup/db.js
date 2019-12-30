const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);

    mongoose.connect(process.env.CLOUD_MONGODB_URI,{ useFindAndModify: false })
        .then(() => winston.info(`Connected to ${process.env.CLOUD_MONGODB_URI}...`))
};