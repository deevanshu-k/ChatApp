const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config.json')[env];



const db = new Sequelize(
	config.database,
	config.username,
	config.password, {
		dialect: config.dialect,    		
		host: config.host,
		logging : config.logging
	}
);

module.exports = {db};