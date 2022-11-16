const express = require('express'); 

const bookRoute = express.Router();

const  { 
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
} = require('../controllers/book')


//CRUD FUNCTIONALITIES


//entering details of a book in the book directory database
bookRoute.post('/new', createBook )


//get a list of all books
bookRoute.get('/', getBooks)


bookRoute.get('/:bookID', getBook)

bookRoute.patch('/:bookID', updateBook)

bookRoute.delete('/:bookID', deleteBook)


module.exports = bookRoute;