const { Router } = require('express');
const rescue = require('express-rescue');
const { createUser, getAllUsers } = require('../controllers/user-controller');

const route = Router();

route.post('/', rescue(createUser));
route.get('/', rescue(getAllUsers));

module.exports = route;