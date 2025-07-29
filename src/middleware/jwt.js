const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
};

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ status: 108, message: 'Token is required.', data: null });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ status: 108, message: 'Token is required.', data: null });
        }
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: 108, message: 'Token is invalid.', data: null });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    generateToken,
    verifyToken
};