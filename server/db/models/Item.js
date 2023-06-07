const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
    name: {
        type: Sequelize.STRING,
       allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        validate: {
            min:0,
            max:999,
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "https://www.shutterstock.com/image-vector/medical-container-bottle-vector-icon-600w-1713578257.jpg"
    }
});


module.exports = Item