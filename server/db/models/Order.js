const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    purchaseId: {
      type: Sequelize.INTEGER
    }
  });
  

module.exports = Order