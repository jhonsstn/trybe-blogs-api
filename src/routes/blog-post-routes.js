const { Router } = require('express');
const rescue = require('express-rescue');
const { createBlogPost, getAllBlogPosts } = require('../controllers/blog-post-controller');

const route = Router();

route.post('/', rescue(createBlogPost));
route.get('/', rescue(getAllBlogPosts));

module.exports = route;