const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    coins: {
        type: Number,
        default: 0,
    },
    isAdmin: Boolean,
    inRide: {
        type: Boolean,
        default: false
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT_PASS_KEY);
    return token;
};

const User = mongoose.model('User', userSchema);


function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(8).max(1024).required(),
    });
    return schema.validate(user);
}

module.exports = {
    User: User,
    validateUser: validateUser
};