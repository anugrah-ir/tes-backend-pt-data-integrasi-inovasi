const routes = require('express').Router();
const rolesController = require('./roles.controller');
const { verifyToken } = require('../../middleware/jwt');
const isAdmin = require('../../middleware/isAdmin');


routes
    .post('/', verifyToken, isAdmin, rolesController.createRole)
    .get('/:id', verifyToken, isAdmin, rolesController.getRoleByID)
    .get('/', verifyToken, isAdmin, rolesController.getAllRoles)
    .put('/:id', verifyToken, isAdmin, rolesController.updateRole)
    .delete('/:id', verifyToken, isAdmin, rolesController.deleteRole);

module.exports = routes;