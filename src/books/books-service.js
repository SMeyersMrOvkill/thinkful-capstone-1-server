const BooksService = {
    getAllBooks(db) {
        return db.from('books').select('*');
    },
    addBook(db, book) {
        return db.insert(book).into('books')
    },
    getBookById(db, id) {
        return db.from('books').select('*').where('id', id);
    }
};

module.exports = BooksService;