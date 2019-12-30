const { User } = require('../model/user');
const bcrypt = require('bcrypt');

async function findLoggedUser(req, res) {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}

async function createUser(req, res){
    let user = await User.findOne({email: req.body.email});
    if(user)
        return res.status(400).send("User already registered");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    await user.save();

    const token = user.generateAuthToken();
    res.header('X-Auth-Token', token).send({
        user: user.name,
        email: user.email
    });
}

module.exports = {
    findLoggedUser: findLoggedUser,
    createUser: createUser
};