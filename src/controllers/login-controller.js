const {
  validateLoginData,
  validateUserPassword,
  generateToken,
} = require('../services/auth-service');
const { getUserByEmail } = require('../services/user-service');

const LoginController = {
  login: async (req, res) => {
    const loginData = await validateLoginData(req.body);
    const user = await getUserByEmail(req.body.email);
    await validateUserPassword(loginData.password, user.password);
    const token = await generateToken(user);
    res.status(200).json({ token });
  },
};

module.exports = LoginController;