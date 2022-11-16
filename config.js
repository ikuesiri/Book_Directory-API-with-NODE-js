require('dotenv').config();


 const port = process.env.PORT;
 const MONGO_DB_URI = process.env.MONGO_DB_URI

 
module.exports = {
    port,
    MONGO_DB_URI
}