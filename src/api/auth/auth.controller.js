require('dotenv').config();
const { createUser, findUserByUsername } = require('../users/users.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
        }

        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        };

        const user = await createUser({ username, password });
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        return res.status(201).json({ message: 'User registered successfully.', data: { token } });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }
        const user = await findUserByUsername(username);
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

module.exports = {
    register,
    login
};