const { Router } = require('express');
const rescue = require('express-rescue');
const { login } = require('../controllers/login-controller');

const route = Router();

route.post('/', rescue(login));

module.exports = route;