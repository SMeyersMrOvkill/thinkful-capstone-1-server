const BooksService = {
    getAllBooks(db) {
        return db.from('books').select('*');
    },
    addBook(db, book) {
        return db.insert(book).into('books')
    }
};

module.exports = BooksService;