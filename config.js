require('dotenv').config();


 const port = process.env.PORT;
 const MONGO_DB_URI = process.env.MONGO_DB_URI;
 const JWT_KEY = process.env.JWT_KEY;
 const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME;

 
module.exports = {
    port,
    MONGO_DB_URI,
    JWT_KEY,
    JWT_LIFE_TIME,
}