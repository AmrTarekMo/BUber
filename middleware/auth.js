const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('X-Auth-Token');
    if(!token)
        return res.status(401).send("Access denied, No Token Provided.");
    try {
        const decoded = jwt.verify(token, process.env.JWT_PASS_KEY);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(400).send('Access denied, Invalid Token');
    }
};