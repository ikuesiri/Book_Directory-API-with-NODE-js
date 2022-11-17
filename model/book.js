
const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[ true, 'Please enter the title of the book'],
        unique : [true, "title already exists, please try another title"],
        trim: true,
    },
    
    author:{
        type: String,
        required: [true, 'Please enter the name of the author'],
        trim: true,
    },
    ISBN:{
        type: String,
        default: 'N/A',
        unique: true,
    },
    year:{
        type: Date,
        require : [true, 'Please enter the year the book was created']
    },
    addedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


const BookModel = mongoose.model('Book', bookSchema);

module.exports  = BookModel;