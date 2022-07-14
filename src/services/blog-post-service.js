const { sequelize } = require('../database/models');
const { BlogPost, PostCategory } = require('../database/models');
const { BadRequestError } = require('../errors');

const BlogPostService = {
  createBlogPost: async (blogPost) => {
    const blogPostToCreate = {
      ...blogPost,
      published: new Date(),
      updated: new Date(),
    };
    return sequelize.transaction(async (t) => {
      const newBlogPost = await BlogPost.create(blogPostToCreate, { transaction: t });
      const bulk = blogPost.categoryIds.map((id) => ({ categoryId: id, postId: newBlogPost.id }));
      await PostCategory.bulkCreate(bulk, { transaction: t });
      return newBlogPost;
    });
  },
  validateBlogPostData: async (blogPost) => {
    const { title, content } = blogPost;
    console.log(title);
    if (!title || !content) throw new BadRequestError('Some required fields are missing');
  },
};

module.exports = BlogPostService;