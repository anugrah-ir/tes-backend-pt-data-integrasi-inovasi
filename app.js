require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/modules/auth/auth.route');
const userRoutes = require('./src/modules/users/users.route');
const roleRoutes = require('./src/modules/roles/roles.route');
const menuRoutes = require('./src/modules/menus/menu.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/menu', menuRoutes);

app.get('/', (req, res) => {
    res.send('Server is online.');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});