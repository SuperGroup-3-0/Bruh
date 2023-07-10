const Sequelize = require("sequelize");
const Translation = require("./Translation")
const db = require("../db");

const Item = db.define("item", {
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 999,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://www.shutterstock.com/image-vector/medical-container-bottle-vector-icon-600w-1713578257.jpg",
  },
});

Item.belongsTo(Translation, {
  as: 'nameTranslation',
  foreignKey: "name_key"
})

Item.belongsTo(Translation, {
  as: 'descriptionTranslation',
  foreignKey: "description_key"
})

module.exports = Item;

