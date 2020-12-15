const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')

describe('Books endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    
});