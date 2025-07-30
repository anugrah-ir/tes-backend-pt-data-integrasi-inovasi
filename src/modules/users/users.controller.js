require('dotenv').config();
const usersService = require('./users.service');

// user's users controllers

const getAllUserRoles = async (req, res) => {
    try {
        const userId = req.user.id;

        const roles = await usersService.findAllRolesByUserId(userId);
        return res.status(200).json({ message: 'User roles fetched successfully.', data: roles });
    } catch (error) {
        console.error('Error fetching user roles:', error);
        return res.status(500).json({ message: 'Error fetching user roles: ' + error.message });
    }
};

// admin's user's controllers

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

const getUserByID = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await usersService.getUserByID(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json({ message: 'User fetched successfully.', data: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        return res.status(200).json({ message: 'Users fetched successfully.', data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!username && !password) {
        return res.status(400).json({ message: 'At least one field (username or password) is required to update.' });
    }

    try {
        const updatedUser = await usersService.updateUser(id, { username, password });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json({ message: 'User updated successfully.', data: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await usersService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json({ message: 'User deleted successfully.', data: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    // user's users controllers
    getAllUserRoles,
    // admin's users controllers
    createUser,
    getUserByID,
    getAllUsers,
    updateUser,
    deleteUser
};