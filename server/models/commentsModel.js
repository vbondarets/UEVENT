const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const { EventModel } = require('./eventModel');
const { UserModel } = require('./userModel');

const CommentModel = sequelize.define('comment', {
    comment_id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement:true
    },
    comment: {
        type:DataTypes.STRING,
        unique:false,
        allowNull:false
    },

})

EventModel.hasMany(CommentModel, {
    foreignKey: {
        name: 'event_id'
    }
})
CommentModel.belongsTo(EventModel)

UserModel.hasMany(CommentModel, {
    foreignKey: {
        name: 'user_id'
    }
})
CommentModel.belongsTo(UserModel)

module.exports = {
    CommentModel
}