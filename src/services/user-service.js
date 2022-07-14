const validator = require('validator');
const { User } = require('../database/models');
const { BadRequestError, ConflictError } = require('../errors');

const LoginService = {
  getUserByEmail: async (email) => {
    const user = await User.findOne({
      where: {
        email,
      },
    }, { raw: true });
    if (!user) {
      throw new BadRequestError('Invalid fields');
    }
    return user;
  },
  validateUserData: async (user) => {
    const { displayName, email, password } = user;
    if (!validator.isLength(displayName, { min: 8 })) {
      throw new BadRequestError('"displayName" length must be at least 8 characters long');
    }
    if (!validator.isEmail(email)) {
      throw new BadRequestError('"email" must be a valid email');
    }
    if (!validator.isLength(password, { min: 6 })) {
      throw new BadRequestError('"password" length must be at least 6 characters long');
    }
  },
  createUser: async (user) => {
    const { email } = user;
    const exists = await User.findOne({
      where: {
        email,
      },
    }, { raw: true });
    if (exists) throw new ConflictError('User already registered');
    const newUser = await User.create(user);
    return newUser;
  },
  getAllUsers: async () => {
    const users = await User.findAll({ raw: true, attributes: { exclude: ['password'] } });
    return users;
  },
};

module.exports = LoginService;