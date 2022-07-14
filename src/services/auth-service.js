const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthorizedError } = require('../errors');

const authService = {
  validateLoginData: async (data) => {
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestError('Some required fields are missing');
    }
    return data;
  },
  validateUserPassword: async (loginPassword, userPassword) => {
    if (loginPassword.toString() !== userPassword.toString()) {
      throw new BadRequestError('Invalid password');
    }
  },
  generateToken: async (user) => {
    const { id, displayName, email, image } = user;
    const token = jwt.sign({ id, displayName, email, image }, process.env.JWT_SECRET);
    return token;
  },
  validateToken: async (token) => {
    if (!token) throw new UnauthorizedError('Token not found');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new UnauthorizedError('Expired or invalid token');
    }
  },
};

module.exports = authService;