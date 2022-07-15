const { Router } = require('express');
const rescue = require('express-rescue');
const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPostById,
  deleteBlogPostById,
  getAllBlogPostsByTerm,
} = require('../controllers/blog-post-controller');

const route = Router();

route.get('/search', rescue(getAllBlogPostsByTerm));
route.post('/', rescue(createBlogPost));
route.get('/', rescue(getAllBlogPosts));
route.get('/:id', rescue(getBlogPostById));
route.put('/:id', rescue(updateBlogPostById));
route.delete('/:id', rescue(deleteBlogPostById));

module.exports = route;