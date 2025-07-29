const db = require('../../config/database');
const bcrypt = require('bcrypt');

const convertToNestedArray = async (items) => {
    const itemMap = new Map();
    const nestedArray = [];

    items.forEach(item => {
        itemMap.set(item.id, { ...item, children: [] });
    });

    itemMap.forEach(item => {
        if (item.parent_id === null) {
            nestedArray.push(item);
        } else {
            const parent = itemMap.get(item.parent_id);
            if (parent) {
                parent.children.push(item);
            }
        }
    });

    const sortByOrder = (arr) => {
        arr.sort((a, b) => a.order_number - b.order_number);
        arr.forEach(item => {
            if (item.children.length > 0) {
                sortByOrder(item.children);
            }
        });
    };

    sortByOrder(nestedArray);
    return nestedArray;
};

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

const findUserByID = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    
    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
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
    findUserByID,
    updateUser,
    deleteUser,
    findUserByUsername,
    findAllRolesByUserId,
    findAllMenuByRoleId
};