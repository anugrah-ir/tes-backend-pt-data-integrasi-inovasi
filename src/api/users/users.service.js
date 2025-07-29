const db = require('../../config/database');
const bcrypt = require('bcrypt');
const convertToNestedArray = require('../../utils/nestedArray');
const { get } = require('./users.route');

const createUser = async (user) => {
    const { username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, hashedPassword];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const getUserByID = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    
    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

const getAllusers = async () => {
    const query = 'SELECT * FROM users';
    try {
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        throw new Error('Error fetching all users: ' + error.message);
    }
};

const updateUser = async (id, user) => {
    const { username, password } = user;
    const query = 'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *';
    const values = [username, password, id];
    
    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    
    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    
    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error fetching user by username: ' + error.message);
    }
};

const findAllRolesByUserId = async (userId) => {
    const query = `
        SELECT r.* FROM roles r
        JOIN user_roles ur ON r.id = ur.role_id
        WHERE ur.user_id = $1
    `;
    const values = [userId];

    try {
        const result = await db.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error('Error fetching user roles: ' + error.message);
    }
};

const findAllMenuByRoleId = async (roleId) => {
    const query = `
        SELECT m.id, m.name, m.url, m.icon, m.parent_id, m.order_number FROM menus m
        JOIN role_menus rm ON m.id = rm.menu_id
        WHERE rm.role_id = $1
    `;
    const values = [roleId];

    try {
        const result = await db.query(query, values);
        const nestedArray = await convertToNestedArray(result.rows);
        return nestedArray;
    } catch (error) {
        throw new Error('Error fetching menus by role ID: ' + error.message);
    }
};

module.exports = {
    createUser,
    getUserByID,
    getAllusers,
    updateUser,
    deleteUser,
    findUserByUsername,
    findAllRolesByUserId,
    findAllMenuByRoleId
};