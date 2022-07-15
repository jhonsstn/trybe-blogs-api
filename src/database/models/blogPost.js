const { Sequelize } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING
  },
  content: {
    allowNull: false,
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
  },
  published: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updated: {
    allowNull: false,
    type: Sequelize.DATE,
  },
}

module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', attributes, {
    timestamps: false,
    tableName: 'BlogPosts'
  });
  BlogPost.associate = function (models) {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  }
  return BlogPost;
}
