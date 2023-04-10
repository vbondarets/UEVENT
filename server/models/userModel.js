const sequelize = require('./db');
const { DataTypes, Model } = require('sequelize');
const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize(/* ... */);
const queryInterface = sequelize.getQueryInterface();
const orgLinks = require('../imgLinks.json');

const orgFilling = () =>{
    OrganizationModel.bulkCreate([{
        name: 'Ticket Master',
        email: 'ticketmaster@support.com',
        location: 'en-us',
        description: "Order tickets for concerts, festivals, comedy shows, sporting events and more.",
        img: orgLinks.TicketMaster,
        user_id: 1
    },
    {
        name: 'India Org',
        email: 'india-org@support.com',
        location: 'en-us',
        description: "Nimya tu kuch der pa ke rakh le\nPale vitch mukhra luiska ke rai\nNimya tu kuch der pa ke rakh le\nPale vitch mukhra luiska ke rai\nAave kari na kise de naal pyar.",
        img: orgLinks.IndiaOrg,
        user_id: 1
    },
    {
        name: 'Belgorodskoe PVO',
        email: 'belgorod-pvo@support.com',
        location: 'en-us',
        description: "Boje, bombi belgorod!",
        img: orgLinks.belgorodskoePVO,
        user_id: 1
    }
    ]).catch(error => {
        console.log(error)
    })
}
const orgPostFilling = () => {
    OrganizationPostModel.bulkCreate([{
        organization_id:1,
        header:"Here we go",
        text:"Welcome to our org page"
    },
    {
        organization_id:1,
        header:"Something new...",
        text:"Check out our upcomming events"
    },
    {
        organization_id:2,
        header:"Glory to Buddha",
        text:"Nimya tu kuch der pa ke rakh le\nPale vitch mukhra luiska ke rai\nNimya tu kuch der pa ke rakh le"
    },
    {
        organization_id:3,
        header:"Rusnya mae strajdati",
        text:"Boje bombi belgorod"
    }])
}

const UserModel = sequelize.define('user', {
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

const OrganizationModel = sequelize.define('organization', {
    organization_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        unique: false,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT('long'),
        unique: false,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        unique: false,
        allowNull: false
    }
});
const OrganizationPostModel = sequelize.define('organization_post', {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.TEXT('long'),
        unique: false,
        allowNull: false
    },
    header: {
        type: DataTypes.STRING,
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

OrganizationModel.hasMany(OrganizationPostModel, {
    foreignKey: {
        name: 'organization_id'
    }
});
OrganizationPostModel.belongsTo(OrganizationModel);


try {
    OrganizationModel.findAll().then((resolve) => {
        if (resolve.length <= 0) {
            orgFilling()
        }
    }).catch((error) => {
        console.log(error)
    })
    OrganizationPostModel.findAll().then((resolve) => {
        if (resolve.length <= 0) {
            orgPostFilling()
        }
    }).catch((error) => {
        console.log(error)
    })
} catch (error) {
    orgPostFilling()
    orgFilling();
    console.log(error)
}

module.exports = {
    OrganizationModel,
    UserModel,
    OrganizationPostModel
};
