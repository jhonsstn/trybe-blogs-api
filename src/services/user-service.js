const { User } = require('../database/models');
const { BadRequestError } = require('../errors');

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

};

module.exports = LoginService;