const AuthService = require('../src/auth/auth-service');
const helpers = require('./test-helpers');
const app = require('../src/app');
const knex = require('knex')
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

describe('Test Setup', () => {
    let db;
    let authToken;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
        helpers.cleanTables(db)
    })

    after('disconnect from db', () => {
        helpers.cleanTables(db)
        db.destroy()
    })

    before('cleanup', () => helpers.cleanTables(db))

    describe('Auth router', () => {

        after('create authToken', () => {
            AuthService.getUserWithUserName(db, 'TestUser').then(user => {
                console.log('User: ', user);
                authToken = AuthService.createJwt(user.user_name, { user_id: user.user_id });
                console.log('Auth Token:', authToken);
            });
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
        })

        it('Requires user_name, full_name, and password', () => {
            return supertest(app)
            .post('/api/auth/register')
            .expect(400)
        })

        it(`responds with 400 'invalid user_name or password' when given a bad password`, () => {
            const invalidUser = {
                user_name: 'TestUser',
                password: 'bad password'
            }
            return supertest(app)
            .post('/api/auth/login')
            .send(invalidUser)
            .expect(400)
        })

        it('responds with 200 and JWT auth token using secret when given valid credentials', () => {
            const validUser = {
                user_name: 'TestUser',
                password: 'test'
            }
            return supertest(app) 
                .post('/api/auth/login')
                .send(validUser)
                .expect(200)
        })

        it('Requires a username and password', () => {
            return supertest(app)
            .post('/api/auth/login')
            .expect(400)
        })

    })

    describe('Books Router', () => {
        
        it('Returns an array of books from /api/books', () => {
            return supertest(app)
            .get('/api/books')
            .set('Authorization', `bearer ${authToken}`)
            .expect(200);
        });

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
})