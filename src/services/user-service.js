const { User } = require('../database/models');

const LoginService = {
  getUserByEmail: async (email) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },

};

module.exports = LoginService;