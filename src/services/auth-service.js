const authService = {
  validateLoginData: (data) => {
    const { email, password } = data;
    if (!email || !password) {
      throw new Error();
    }
    return true;
  },
};

module.exports = authService;