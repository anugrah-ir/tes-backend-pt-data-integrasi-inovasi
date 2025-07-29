const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    generateToken,
    verifyToken
};