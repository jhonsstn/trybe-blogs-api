const { BadRequestError } = require('../errors');

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
};

module.exports = authService;