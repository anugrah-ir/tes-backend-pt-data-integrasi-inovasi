require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/api/auth/auth.route');
const userRoutes = require('./src/api/users/users.route');
const roleRoutes = require('./src/api/roles/roles.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// user routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);

app.get('/', (req, res) => {
    res.send('Server is online.');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});