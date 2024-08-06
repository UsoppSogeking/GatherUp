const express = require('express');
const cors = require('cors');
const sequelize = require('./database/config');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use("/", authRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports = { app };
