const express = require('express');
const BooksService = require('./books-service');
const { requireAuth } = require('../middleware/jwt-auth')

const booksRouter = express.Router();

booksRouter.route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        BooksService.getAllBooksForUser(req.app.get('db'), req.user.id).then(books => {
            res.json(books);
        })
    })

booksRouter.route('/create')
    .all(requireAuth)
    .post((req, res, next) => {
        const { name, description, rating, author, genre } = req.body;
        let np = {
            name,
            description,
            rating,
            author,
            genre,
            owner: req.user.id
        }
        for (const [key, value] of Object.entries(np))
            if (value == null)
                return res.json({
                    status: -1,
                    message: 'missing "'+key+'".'
                })
        BooksService.addBook(req.app.get('db'), np).then(result => {
            return res.json({status: 0});
        })
    })

booksRouter.route('/update')
    .all(requireAuth)
    .post((req, res, next) => {
        const { id, name, description, rating, author, genre, owner } = req.body;
        let np = {
            id,
            name,
            description,
            rating,
            author,
            genre,
            owner
        }
        for (const [key, value] of Object.entries(np))
            if (value == null)
                return res.json({
                    status: -1,
                    message: 'missing "'+key+'".'
                })
        BooksService.updateBook(req.app.get('db'), np).then(result => {
            return res.json({
                status: 0,
                message: "Book updated."
            })
        });
        })

booksRouter.route('/:bookId/delete')
    .all(requireAuth)
    .all(checkBookExists)
    .delete((req, res, next) => {
        BooksService.deleteBook(req.app.get('db'), req.params.bookId).then(result => {
            return res.json({
                status: 0,
                message: "Book deleted."
            })
        })
    })

async function checkBookExists(req, res, next) {
    const book = await BooksService.getBookById(
        req.app.get('db'),
        req.params.bookId
    );

    if(!book) {
        return res.status(404).send('Book ' + req.params.bookId + ' Doesn\'t exist');
    }

    next();    
}

module.exports = booksRouter;