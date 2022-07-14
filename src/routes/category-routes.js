const { Router } = require('express');
const rescue = require('express-rescue');
const { createCategory } = require('../controllers/category-controller');

const route = Router();

route.post('/', rescue(createCategory));

module.exports = route;