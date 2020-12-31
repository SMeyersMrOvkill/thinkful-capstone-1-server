const { expect } = require('chai');
const knex = require('knex')
const supertest = require('supertest')
const BooksService = require('../src/books/books-service')
const helpers = require('./test-helpers');

function makeDB() {
    return knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
      });
}

describe('All Services', () => {
    let db;

    before('make knex instance', () => {
        db = makeDB()
    })

    beforeEach('Seed database', async () => {
        await db.into('users').insert(helpers.getUsersTestData());
        await db.into('genres').insert(helpers.getGenresTestData());
        await db.into('books').insert(helpers.getBooksTestData());
    })

    afterEach('Truncate database', async() => {
        await db.raw('truncate table books cascade');
        await db.raw('truncate table genres cascade');
        await db.raw('truncate table users cascade');
    });

    after('disconnect from db', () => db.destroy())

    it('Seeds the users successfully', async () => {
        let user = await db.select('*').from('users').where('id', 1);
        expect(user[0].id).to.equal(1);
    });

    it('Seeds the genres successfully', async () => {
        let genre = await db.select('*').from('genres').where('id', 3);
        expect(genre[0].id).to.equal(3);
    });

    it('Seeds the books successfully', async () => {
        let book = await db.select('*').from('books').where('id', 5);
        expect(book[0].id).to.equal(5);
    })
});