// const request = require('supertest');
// const { app } = require('./index');
// const sequelize = require('./database/config');

// // Redirecione logs para evitar exibição no console durante os testes
// const originalLog = console.log;
// const originalError = console.error;

// beforeAll(async () => {
//     console.log = jest.fn(); // Mude o log para uma função mock
//     console.error = jest.fn(); // Mude o erro para uma função mock
//     await sequelize.authenticate();
// });

// afterAll(async () => {
//     await sequelize.close(); // Feche a conexão com o banco de dados
//     console.log = originalLog; // Restaure o log original
//     console.error = originalError; // Restaure o erro original
// });


