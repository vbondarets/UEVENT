const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');

const EventModel = sequelize.define( 'event', {
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
    startDateTime: {
        type: DataTypes.DATE, 
        unique: false, 
        allowNull: false
    },
    endDateTime: {
        type: DataTypes.DATE, 
        unique: false, 
        allowNull: true
    },
    tickets_count: {
        type: DataTypes.INTEGER, 
        unique: false,  
        defaultValue: 0
    },
    region: {
        type: DataTypes.STRING, 
        unique: false, 
        defaultValue: "ukr"
    },
    imgLink: {
        type: DataTypes.STRING, 
        unique: false, 
        defaultValue: "/"
    }
});
const EventTypeModel = sequelize.define( 'event_type', {
    type_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, 
        unique: false, 
        allowNull: false
    }
});
const EventCategoryModel = sequelize.define( 'event_category', {
    category_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, 
        unique: false, 
        allowNull: false
    }
});

EventModel.hasMany(EventTypeModel, {
    foreignKey: {
        name: 'event_id'
    }
});
EventTypeModel.belongsTo(EventModel);

EventModel.hasMany(EventCategoryModel, {
    foreignKey: {
        name: 'event_id'
    }
});
EventCategoryModel.belongsTo(EventModel);


module.exports = {
    EventModel,
    EventTypeModel,
    EventCategoryModel
};
