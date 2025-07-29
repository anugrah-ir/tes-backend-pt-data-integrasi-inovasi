const { createUser, getUserByUsername } = require('../users/users.service');
const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');

const checkPassword = async (inputPassword, storedPassword) => {
    const match = await bcrypt.compare(inputPassword, storedPassword); 
    return match;
};

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
        }

        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        };

        const user = await createUser({ username, password });
        const token = generateToken({ id: user.id });
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

        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        const isPasswordValid = await checkPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        };

        const token = generateToken({ id: user.id });
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