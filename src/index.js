const express = require('express');
const cors = require('cors');
const sequelize = require('./database/config');

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

(async function initialize() {
    try {
        await sequelize.authenticate();
        if (process.env.NODE_ENV !== 'test') {
            console.log('Connection has been established successfully.');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const port = 3000;
    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    if (process.env.NODE_ENV !== 'test') {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });
    }
})();

function add(a, b) {
    return a + b;
}

module.exports = { app, add };
