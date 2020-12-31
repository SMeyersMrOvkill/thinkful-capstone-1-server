require('dotenv').config()
const bcrypt = require('bcryptjs');
const knex = require('knex');
const { PORT, DATABASE_URL, JWT_SECRET } = require('../src/config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

db('users').insert({
    id: 1,
    user_name: 'SMeyers',
    full_name: 'Samuel Meyers',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync())
}).then(() => {
    console.log("Seeded user 1.");
}).catch(error => console.log(error));

db('users').insert({
    id: 2,
    user_name: 'JDoe',
    full_name: 'John Doe',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync())
}).then(() => {
    console.log("Seeded user 2.");
}).catch(error => console.log(error));