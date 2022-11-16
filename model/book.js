
const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[ true, 'Please enter the title of the book'],
        unique : [true, "title already exists, please try another title"],
    },
    
    author:{
        type: String,
        required: [true, 'Please enter the name of the author'],
    },
    ISBN:{
        type: String,
        default: 'N/A',
    },
    year:{
        type: Date,
        require : [true, 'Please enter the year the book was created']
    },
})


const BookModel = mongoose.model('Book', bookSchema);

module.exports  = BookModel;