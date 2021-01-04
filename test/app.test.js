
const helpers = require('./test-helpers');
const app = require('../src/app');
const supertest = require('supertest');

describe('Books Router', () => {
    it('Requires auth to access /api/books', () => {
        return supertest(app)
        .get('/api/books')
        .expect(401)
    })
    it('Requires auth to access /api/books/create', () => {
        return supertest(app)
        .post('/api/books/create')
        .expect(401)
    })
    it('Requires auth to access /api/books/update', () => {
        return supertest(app)
        .post('/api/books/update')
        .expect(401)
    })
    it('Requires auth to access /api/books/:bookId/delete', () => {
        return supertest(app)
        .post('/api/books/1/delete')
        .expect(401)
    })
});

describe('Auth router', () => {
    it('Requires a username and password', () => {
        return supertest(app)
        .post('/api/auth/login')
        .expect(400)
    })
    it('Requires user_name, full_name, and password', () => {
        return supertest(app)
        .post('/api/auth/register')
        .expect(400)
    })
})