require("dotenv").config();
const jwt  = require('jsonwebtoken');

module.exports.createToken = (room,userName) => {
    return jwt.sign({room,userName},process.env.SECRECT_KEY,{
        expiresIn: 600
    })
};