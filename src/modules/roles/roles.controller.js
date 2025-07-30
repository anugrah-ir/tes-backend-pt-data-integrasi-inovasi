const rolesService = require('./roles.service');

// user's roles controllers

const getRoleMenus = async (req, res) => {
    try {
        const roleId = req.user.role;
        if (!roleId) {
            return res.status(400).json({ message: 'Please select a role first.' });
        }

        const menus = await rolesService.getRoleMenus(roleId);
        return res.status(200).json({ message: 'Role menus fetched successfully.', data: menus });
    } catch (error) {
        console.error('Error fetching role menus:', error);
        return res.status(500).json({ message: 'Error fetching role menus: ' + error.message });
    }
};

// admin's roles controllers

const createRole = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Role name is required' });
    }

    try {
        const newRole = await rolesService.createRole(name);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRoleByID = async (req, res) => {  
    const { id } = req.params;

    try {
        const role = await rolesService.getRoleByID(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllRoles = async (req, res) => {
    try {
        const roles = await rolesService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Role name is required' });
    }

    try {
        const updatedRole = await rolesService.updateRole(id, { name });
        if (!updatedRole) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRole = await rolesService.deleteRole(id);
        if (!deletedRole) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json(deletedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = rolesController = {
    // user's roles controllers
    getRoleMenus,
    // admin's roles controllers
    createRole,
    getRoleByID,
    getAllRoles,
    updateRole,
    deleteRole
};