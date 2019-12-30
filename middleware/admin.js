const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const isAdmin = req.user.isAdmin;
    if(!isAdmin || isAdmin === false)
        return res.status(403).send("Access denied, User Not Authorized.");
    next();
};