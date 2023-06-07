//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Item = require("./models/Item");

//put relationships here

module.exports = {
  db,
  User,
  Item,
};
