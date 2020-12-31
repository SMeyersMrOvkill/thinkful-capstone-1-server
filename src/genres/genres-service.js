const GenresService = {
    getAllGenresForUser(db, user) {
        return db('genres').select('*').where('owner', user);
    }
}

module.exports = GenresService;