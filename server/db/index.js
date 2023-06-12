//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Item = require("./models/Item");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

//put relationships here

// Item.belongsToMany(User, { through: OrderItem });
// User.belongsToMany(Item, { through: OrderItem });
// Order.belongsTo(User);
// Order.belongsToMany(Item, { through: OrderItem }); //order is not a quality of an item, maybe instead hasMany
// Item.belongsToMany(Order, { through: OrderItem });

Item.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Item, { through: OrderItem });
Order.belongsTo(User);
User.hasMany(Order);

module.exports = { db, Item, User, Order, OrderItem };