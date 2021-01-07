# Library

## Links

The live app can be found [here](https://capstone1.vercel.app/books)

## Documentation

### Auth Endpoints

/api/auth/register - Creates a new user account - Expects { user_name: string, full_name: string, password: string }

/api/auth/login - Logs in and returns auth token - Expects { user_name: string, password: string }

### Books Endpoints ( All require auth )

/api/books - Returns all books for logged in user - No input required.

/api/books/create - Creates a new book - { name: string, description: string, rating: number, author: string, genre: string }

/api/books/update - Updates an existing book - { id: number, name: string, description: string, rating: number, author: string, genre: string }

/api/books/:bookId/delete - Deletes the book with an ID of :bookId - No input required.

## Screenshots

![home page](https://i.imgur.com/XAG7P01.png "Home Page")

![book list](https://i.imgur.com/gRYUGxu.png "Book List")

## Summary

Library is a simple application that is used to keep track of your books.

You can create, view, update, and remove your books as you please.

In the mood for something specific? Library has a sorting feature so you can only see what you want!

Don't know what to read? The random book button will pick for you!

## Technology Used

React.js, Node.js, Express, Javascript, CSS, HTML, PostgreSQL