const { Router } = require('express');
const rescue = require('express-rescue');
const { createUser, getAllUsers, getUserById } = require('../controllers/user-controller');

const route = Router();

route.post('/', rescue(createUser));
route.get('/', rescue(getAllUsers));
route.get('/:id', rescue(getUserById));

module.exports = route;