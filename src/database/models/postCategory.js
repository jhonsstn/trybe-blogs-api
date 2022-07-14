const { Sequelize } = require('sequelize');

const attributes = {
  postId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: 'BlogPosts',
      key: 'id'
    }
  },
  categoryId: {
    allowNull: false,
    type: Sequelize.INTEGER,
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
      foreignKey: 'categoryId',
      through: PostCategory,
      otherKey: 'postId'
    });
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      through: PostCategory,
      otherKey: 'categoryId'
    });
  }
  return PostCategory;
}
