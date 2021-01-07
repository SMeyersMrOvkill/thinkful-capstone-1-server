const AuthService = require('../src/auth/auth-service');
const helpers = require('./test-helpers');
const app = require('../src/app');
const knex = require('knex')
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

describe('Test Setup', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
        app.set('db', db);
    });

    afterEach('clean tables', () => helpers.cleanTables(db));

    after('disconnect from db', () => {
        db.destroy();
    });

    before('cleanup', () => helpers.cleanTables(db));

    describe('Auth router', () => {

        beforeEach('seed users', () => {
            return helpers.seedUsers(db);
        });

        it('Registers a new user successfully', () => {
            const newUser = {
                user_name: 'TestUser',
                full_name: 'Test User',
                password: 'test'
            }
            return supertest(app)
            .post('/api/auth/register')
            .send(newUser)
            .expect(200)
        });

        it('Requires user_name, full_name, and password', () => {
            return supertest(app)
            .post('/api/auth/register')
            .expect(400)
        });

        it(`responds with 400 'invalid user_name or password' when given a bad password`, () => {
            const invalidUser = {
                user_name: 'TestUser',
                password: 'bad password'
            }
            return supertest(app)
            .post('/api/auth/login')
            .send(invalidUser)
            .expect(400)
        });

        it('responds with 200 and JWT auth token using secret when given valid credentials', () => {
            const validUser = {
                user_name: 'SMeyers',
                password: 'password'
            }
            return supertest(app) 
                .post('/api/auth/login')
                .send(validUser)
                .expect(200)
        });

        it('Requires a username and password', () => {
            return supertest(app)
            .post('/api/auth/login')
            .expect(400)
        });

    })

    describe('Books Router', () => {

        beforeEach('seed users', () => {
            return helpers.seedUsers(db);
        });

        beforeEach('seed books', () => {
            return helpers.seedBooks(db);
        });
        
        it('Returns an array of books from /api/books', () => {
            const token = helpers.getAuthToken(1, 'SMeyers');
            return supertest(app)
            .get('/api/books')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        });

        it('Requires auth to access /api/books', () => {
            return supertest(app)
            .get('/api/books')
            .expect(401)
        });

        it('creates a new book when given valid data', () => {
            const newBook = {
                name: 'TestBook2',
                description: 'A book for testing',
                rating: 1,
                author: 'Test Author',
                genre: 'Action'
            };
            const token = helpers.getAuthToken(1, 'SMeyers');
            return supertest(app)
            .post('/api/books/create')
            .set('Authorization', `Bearer ${token}`)
            .send(newBook)
            .expect(200);
        });
        
        it('Requires auth to access /api/books/create', () => {
            return supertest(app)
            .post('/api/books/create')
            .expect(401)
        });

        it('updates a book when given valid data', () => {
            const updatedBook = {
                id: 5,
                name: 'Test Update',
                description: 'a test book update',
                rating: 5,
                author: 'A Test Author',
                genre: 'Action'
            };
            const token = helpers.getAuthToken(1, 'SMeyers');
            return supertest(app)
            .post('/api/books/update')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBook)
            .expect(200);
        });

        it('Requires auth to access /api/books/update', () => {
            return supertest(app)
            .post('/api/books/update')
            .expect(401)
        });

        it('deletes a book when given an id and proper auth', () => {
            const token = helpers.getAuthToken(1, 'SMeyers');
            return supertest(app)
            .delete('/api/books/5/delete')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        });

        it('Requires auth to access /api/books/:bookId/delete', () => {
            return supertest(app)
            .post('/api/books/1/delete')
            .expect(401)
        });
    });
})