const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const {EventModel} = require('./eventModel');
const {UserModel} = require('./userModel')

const TicketModel = sequelize.define( 'ticket', {
    ticket_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
    price: {
        type: DataTypes.FLOAT, 
        unique: false, 
        allowNull: false
    },
    path: {
        type: DataTypes.TEXT, 
        unique: false, 
        allowNull: false
    },
});

EventModel.hasMany(TicketModel, {
    foreignKey: {
        name: 'event_id'
    }
});
TicketModel.belongsTo(EventModel);

UserModel.hasMany(TicketModel, {
    foreignKey: {
        name: 'user_id'
    }
});
TicketModel.belongsTo(UserModel);


module.exports = {
    TicketModel
};

