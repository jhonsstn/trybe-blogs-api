const { BadRequestError } = require('../errors');

const authService = {
  validateLoginData: async (data) => {
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestError('Some required fields are missing');
    }
    return data;
  },
};

module.exports = authService;