const routes = require('express').Router();
const userController = require('./users.controller');
const verifyToken = require('../../middlewares/verifyToken');
const isAdmin = require('../../middlewares/isAdmin');

routes
    // user's users routes
    .get('/role', verifyToken, userController.getAllUserRoles)
    // admin's users routes
    .post('/', verifyToken, isAdmin, userController.createUser)
    .get('/:id', verifyToken, isAdmin, userController.getUserByID)
    .get('/', verifyToken, isAdmin, userController.getAllUsers)
    .put('/:id', verifyToken, isAdmin, userController.updateUser)
    .delete('/:id', verifyToken, isAdmin, userController.deleteUser)
    .post('/:id/role', verifyToken, isAdmin, userController.assignRoleToUser);

module.exports = routes;