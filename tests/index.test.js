const request = require('supertest');
const { app } = require('../src/index');
const sequelize = require('../src/database/config');
const { User } = require('../models/index');
require('dotenv').config();

let testUserId;
let testUserEmail;
const testUserPassword = 'password123';

beforeAll(async () => {
    await sequelize.authenticate();
});

afterAll(async () => {
    if (testUserId) {
        await User.destroy({ where: { id: testUserId } });
    }

    await sequelize.close();
});

describe('POST /auth/register', () => {
    it('should register a new user', async () => {
        const newUser = {
            name: 'John Doe',
            email: `test${Date.now()}@example.com`,
            password: testUserPassword,
            role: 'participant',
            profile_picture: 'http://example.com/johndoe.jpg'
        };

        const response = await request(app)
            .post('/auth/register')
            .send(newUser);

        expect(response.status).toBe(201);

        const user = await User.findOne({ where: { email: newUser.email } });
        expect(user).not.toBeNull();
        expect(user.name).toBe(newUser.name);

        testUserId = user.id;
        testUserEmail = user.email;
    });
});

describe('POST /auth/login', () => {
    it('should login a user', async () => {
        const logingUser = {
            email: testUserEmail,
            password: testUserPassword
        }

        const response = await request(app)
            .post('/auth/login')
            .send(logingUser);

        expect(response.status).toBe(200);
        
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
    });
});

describe('DELETE /auth/delete', () => {
    it('must delete a user', async () => {
        expect(testUserId).toBeDefined();

        const response = await request(app)
            .delete(`/auth/delete/${testUserId}`);

        expect(response.status).toBe(200);
    });
});

