const db = require('../../configs/database');
const buildSortedTree = require('../../utils/buildSortedTree');

// user's roles services

const getRoleMenus = async (roleId) => {
    const query = `
        SELECT m.id, m.name, m.url, m.icon, m.parent_id, m.order_number FROM menus m
        JOIN role_menus rm ON m.id = rm.menu_id
        WHERE rm.role_id = $1
    `;
    const values = [roleId];

    try {
        const result = await db.query(query, values);
        const sortedTree = await buildSortedTree(result.rows);
        return sortedTree;
    } catch (error) {
        throw new Error('Error fetching menus by role ID: ' + error.message);
    }
};

// admin's roles services

const createRole = async (name, description) => {
    const query = 'INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING *';
    const values = [name, description];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating role: ' + error.message);
    }
};

const getRoleByID = async (id) => {
    const query = 'SELECT * FROM roles WHERE id = $1';
    const values = [id];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error fetching role: ' + error.message);
    }
};

const getRoleByName = async (name) => {
    const query = 'SELECT * FROM roles WHERE name = $1';
    const values = [name];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error fetching role: ' + error.message);
    }
};

const getAllRoles = async () => {
    const query = 'SELECT * FROM roles';

    try {
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        throw new Error('Error fetching all roles: ' + error.message);
    }
};

const updateRole = async (id, role) => {
    const { name } = role;
    const query = 'UPDATE roles SET name = $1 WHERE id = $2 RETURNING *';
    const values = [name, id];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error updating role: ' + error.message);
    }
};

const deleteRole = async (id) => {
    const query = 'DELETE FROM roles WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error deleting role: ' + error.message);
    }
};

module.exports = {
    // user's roles services
    getRoleMenus,
    // admin's roles services
    createRole,
    getRoleByID,
    getRoleByName,
    getAllRoles,
    updateRole,
    deleteRole
};