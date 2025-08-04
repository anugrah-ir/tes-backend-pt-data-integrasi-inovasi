const usersService = require('../src/modules/users/users.service');
const readline = require('readline-sync');

async function createAdmin() {
    const username = readline.question('Enter admin username: ');
    const password = readline.question('Enter admin password: ', {
        hideEchoBack: true
    });
    const existingUser = await usersService.getUserByUsername(username);
    if (existingUser) {
        console.log('Admin user already exists');
        return;
    }
    const user = await usersService.createUser({ username, password });
    console.log(user);

    await usersService.assignRoleToUser(user.id, 1);

    console.log(`Admin created with ID: ${user.id} and username: ${user.username}`);
};

createAdmin();
