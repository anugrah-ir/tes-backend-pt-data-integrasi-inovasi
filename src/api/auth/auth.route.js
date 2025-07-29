const routes = require('express').Router();
const authController = require('./auth.controller');

routes.post('/register', authController.register);

module.exports = routes;