require('dotenv').config();
const authService = require('./auth.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

// user's auth controllers

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }
        const user = await authService.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        };

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful.', data: { token } });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const selectRole = async (req, res) => {
    try {
        const userId = req.user.id;
        const roleId = req.body.roleId;
        if (!roleId) {
            return res.status(400).json({ message: 'Please select a role first.' });
        }

        const token = jwt.sign({ id: userId, role: roleId}, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Role selected successfully.', data: { token } });
    } catch (error) {
        console.error('Error selecting user role:', error);
        return res.status(500).json({ message: 'Error selecting user role: ' + error.message });
    }
};

module.exports = {
    // user's auth controllers
    login,
    selectRole
};