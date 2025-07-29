const { createUser } = require('../users/users.service');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await createUser({ username, password });
        return res.status(201).json({ message: 'User registered successfully.', data: { user } });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    register
};