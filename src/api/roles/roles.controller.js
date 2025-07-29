const rolesService = require('./roles.service');

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
    createRole,
    getRoleByID,
    getAllRoles,
    updateRole,
    deleteRole
};