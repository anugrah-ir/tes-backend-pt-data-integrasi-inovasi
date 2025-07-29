const routes = require('express').Router();
const menusController = require('./menu.controller');
const {verifyToken} = require('../../middleware/jwt');
const isAdmin = require('../../middleware/isAdmin');

routes
    .post('/', verifyToken, isAdmin, menusController.createMenu)
    .get('/:id', verifyToken, isAdmin, menusController.getMenuByID)
    .get('/', verifyToken, isAdmin, menusController.getAllMenus)
    .put('/:id', verifyToken, isAdmin, menusController.updateMenu)
    .delete('/:id', verifyToken, isAdmin, menusController.deleteMenu);

module.exports = routes;