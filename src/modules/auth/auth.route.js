const routes = require('express').Router();
const authController = require('./auth.controller');
const verifyToken = require('../../middlewares/verifyToken');

routes
    // user's auth routes
    .post('/login', authController.login)
    .post('/select-role', verifyToken, authController.selectRole);

module.exports = routes;