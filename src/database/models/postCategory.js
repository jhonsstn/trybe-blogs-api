const { Sequelize } = require('sequelize');

const attributes = {
  postId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'BlogPosts',
      key: 'id'
    }
  },
  categoryId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
}

module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', attributes, {
    timestamps: false,
    tableName: 'PostCategories'
  });
  PostCategory.associate = function (models) {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'posts',
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
  }
  return PostCategory;
}
