const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');

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
UserModel.hasMany(OrganisationModel, {
    foreignKey: {
        name: 'author_id'
    }
});
OrganisationModel.belongsTo(UserModel);

module.exports = {
    OrganizationModel,
    UserModel
};
