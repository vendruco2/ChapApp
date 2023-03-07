const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization && //check if token is present
        req.headers.authorization.startsWith('Bearer') //check if token is bearer
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]; //remover beareer from token

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password'); //find user and return all except password

            next();
        } catch (error) { //if token is invalid
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    if (!token) { //if token is not present
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };

