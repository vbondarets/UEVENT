const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'uevent', 
    'vbondarets',
    'securepass',
    {
        host: '127.0.0.1',
        port: '3306',
        dialect: 'mysql'
    }
)

