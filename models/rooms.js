const { DataTypes, Model } = require('sequelize');
const {db} = require('../config/sequelize');

const rooms = db.define('room',{
    id: {
        type : DataTypes.STRING,
        primaryKey : true,
        allownull : false
    },
    name: {
        type : DataTypes.STRING,
        allownull : false,
    },
    users: {
        type : DataTypes.STRING,
        allownull : false
    },
    password: {
        type: DataTypes.STRING,
        allownull : false
    }
});

module.exports = {rooms};

