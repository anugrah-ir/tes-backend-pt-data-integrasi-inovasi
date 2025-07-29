const routes = require('express').Router();
const userController = require('./users.controller');
const { verifyToken } = require('../../middleware/jwt');

routes.get('/role', verifyToken, userController.getUserRoles);

module.exports = routes;