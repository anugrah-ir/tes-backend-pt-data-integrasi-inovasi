const routes = require('express').Router();
const userController = require('./users.controller');
const { verifyToken } = require('../../middleware/jwt');

routes
    .get('/role', verifyToken, userController.getUserRoles)
    .post('/role', verifyToken, userController.selectRole);

module.exports = routes;