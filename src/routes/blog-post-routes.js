const { Router } = require('express');
const rescue = require('express-rescue');
const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPostById,
} = require('../controllers/blog-post-controller');

const route = Router();

route.post('/', rescue(createBlogPost));
route.get('/', rescue(getAllBlogPosts));
route.get('/:id', rescue(getBlogPostById));
route.put('/:id', rescue(updateBlogPostById));

module.exports = route;