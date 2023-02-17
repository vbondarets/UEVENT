const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');

const EventModel = sequelize.define( 'user', {
    event_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, 
        unique: false, 
        allowNull: false
    },
    type: {
        type: DataTypes.STRING, 
        unique: false, 
        allowNull: true,
        defaultValue: "event"
    },
    startDateTime: {
        type: DataTypes.DATE, 
        unique: false, 
        allowNull: false
    },
    endDateTime: {
        type: DataTypes.DATE, 
        unique: false, 
        allowNull: false
    },
    tickets: {
        type: DataTypes.INTEGER, 
        unique: false,  
        defaultValue: 0
    },
    region: {
        type: DataTypes.STRING, 
        unique: false, 
        defaultValue: "ukr"
    }
});


module.exports = {
    EventModel
};
