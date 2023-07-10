const Sequelize = require("sequelize");
const db = require("../db");

const Translation = db.define("translation", {
    key: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      en: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      uk: {
        type: Sequelize.TEXT,
      },
})

Translation.prototype.getLocalizedString = function(language) {
    switch (language) {
        case "en":
            return this.en
        case "uk":
            return this.uk
        default: // default to english
        return this.en
    }
}

module.exports = Translation;