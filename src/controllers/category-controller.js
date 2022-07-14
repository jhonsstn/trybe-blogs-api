const { createCategory, getAllCategories } = require('../services/category-service');
const { validateToken } = require('../services/auth-service');

const CategoryController = {
  createCategory: async (req, res) => {
    await validateToken(req.headers.authorization);
    const newCategory = await createCategory(req.body);
    return res.status(201).json(newCategory);
  },
  getAllCategories: async (req, res) => {
    await validateToken(req.headers.authorization);
    const categories = await getAllCategories();
    res.status(200).json(categories);
  },
};

module.exports = CategoryController;