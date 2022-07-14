const { Router } = require('express');
const rescue = require('express-rescue');
const { createBlogPost } = require('../controllers/blog-post-controller');

const route = Router();

route.post('/', rescue(createBlogPost));

module.exports = route;