const { Sequelize } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  }
}

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', attributes, {
    timestamps: false,
  });

  return Category;
}
