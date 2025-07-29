const { findRolesByUserId } = require('../users/users.service');

const getUserRoles = async (req, res) => {
    try {
        const userId = req.user.id;

        const roles = await findRolesByUserId(userId);
        return res.status(200).json({ message: 'User roles fetched successfully.', data: roles });
    } catch (error) {
        console.error('Error fetching user roles:', error);
        return res.status(500).json({ message: 'Error fetching user roles: ' + error.message });
    }
};

module.exports = {
    getUserRoles
};