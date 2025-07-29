const routes = require('express').Router();
const authController = require('./auth.controller');

routes
    .post('/register', authController.register)
    .post('/login', authController.login);

module.exports = routes;