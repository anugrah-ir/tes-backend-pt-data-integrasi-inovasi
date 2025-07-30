const menusService = require('./menus.service');

// admin's menus controllers

const createMenu = async (req, res) => {
    try {
        const menu = req.body;
        const newMenu = await menusService.createMenu(menu);
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMenuByID = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await menusService.getMenuByID(id);
        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllMenus = async (req, res) => {
    try {
        const menus = await menusService.getAllMenus();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = req.body;
        const updatedMenu = await menusService.updateMenu(id, menu);
        if (!updatedMenu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.status(200).json(updatedMenu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMenu = await menusService.deleteMenu(id);
        if (!deletedMenu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.status(200).json(deletedMenu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    // admin's menus controllers
    createMenu,
    getMenuByID,
    getAllMenus,
    updateMenu,
    deleteMenu
};