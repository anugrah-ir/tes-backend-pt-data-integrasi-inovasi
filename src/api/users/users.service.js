const db = require('../../config/database');
const bcrypt = require('bcrypt');

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

const findRolesByUserId = async (userId) => {
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

module.exports = {
    createUser,
    findUserByID,
    updateUser,
    deleteUser,
    findUserByUsername,
    findRolesByUserId
};