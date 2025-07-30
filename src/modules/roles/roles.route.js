const routes = require('express').Router();
const rolesController = require('./roles.controller');
const verifyToken = require('../../middlewares/verifyToken');
const isAdmin = require('../../middlewares/isAdmin');

routes
    // user's roles routes
    .get('/menu/', verifyToken, rolesController.getRoleMenus)
    // admin's roles routes
    .post('/', verifyToken, isAdmin, rolesController.createRole)
    .get('/:id', verifyToken, isAdmin, rolesController.getRoleByID)
    .get('/', verifyToken, isAdmin, rolesController.getAllRoles)
    .put('/:id', verifyToken, isAdmin, rolesController.updateRole)
    .delete('/:id', verifyToken, isAdmin, rolesController.deleteRole);

module.exports = routes;