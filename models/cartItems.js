const Sequelize = require("sequelize");

const sequelize = require("../utils/database.js");

const CartItem = sequelize.define("cartItems", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItem;
