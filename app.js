require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/api/auth/auth.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server is online.');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});