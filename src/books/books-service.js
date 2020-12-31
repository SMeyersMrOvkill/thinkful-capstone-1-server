const BooksService = {
    getAllBooksForUser(db, user) {
        return db.from('books').select('*').where('owner', user);
    },
    addBook(db, book) {
        return db.insert(book).into('books')
    },
    updateBook(db, book) {
        return db('books').where('id', book.id).update(book);
    },
    getBookById(db, id) {
        return db.from('books').select('*').where('id', id);
    },
    deleteBook(db, id) {
        return db('books').delete().where('id', id);
    }
};

module.exports = BooksService;