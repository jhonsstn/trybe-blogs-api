const { Router } = require('express');
const rescue = require('express-rescue');
const { createCategory, getAllCategories } = require('../controllers/category-controller');

const route = Router();

route.post('/', rescue(createCategory));
route.get('/', rescue(getAllCategories));

module.exports = route;
