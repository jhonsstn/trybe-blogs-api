const { Sequelize } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  displayName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  email: {
    unique: true,
    allowNull: false,
    type: Sequelize.STRING,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  image: {
    allowNull: true,
    type: Sequelize.STRING,
  },
}

module.exports = (sequelize) => {
  const User = sequelize.define('User', attributes, {
    timestamps: false,
  });
  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      key: 'userId'
    });
  }
  return User;
}
