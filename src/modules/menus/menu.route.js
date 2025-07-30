const routes = require('express').Router();
const menusController = require('./menu.controller');
const verifyToken = require('../../middlewares/verifyToken');
const isAdmin = require('../../middlewares/isAdmin');

routes
    // admin's menus routes
    .post('/', verifyToken, isAdmin, menusController.createMenu)
    .get('/:id', verifyToken, isAdmin, menusController.getMenuByID)
    .get('/', verifyToken, isAdmin, menusController.getAllMenus)
    .put('/:id', verifyToken, isAdmin, menusController.updateMenu)
    .delete('/:id', verifyToken, isAdmin, menusController.deleteMenu);

module.exports = routes;