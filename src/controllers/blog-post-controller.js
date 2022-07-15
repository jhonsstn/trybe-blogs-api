const {
  createBlogPost,
  validateBlogPostData,
  getAllBlogPosts } = require('../services/blog-post-service');
const { validateToken } = require('../services/auth-service');
const { categoryExists } = require('../services/category-service');

const BlogPostController = {
  createBlogPost: async (req, res) => {
    const { id: userId } = await validateToken(req.headers.authorization);
    await validateBlogPostData(req.body);
    await Promise.all(req.body.categoryIds.map((categoryId) => categoryExists(categoryId)));
    const newBlogPost = await createBlogPost({ ...req.body, userId });
    res.status(201).json(newBlogPost);
  },
  getAllBlogPosts: async (req, res) => {
    await validateToken(req.headers.authorization);
    const blogPosts = await getAllBlogPosts();
    res.status(200).json(blogPosts);
  },
};

module.exports = BlogPostController;