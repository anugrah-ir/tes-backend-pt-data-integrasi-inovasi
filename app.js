require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/api/auth/auth.route');
const userRoutes = require('./src/api/users/users.route');
const roleRoutes = require('./src/api/roles/roles.route');
const menuRoutes = require('./src/api/menus/menu.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/menus', menuRoutes);

app.get('/', (req, res) => {
    res.send('Server is online.');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});