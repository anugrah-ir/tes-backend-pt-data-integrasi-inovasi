const db = require('../../configs/database');

// admin's menus services

const createMenu = async (menu) => {
    const { name, url, icon, parent_id, order_number } = menu;
    const query = 'INSERT INTO menus (name, url, icon, parent_id, order_number) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, url, icon, parent_id, order_number];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating menu: ' + error.message);
    }
};

const getMenuByID = async (id) => {
    const query = 'SELECT * FROM menus WHERE id = $1';
    const values = [id];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error fetching menu: ' + error.message);
    }
};

const getAllMenus = async () => {
    const query = 'SELECT * FROM menus';

    try {
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        throw new Error('Error fetching all menus: ' + error.message);
    }
};

const updateMenu = async (id, menu) => {
    const { name, url, icon, parent_id, order_number } = menu;
    const query = 'UPDATE menus SET name = $1, url = $2, icon = $3, parent_id = $4, order_number = $5 WHERE id = $6 RETURNING *';
    const values = [name, url, icon, parent_id, order_number, id];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error updating menu: ' + error.message);
    }
};

const deleteMenu = async (id) => {
    const query = 'DELETE FROM menus WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error deleting menu: ' + error.message);
    }
};

module.exports = {
    // admin's menus services
    createMenu,
    getMenuByID,
    getAllMenus,
    updateMenu,
    deleteMenu
};