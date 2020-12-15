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

describe('Books endpoints', () => {
    let db;

    before('make knex instance', () => {
        console.log("Connecting to ", process.env.TEST_DB_URL)
        db = makeDB()
    })

    //after('disconnect from db', () => db.destroy())

    describe('User service', () => {
        it('Inserts a user successfully', () => {
            db = makeDB();
            let users = helpers.getUsersTestData();
            db.into('users').insert(users[0]).then(() => {
                db.from('users').select('*').then(user => {
                    expect(user[0].id).to.equal(1);
                    db.destroy();
                });
            });
        });
    })
    describe('Genre service', () => {
        it('Inserts a genre successfully', () => {
            db = makeDB();
            let genres = helpers.getGenresTestData();
            db.into('genres').insert(genres[0]).then(() => {
                db.from('genres').select('*').then(genre => {
                    expect(genre[0].id).to.equal(3)
                    db.destroy();
                })
            })
        })
    })
    describe('Book Service', () => {
        it('Inserts a book successfully', () => {
            db = makeDB();
            let books = helpers.getBooksTestData();
            db.into('books').insert(books[0]).then(() => {
                db.from('books').select('*').then(book => {
                    expect(book[0].id).to.equal(books[0].id);
                    db.destroy();
                });
            });
        });
    });
    describe('Cleanup', () => {
        it('Removes all books successfully', () => {
            db = knex({
                client: 'pg',
                connection: process.env.TEST_DB_URL,
              });
            db.raw('truncate table books cascade').then(() => {
                db.select('*').from('books').then((books) => {
                    expect(books.length).to.equal(0);
                    db.destroy();
                });
            });
        })
        it('Removes all genres successfully', () => {
            db = knex({
                client: 'pg',
                connection: process.env.TEST_DB_URL,
              });
            db.raw('truncate table genres cascade').then(() => {
                db.select('*').from('genres').then((genres) => {
                    expect(genres.length).to.equal(0);
                    db.destroy();
                })
            });
        })
        it('Removes all users successfully', () => {
            db = knex({
                client: 'pg',
                connection: process.env.TEST_DB_URL,
              });
            db.raw('truncate table users cascade').then(() => {
                db.select('*').from('users').then((users) => {
                    expect(users.length).to.equal(0);
                    db.destroy();
                })
            });
        })
    })
    /*
    describe.only('Insert book', () => {
        it('Should insert a book into the database', () => {
            //db.
            let book = {

            }
        })
    });
    */
});