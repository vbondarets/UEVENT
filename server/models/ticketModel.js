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
const PromoModel = sequelize.define( 'ticket', {
    promo_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
    discount: {
        type: DataTypes.INTEGER, 
        unique: false, 
        allowNull: false
    },
    code: {
        type: DataTypes.TEXT, 
        unique: true, 
        allowNull: false
    },
    count: {
        type: DataTypes.INTEGER, 
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
try {
    PromoModel.findAll({
        where: {
            code: "ABOBA"
        }
    }).then((res) => {
        if(res.length <= 0){
            PromoModel.create({
                discount: 25, 
                code: "ABOBA",
                count: 50
            });
        }
    }).catch((error) => {
        console.log(error);
        PromoModel.create({
            discount: 25, 
            code: "ABOBA",
            count: 50
        });
    })
} catch (error) {
    console.log(error)
}


module.exports = {
    TicketModel,
    PromoModel
};

