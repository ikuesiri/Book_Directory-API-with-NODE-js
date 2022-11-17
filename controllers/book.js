const BookModel = require('../model/book');
const UserModel = require('../model/users');


//creating book function
const createBook = async(req , res, next) =>{
  
    try {
        req.body.addedBy = req.user.userID
        
        const  newBook = await  new BookModel({
            title :req.body.title,
            author :req.body.author,
            ISBN :req.body.ISBN,
            year :req.body.year,
            addedBy: req.body.addedBy,
        })
        const  book = await newBook.save()
        
        res.status(201).json({status: true, book })
        
    } catch (error) {
        next(error)
    }
}


//getting a list of all books

const getBooks =  async(req , res, next ) =>{
    
    try {
        const books = await BookModel.find({})
        .populate('addedBy', {username: 1})
        res.status(200).json({ success : true, books, nbHits : books.length})
    
    } catch (error) {
        next(error)
    }
    
}



//select a book by id
const getBook = async(req, res, next) => {

    req.body.addedBy = req.user.userID;

    const { bookID } = req.params
    try {
        const book = await BookModel.findOne({_id : bookID})
        .populate('addedBy', {username: 1})
        
        
        res.status(200).json({ success : true, book})

        
    } catch (error) {
        next(error)
    }
}


//edit/update a book
const updateBook = async(req, res, next) => {

    
    
    req.body.addedBy = req.user.userID
    const { bookID } = req.params
    const body = req.body

    try {

        const book = await BookModel.findOneAndUpdate({_id : bookID, addedBy : req.user.userID}, body, {new: true, runValidators:true })
        
        if(!book){
            return res.status(401).json(`You're NOT authorized to edit this book entry ID:${bookID}`)
        }
        res.status(200).json({ success : true, book})

    

        
    } catch (error) {
        next(error)
    }
}


//delete a book
const deleteBook = async(req, res, next) =>{
    req.body.addedBy = req.user.userID
    const { bookID } = req.params
    try {

        const book = await BookModel.findOneAndDelete({_id : bookID, addedBy : req.user.userID}) 
        
        if(!book){
            return res.status(401).json(`You're NOT authorized to delete this book entry ID:${bookID}`)
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