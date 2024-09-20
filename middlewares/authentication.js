const User = require("../models/User")
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys.js');
const Pet = require("../models/Pet.js");

const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {    
            return res.status(401).send({ message: 'You are not authorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'there´s been a problem with the token' })
    }
}
const isAdmin = async(req, res, next) => {
    const admins = ['admin','superadmin'];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: 'You do not have permission'
        });
    }
    next();
};
const isDoctor = async(req, res, next) => {
    const doctor = ['doctor','superadmin'];
    if (!doctor.includes(req.user.role)) {
        return res.status(403).send({
            message: 'You do not have permission'
        });
    }
    next();
};
const isSeller = async(req, res, next) => {
    const seller = ['seller','superadmin'];
    if (!seller.includes(req.user.role)) {
        return res.status(403).send({
            message: 'You do not have permission'
        });
    }
    next();
};
const isYourPet = async(req, res, next) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).send({ message: 'Pet not found' });
        };
        if (pet.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'This is not your pet mate' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Something went wrong checking the authority of the post.' })
    }
}


module.exports = { authentication, isAdmin, isYourPet, isDoctor, isSeller };