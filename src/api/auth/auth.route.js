const routes = require('express').Router();
const authController = require('./auth.controller');

routes
    .post('/login', authController.login)
    .post('/select-role', authController.selectRole);

module.exports = routes;