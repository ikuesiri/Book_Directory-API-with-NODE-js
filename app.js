const express = require('express');

const app = express();

const authenticate = require('./authentication/authenticate')
const auth = require('./route/users')
const bookRoute = require('./route/bookRoute');
const { port, MONGO_DB_URI }  =  require('./config');
const connectDB = require('./database/connectDB');

app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.use('/auth', auth)
app.use('/books', authenticate,  bookRoute);

//homepage
app.get('/', (req, res) => {
    res.status(200)
    .json({
        message: 'Homepage'
    })
})
//404 - invalid routes handler
app.all('*', (req, res) =>{
    res.status(404)
    .json({
        message : `Invalid route`
    })
})

//500- error handler
app.use((error, req, res, next) =>{
     res.status(500)
     .json({
        message : error.message
     })
     next()

})

//server

const start = async() =>{
    try {
        await connectDB(MONGO_DB_URI)
        console.log('connected to the database')
        await app.listen(port, () =>{
            console.log(`Server listening @ port: ${port}`)
        })
        
    } catch (error) {
        return console.log(`Unable to connect to the database ` + error)
        
    }
}

start()