const { sequelize } = require('../database/models');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
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
  getAllBlogPosts: async () => {
    const BlogPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    console.log(BlogPosts);
    return BlogPosts;
  },
};

module.exports = BlogPostService;