//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Item = require("./models/Item");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

//put relationships here

Item.belongsToMany(User, { through: OrderItem });
User.belongsToMany(Item, { through: OrderItem });
Order.belongsTo(User);
Order.belongsToMany(Item, { through: OrderItem });
Item.belongsToMany(Order, { through: OrderItem });

module.exports = { db, Item, User, Order, OrderItem };

