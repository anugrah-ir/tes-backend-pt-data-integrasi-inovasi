require('dotenv').config();
const { findAllRolesByUserId, findAllMenuByRoleId} = require('../users/users.service');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const getUserRoles = async (req, res) => {
    try {
        const userId = req.user.id;

        const roles = await findAllRolesByUserId(userId);
        return res.status(200).json({ message: 'User roles fetched successfully.', data: roles });
    } catch (error) {
        console.error('Error fetching user roles:', error);
        return res.status(500).json({ message: 'Error fetching user roles: ' + error.message });
    }
};

const selectRole = async (req, res) => {
    try {
        const userId = req.user.id;
        const roleId = req.body.roleId;

        const token = jwt.sign({ id: userId, role: roleId}, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Role selected successfully.', data: { token } });
    } catch (error) {
        console.error('Error selecting user role:', error);
        return res.status(500).json({ message: 'Error selecting user role: ' + error.message });
    }
};

const getUserMenus = async (req, res) => {
    try {
        const roleId = req.user.role;
        if (!roleId) {
            return res.status(400).json({ message: 'Token is invalid.' });
        };

        const menus = await findAllMenuByRoleId(roleId);
        return res.status(200).json({ message: 'Role menus fetched successfully.', data: menus });
    } catch (error) {
        console.error('Error fetching role menus:', error);
        return res.status(500).json({ message: 'Error fetching role menus: ' + error.message });
    }
};

module.exports = {
    getUserRoles,
    selectRole,
    getUserMenus
};