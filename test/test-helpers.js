function getUsersTestData() {
    return [
        {
            id: 1,
            user_name: 'SMeyers',
            full_name: 'Samuel Meyers',
            password: 'samuelmeyers'
        },
        {
            id: 2,
            user_name: 'JDoe',
            full_name: 'John Doe',
            password: 'johndoe'
        }
    ];
}

function getGenresTestData() {
    return [
        {
            id: 3,
            name: 'Sci-Fi',
            owner: 1
        },
        {
            id: 4,
            name: 'Fantasy',
            owner: 2
        }
    ]
}

function getBooksTestData() {
    return [
        {
            id: 5,
            name: 'Star Wars Episode 3: Revenge of The Sith',
            description: 'The sith get revenge, broh.',
            rating: 5,
            author: 'Some sci-fi writer',
            genre: 3,
            owner: 1
        },
        {
            id: 6,
            name: 'Star Wars Episode 4: A New Hope',
            description: 'The hope is new, broh.',
            rating: 3,
            author: 'Some other sci-fi writer',
            genre: 3,
            owner: 1
        },
        {
            id: 7,
            name: 'The Hobbit',
            description: 'A hobbit goes on an adventure, broh',
            rating: 4,
            author: 'J.R.R. Tolkein',
            genre: 4,
            owner: 2
        }
    ]
}

module.exports = {
    getUsersTestData,
    getGenresTestData,
    getBooksTestData
}