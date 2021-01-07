const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function getUsersTestData() {
    return [
        {
            id: 1,
            user_name: 'SMeyers',
            full_name: 'Samuel Meyers',
            password: bcrypt.hashSync('password', bcrypt.genSaltSync())
        },
        {
            id: 2,
            user_name: 'JDoe',
            full_name: 'John Doe',
            password: bcrypt.hashSync('password', bcrypt.genSaltSync())
        }
    ];
}

function getBooksTestData() {
    return [
        {
            id: 5,
            name: 'Star Wars Episode 3: Revenge of The Sith',
            description: 'The sith get revenge, broh.',
            rating: 5,
            author: 'Some sci-fi writer',
            genre: 'Science Fiction',
            owner: 1
        },
        {
            id: 6,
            name: 'Star Wars Episode 4: A New Hope',
            description: 'The hope is new, broh.',
            rating: 3,
            author: 'Some other sci-fi writer',
            genre: 'Science Fiction',
            owner: 1
        },
        {
            id: 7,
            name: 'The Hobbit',
            description: 'A hobbit goes on an adventure, broh',
            rating: 4,
            author: 'J.R.R. Tolkein',
            genre: 'Fantasy',
            owner: 2
        }
    ]
}

function cleanTables(db) {
    return db.raw(
        `TRUNCATE
        users,
        books CASCADE`
    )
}

function getAuthToken(user_id, user_name) {
    return jwt.sign(
        {user_id: user_id},
        process.env.JWT_SECRET,
        {
            subject: user_name,
            algorithm: 'HS256'
        }
    )
}

function seedUsers(db) {
    return db('users').insert(getUsersTestData());
}

function seedBooks(db) {
    return db('books').insert(getBooksTestData());
}

module.exports = {
    getUsersTestData,
    getBooksTestData,
    cleanTables,
    getAuthToken,
    seedUsers,
    seedBooks,
}