const { Router } = require('express');
const rescue = require('express-rescue');
const { createUser } = require('../controllers/user-controller');

const route = Router();

route.post('/', rescue(createUser));

module.exports = route;