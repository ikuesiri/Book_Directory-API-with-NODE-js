const BookModel = require('../model/book');


//creating book function
const createBook = async(req , res, next) =>{

    try {
        
        const  newBook = await  new BookModel({
            title :req.body.title,
            author :req.body.author,
            ISBN :req.body.ISBN,
            year :req.body.year
        })
        const  book = await newBook.save()
        
        res.status(201).json({success : true, book })
        
    } catch (error) {
        // res.status(500).json({success :false})
        next(error)
    }
}


//getting a list of all books

const getBooks =  async(req , res, next ) =>{
    try {
        const books = await BookModel.find({})
        res.status(200).json({ success : true, books, nbHits : books.length})
    
    } catch (error) {
        next(error)
    }
    
}



//select a book by id
const getBook = async(req, res, next) => {

    const { bookID } = req.params
    try {
        const book = await BookModel.findOne({_id : bookID}) 
        
        res.status(200).json({ success : true, book})

        
    } catch (error) {
        next(error)
    }
}


//edit/update a book
const updateBook = async(req, res, next) => {

    const { bookID } = req.params
    const body = req.body
    try {

        const book = await BookModel.findOneAndUpdate({_id : bookID}, body, {new: true})
        
        if(!book){
            return res.status(401).json(`${bookID} does not exist`)
        }
        res.status(200).json({ success : true, book})

        
    } catch (error) {
        next(error)
    }
}


//delete a book
const deleteBook = async(req, res, next) =>{
    const { bookID } = req.params
    try {

        const book = await BookModel.findOneAndDelete({_id : bookID}) 
        
        if(!book){
            return res.status(401).json(`${bookID} does not exist`)
        }

        res.status(200).json({ success : true, message: `Book with id : ${bookID}, has been successfully deleted`})

        
    } catch (error) {
        next(error)
    }
}




module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}