const { sequelize } = require('../database/models');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../errors');

const BlogPostService = {
  createBlogPost: async (post) => {
    const postToCreate = {
      ...post,
      published: new Date(),
      updated: new Date(),
    };
    return sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create(postToCreate, { transaction: t });
      const bulk = post.categoryIds.map((id) => ({ categoryId: id, postId: newPost.id }));
      await PostCategory.bulkCreate(bulk, { transaction: t });
      return newPost;
    });
  },
  validateBlogPostData: async (blogPost) => {
    const { title, content } = blogPost;
    console.log(title);
    if (!title || !content) throw new BadRequestError('Some required fields are missing');
  },
  getAllBlogPosts: async () => {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return posts;
  },
  getBlogPostById: async (id) => {
    const post = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!post) throw new NotFoundError('Post does not exist');
    return post;
  },
  updateBlogPostById: async (id, postData, userId) => {
    const post = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!post) throw new NotFoundError('Post does not exist');
    if (post.userId !== userId) throw new UnauthorizedError('Unauthorized user');
    await post.update(postData, { where: { id } });
    return post;
  },
};

module.exports = BlogPostService;