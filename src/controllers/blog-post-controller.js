const {
  createBlogPost,
  validateBlogPostData,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPostById,
} = require('../services/blog-post-service');
const { validateToken } = require('../services/auth-service');
const { categoryExists } = require('../services/category-service');

const BlogPostController = {
  createBlogPost: async (req, res) => {
    const { id: userId } = await validateToken(req.headers.authorization);
    await validateBlogPostData(req.body);
    await Promise.all(req.body.categoryIds.map((categoryId) => categoryExists(categoryId)));
    const newPost = await createBlogPost({ ...req.body, userId });
    res.status(201).json(newPost);
  },
  getAllBlogPosts: async (req, res) => {
    await validateToken(req.headers.authorization);
    const posts = await getAllBlogPosts();
    res.status(200).json(posts);
  },
  getBlogPostById: async (req, res) => {
    await validateToken(req.headers.authorization);
    const { id } = req.params;
    const post = await getBlogPostById(id);
    res.status(200).json(post);
  },
  updateBlogPostById: async (req, res) => {
    const { id: userId } = await validateToken(req.headers.authorization);
    await validateBlogPostData(req.body);
    const { id } = req.params;
    const updatedPost = await updateBlogPostById(id, req.body, userId);
    res.status(200).json(updatedPost);
  },
};

module.exports = BlogPostController;