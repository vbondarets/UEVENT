const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const { Sequelize} = require('sequelize');
// const sequelize = new Sequelize(/* ... */);
const queryInterface = sequelize.getQueryInterface();

const UserModel = sequelize.define( 'user', {
    user_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING, 
        unique: false, 
        allowNull: false
    },
    login: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING, 
        unique: false, 
        allowNull: false
    },
    role: {
        type: DataTypes.STRING, 
        unique: false, 
        allowNull: false, 
        defaultValue: "USER"
    }
});

const OrganizationModel = sequelize.define( 'organization', {
    organization_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    },
    location: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT, 
        unique: false, 
        allowNull: false
    }
});
UserModel.hasMany(OrganizationModel, {
    foreignKey: {
        name: 'author_id'
    }
});
OrganizationModel.belongsTo(UserModel);

try {
    OrganizationModel.findAll({
        where: {
            organization_id: 1
        }
    }).then((resolve) => {
        if(resolve.length <= 0){
            OrganizationModel.create({
                name: 'Ticket Master',
                email: 'ticketmaster@support.com',
                location: 'en-us',
                description: "Order tickets for concerts, festivals, comedy shows, sporting events and more."
            }).catch(error => {
                console.log(error)
            })
        }
    }).catch((error) =>{
        console.log(error)
    })
} catch (error) {
    console.log(error)
}

module.exports = {
    OrganizationModel,
    UserModel
};
