const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const {UserModel} = require('./userModel');
const {OrganizationModel} = require('./userModel')

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
    price: {
        type: DataTypes.INTEGER, 
        unique: false,  
        defaultValue: 0
    },
    description: {
        type:DataTypes.STRING,
        unique:false,
        allowNull: true
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

const EventSubModel = sequelize.define( 'event_sub', {
    
});

EventTypeModel.hasMany (EventModel, {
    foreignKey: {
        name:'type_id'
    }
})
EventModel.belongsTo(EventTypeModel)
EventCategoryModel.hasMany(EventModel, {
    foreignKey: {
        name: 'category_id'
    }
});
EventModel.belongsTo(EventCategoryModel);


OrganizationModel.hasMany(EventModel, {
    foreignKey: {
        name: 'organization_id'
    }
});
EventModel.belongsTo(OrganizationModel);

EventModel.hasMany(EventSubModel, {
    foreignKey: {
        name: 'event_id'
    }
});
EventSubModel.belongsTo(EventModel);

UserModel.hasMany(EventSubModel, {
    foreignKey: {
        name: 'user_id'
    }
});
EventSubModel.belongsTo(UserModel);

const BasicCategories = ["Sport", "Music", "Education", "Party", "Meetings"];
try {
    EventCategoryModel.findAll({
        where: {
            category_id: 1
        }
    }).then((resolve) => {
        if(resolve.length <= 0){
            BasicCategories.forEach((category) => {
                EventCategoryModel.create({
                    name: category,
                }).catch(error => {
                    console.log(error)
                });
            })
        }
    }).catch((error) =>{
        console.log(error)
    })
} catch (error) {
    console.log(error)
}


module.exports = {
    EventModel,
    EventTypeModel,
    EventCategoryModel,
};
