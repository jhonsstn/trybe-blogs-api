const { generateToken, validateToken } = require('../services/auth-service');
const {
  createUser,
  validateUserData,
  getAllUsers,
  getUserById,
} = require('../services/user-service');

const UserController = {
  createUser: async (req, res) => {
    await validateUserData(req.body);
    const user = await createUser(req.body);
    const token = await generateToken(user);
    res.status(201).json({ token });
  },
  getAllUsers: async (req, res) => {
    await validateToken(req.headers.authorization);
    const users = await getAllUsers();
    res.status(200).json(users);
  },
  getUserById: async (req, res) => {
    await validateToken(req.headers.authorization);
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  },
};

module.exports = UserController;