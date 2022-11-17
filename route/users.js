const express = require("express");
const  {registerUser, loginUser, updateUser, deleteUser } = require('../controllers/users')
const authenticate = require('../authentication/authenticate')

const userRoute = express.Router();
//create user account
userRoute.post('/register', registerUser)

//delete user account
userRoute.post('/login', loginUser)

//update user account
userRoute.patch('/updateUser/:userID', authenticate, updateUser)

//delete user account
userRoute.delete('/deleteUser/:userID', authenticate, deleteUser )


module.exports = userRoute;