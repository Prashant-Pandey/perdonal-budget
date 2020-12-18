const request = require('supertest');
const app = request('./server.spec.js');
const User = require('../models/User').User;

beforeEach(async () => {
  await User.deleteMany({});
});

afterEach(() => {
  console.log('After execution');
});

describe('Testing Auth Service', () => {
  it('Should Signup the user', async () => {
    await request(app).post('/auth/signup')
      .send({
        firstName: 'FN',
        lastName: 'LN',
        email: 'test@test.com',
        password: 'test',
        phone: '9830029938'
      })
      .expect(201);
  });
});
