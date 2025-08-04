const rolesService = require('../src/modules/roles/roles.service');

const AdminRole = {
    name: 'admin',
    description: 'Administrator role'
};

async function createAdminRole() {
    const existingRole = await rolesService.getRoleByName(AdminRole.name);
    if (existingRole) {
        console.log('Admin role already exists');
        return;
    }
    const role = await rolesService.createRole(AdminRole);
    console.log(`Admin role created with ID: ${role.id} and name: ${role.name}`);
}

createAdminRole();