const { Category } = require('../database/models');
const { ConflictError, BadRequestError } = require('../errors');

const CategoryService = {
  createCategory: async (category) => {
    const { name } = category;
    if (!name) throw new BadRequestError('"name" is required');
    const exists = await Category.findOne({ where: { name } });
    if (exists) throw new ConflictError('Category already registered');
    const newCategory = await Category.create(category);
    return newCategory;
  },
};

module.exports = CategoryService;