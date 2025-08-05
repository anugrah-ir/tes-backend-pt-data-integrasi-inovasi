const db = require('../../configs/database');

// user's auth services

const getUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    
    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error fetching user by username: ' + error.message);
    }
};

const getUserRoleByRoleId = async (userId, roleId) => {
    const query = `
        SELECT * FROM user_roles
        WHERE user_id = $1 AND role_id = $2
    `;
    const values = [userId, roleId];

    try {
        const result = await db.query(query, values);
        return result.rows.length > 0;
    } catch (error) {
        throw new Error('Error checking user role: ' + error.message);
    }
};

module.exports = {
    // user's auth services
    getUserByUsername,
    getUserRoleByRoleId
};