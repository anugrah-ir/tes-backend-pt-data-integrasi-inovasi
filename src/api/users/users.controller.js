require('dotenv').config();
const usersService = require('./users.service');

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await usersService.createUser({ username, password });
        return res.status(201).json({ message: 'User created successfully.', data: user });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getUserRoles = async (req, res) => {
    try {
        const userId = req.user.id;

        const roles = await usersService.findAllRolesByUserId(userId);
        return res.status(200).json({ message: 'User roles fetched successfully.', data: roles });
    } catch (error) {
        console.error('Error fetching user roles:', error);
        return res.status(500).json({ message: 'Error fetching user roles: ' + error.message });
    }
};

const getUserMenus = async (req, res) => {
    try {
        const roleId = req.user.role;
        if (!roleId) {
            return res.status(400).json({ message: 'Please select a role first.' });
        }

        const menus = await usersService.findAllMenuByRoleId(roleId);
        return res.status(200).json({ message: 'Role menus fetched successfully.', data: menus });
    } catch (error) {
        console.error('Error fetching role menus:', error);
        return res.status(500).json({ message: 'Error fetching role menus: ' + error.message });
    }
};

module.exports = {
    getUserRoles,
    getUserMenus
};