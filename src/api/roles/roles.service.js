const createRole = async (role) => {
    const { name } = role;
    const query = 'INSERT INTO roles (name) VALUES ($1) RETURNING *';
    const values = [name];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating role: ' + error.message);
    }
};

const getRoleByID = async (id) => {
    const query = 'SELECT * FROM roles WHERE id = $1';
    const values = [id];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error fetching role: ' + error.message);
    }
};

const getAllRoles = async () => {
    const query = 'SELECT * FROM roles';

    try {
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        throw new Error('Error fetching all roles: ' + error.message);
    }
};

const updateRole = async (id, role) => {
    const { name } = role;
    const query = 'UPDATE roles SET name = $1 WHERE id = $2 RETURNING *';
    const values = [name, id];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error updating role: ' + error.message);
    }
};

const deleteRole = async (id) => {
    const query = 'DELETE FROM roles WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error deleting role: ' + error.message);
    }
};

module.exports = {
    createRole,
    getRoleByID,
    getAllRoles,
    updateRole,
    deleteRole
};