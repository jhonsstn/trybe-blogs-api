const { generateToken } = require('../services/auth-service');
const { createUser, validateUserData } = require('../services/user-service');

const UserController = {
  createUser: async (req, res) => {
    await validateUserData(req.body);
    const user = await createUser(req.body);
    const token = await generateToken(user);
    res.status(201).json({ token });
  },
};

module.exports = UserController;